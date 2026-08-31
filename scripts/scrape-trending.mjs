#!/usr/bin/env node
// Scrapes github.com/trending for the /trending page's static data snapshot.
// Runs in CI (GitHub Actions), not a browser, so there's no DOMParser and no
// host_permissions trick to bypass CORS -- a plain server-side fetch has
// neither problem. No dependencies on purpose: this is the entire ingest
// pipeline for a small static page, and a regex-based extraction of GitHub's
// fairly stable trending-page markup keeps the CI job to "node one script",
// no npm install step.
//
// Deliberately scoped down from the browser extension's version: no
// per-language merge, three since-periods only (all languages). That alone
// is what makes "more than one snapshot" possible; language filtering is
// the extension's job, this page is a lighter public preview of it.

import { writeFile, mkdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const SINCE_PERIODS = ['daily', 'weekly', 'monthly'];
const TRENDING_DIR = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  '..',
  'trending'
);
const OUT_PATH = path.join(TRENDING_DIR, 'data.json');
const HISTORY_PATH = path.join(TRENDING_DIR, 'history.json');

// A repo we've never seen before is dropped from history after this many
// days without a re-appearance -- keeps the committed file from growing
// forever for one-off repos that trended once and never again.
const HISTORY_RETENTION_DAYS = 21;
// Cap on distinct seen-dates kept per repo. A repo trending 60+ separate
// days is already well past any streak a reader cares about; this just
// bounds worst-case growth for freak long-runners.
const MAX_SEEN_DATES = 60;

function todayUTC() {
  return new Date().toISOString().slice(0, 10); // YYYY-MM-DD
}

function daysBetween(a, b) {
  return Math.round((Date.parse(b) - Date.parse(a)) / 86400000);
}

// Streak = consecutive calendar days seen, counting back from today. A gap
// of even one day (the scrape ran but the repo wasn't trending) breaks it --
// this deliberately doesn't count "seen 5 times this week" as a streak
// unless those 5 times were 5 days in a row.
function computeStreak(seenDates, today) {
  const set = new Set(seenDates);
  let streak = 0;
  let cursor = today;
  while (set.has(cursor)) {
    streak += 1;
    const d = new Date(cursor + 'T00:00:00Z');
    d.setUTCDate(d.getUTCDate() - 1);
    cursor = d.toISOString().slice(0, 10);
  }
  return streak;
}

async function loadHistory() {
  try {
    const raw = await readFile(HISTORY_PATH, 'utf8');
    return JSON.parse(raw);
  } catch {
    return { repos: {} }; // first run, or file doesn't exist yet
  }
}

function parseCount(text) {
  const cleaned = (text || '').replace(/,/g, '').trim();
  const n = Number(cleaned);
  return Number.isFinite(n) ? n : 0;
}

function decodeEntities(s) {
  return (s || '')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .trim();
}

async function fetchSince(since) {
  const url = `https://github.com/trending?since=${since}`;
  const res = await fetch(url, {
    headers: { 'User-Agent': 'Mozilla/5.0 (compatible; cplog-trending-snapshot/1.0)' },
  });
  if (!res.ok) {
    throw new Error(`GitHub returned ${res.status} for ${url}`);
  }
  const html = await res.text();

  const rows = html.split('<article class="Box-row">').slice(1);

  return rows
    .map((chunk) => {
      // Each row is everything up to the next article boundary (or end of
      // the split segment, since .slice(1) already trimmed the header off).
      const hrefMatch = chunk.match(/href="\/([^"?#]+\/[^"?#]+)"[^>]*class="Link"/);
      const fullName = hrefMatch ? decodeEntities(hrefMatch[1]) : '';
      if (!fullName) return null;
      const [owner, name] = fullName.split('/');

      const descMatch = chunk.match(/<p class="col-9[^>]*>([\s\S]*?)<\/p>/);
      const description = descMatch
        ? decodeEntities(descMatch[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' '))
        : '';

      const langMatch = chunk.match(/itemprop="programmingLanguage">([^<]*)</);
      const language = langMatch ? decodeEntities(langMatch[1]) : '';

      const langColorMatch = chunk.match(
        /repo-language-color[^>]*style="background-color:\s*([^;"]+)/
      );
      const languageColor = langColorMatch ? langColorMatch[1].trim() : null;

      const starsMatch = chunk.match(
        new RegExp(`href="/${fullName.replace('/', '\\/')}/stargazers"[^>]*>[\\s\\S]*?<\\/svg>\\s*([\\d,]+)`)
      );
      const forksMatch = chunk.match(
        new RegExp(`href="/${fullName.replace('/', '\\/')}/forks"[^>]*>[\\s\\S]*?<\\/svg>\\s*([\\d,]+)`)
      );
      const totalStars = parseCount(starsMatch?.[1]);
      const totalForks = parseCount(forksMatch?.[1]);

      const periodMatch = chunk.match(/([\d,]+)\s+stars?\s+(today|this week|this month)/i);
      const starsInPeriod = periodMatch ? parseCount(periodMatch[1]) : null;

      return {
        id: fullName,
        owner,
        name,
        fullName,
        url: `https://github.com/${fullName}`,
        description,
        language,
        languageColor,
        totalStars,
        totalForks,
        starsInPeriod,
      };
    })
    .filter(Boolean);
}

async function main() {
  const bySince = {};
  for (const since of SINCE_PERIODS) {
    try {
      bySince[since] = await fetchSince(since);
      console.log(`${since}: ${bySince[since].length} repos`);
    } catch (err) {
      console.error(`Failed to fetch ${since}:`, err.message);
      bySince[since] = [];
    }
  }

  const totalRaw = Object.values(bySince).reduce((n, list) => n + list.length, 0);
  if (totalRaw === 0) {
    console.error('All three fetches failed or returned nothing -- refusing to write an empty snapshot over a good one.');
    process.exit(1);
  }

  // History tracking: this is the actual differentiator over just mirroring
  // github.com/trending, which only ever shows one snapshot. Anyone can
  // scrape the same page; nobody reading it once can tell you a repo has
  // now trended 4 days running, or that it's brand new today. That
  // requires remembering past runs, which is the one thing a live re-fetch
  // (ours or a competitor's) structurally can't do.
  const today = todayUTC();
  const history = await loadHistory();
  const nowIso = new Date().toISOString();

  // Every distinct repo seen in this run, across all three since-periods --
  // a repo can be in "today" and "week" simultaneously, it should only
  // count once for streak purposes.
  const seenThisRun = new Set();
  for (const list of Object.values(bySince)) {
    for (const repo of list) seenThisRun.add(repo.id);
  }

  for (const id of seenThisRun) {
    const existing = history.repos[id];
    if (existing) {
      if (existing.seenDates[existing.seenDates.length - 1] !== today) {
        existing.seenDates.push(today);
        if (existing.seenDates.length > MAX_SEEN_DATES) existing.seenDates.shift();
      }
      existing.lastSeen = nowIso;
    } else {
      history.repos[id] = { firstSeen: nowIso, lastSeen: nowIso, seenDates: [today] };
    }
  }

  // Prune repos not seen in a while so the committed file doesn't grow
  // forever -- most repos trend once and never again.
  for (const [id, rec] of Object.entries(history.repos)) {
    if (daysBetween(rec.lastSeen, nowIso) > HISTORY_RETENTION_DAYS) {
      delete history.repos[id];
    }
  }

  // Attach the derived fields to every repo object in this run's output.
  for (const list of Object.values(bySince)) {
    for (const repo of list) {
      const rec = history.repos[repo.id];
      repo.streakDays = rec ? computeStreak(rec.seenDates, today) : 1;
      repo.isNew = rec ? rec.seenDates.length === 1 && rec.seenDates[0] === today : true;
    }
  }

  const payload = {
    generatedAt: nowIso,
    since: bySince,
  };

  await mkdir(TRENDING_DIR, { recursive: true });
  await writeFile(OUT_PATH, JSON.stringify(payload, null, 2) + '\n');
  await writeFile(HISTORY_PATH, JSON.stringify(history, null, 2) + '\n');
  console.log(`Wrote ${OUT_PATH}`);
  console.log(`Wrote ${HISTORY_PATH} (${Object.keys(history.repos).length} repos tracked)`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

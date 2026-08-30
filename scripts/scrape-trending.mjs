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

import { writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const SINCE_PERIODS = ['daily', 'weekly', 'monthly'];
const OUT_PATH = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  '..',
  'trending',
  'data.json'
);

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

  const payload = {
    generatedAt: new Date().toISOString(),
    since: bySince,
  };

  await mkdir(path.dirname(OUT_PATH), { recursive: true });
  await writeFile(OUT_PATH, JSON.stringify(payload, null, 2) + '\n');
  console.log(`Wrote ${OUT_PATH}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

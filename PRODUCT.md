# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Two audiences, roughly equal weight:
- Hiring managers and clients evaluating Eric Tai for forward-deployed-engineer / AI-in-production work — deciding whether to reach out or hire.
- Peers and the broader engineering/AI community reading his writing — building reputation, following his projects.

## Product Purpose

A personal site (cplog.github.io) for Eric Tai, forward-deployed engineer based in Hong Kong. It exists to (1) win consulting/hiring engagements by demonstrating real production AI work, and (2) host his technical writing and shipped side projects.

## Positioning

"I get AI out of the proof-of-concept graveyard and into production on the customer's own data." The differentiator is shipping production AI systems on a client's actual data, not demos — proven by real, working projects (e.g. Fortress) rather than case-study prose.

## Operating Context

Static site (plain HTML/CSS/JS: `index.html`, `engine.js`, `motion.js`, `scenes.js`), deployed via GitHub Pages from `cplog/cplog.github.io`. Sub-sections: `writing/` (published essays, e.g. reviving-a-dead-chrome-extension, oil-motion-without-api-key), `trending/` (a data-driven page with its own scraper — `scripts/scrape-trending.mjs` — and privacy page), `cardbuild/` and `gardenbuild/` (separate Node build tools with their own package.json, generating assets/pages for the site).

## Capabilities and Constraints

- No CMS — content is hand-authored HTML/Markdown per section.
- `trending/` pulls live-scraped data (`data.json`, `history.json`) — a redesign must not break its data pipeline or the `.github/workflows` that run it.
- `writing/` posts are published individually (via the `publish-to-github` skill from the Eric Brain vault) — a redesign must accommodate an open-ended, growing list of posts, not a fixed set.

## Brand Commitments

Name: Eric Tai. Existing tagline ("Forward-deployed engineer, Hong Kong" / "I get AI out of the proof-of-concept graveyard and into production on the customer's own data.") is confirmed positioning language, not yet locked as verbatim copy — redesign may rephrase but must preserve the claim.

## Evidence on Hand

- Real: shipped writing posts under `writing/` (the primary proof — sharp technical thinking, worth reading), the live `trending/` data tool (a real working scraper/dashboard, self-built).
- Fortress/tilion.dev is a fork Eric explores/uses, not his own shipped product — do not present it as authored work.
- Not on hand: no client names, logos, testimonials, or case studies. Do not fabricate any.

## Product Principles

1. Credibility comes from real shipped work and writing, not claims — every proof point must be a real link, not invented.
2. Serve both audiences without splitting into two disconnected sites — hiring-facing credibility and community-facing writing should reinforce each other.
3. Preserve the "production on customer's own data" positioning through any visual change.
4. Don't break `trending/`'s live data pipeline or the writing-publish flow when redesigning.

## Accessibility & Inclusion

No product-specific requirement established yet.

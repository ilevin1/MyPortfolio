import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);

test("the production build contains the portfolio metadata", async () => {
  const html = await readFile(new URL("dist/index.html", root), "utf8");

  assert.match(html, /<title>Isaac Levin \| Product Engineer &amp; Founder<\/title>/i);
  assert.match(html, /https:\/\/isaaclev\.in\/og\.png/);
  assert.match(html, /I&#39;m Isaac Levin|I'm Isaac Levin/);
  assert.doesNotMatch(html, /The portfolio of Isaac Levin/);
  assert.doesNotMatch(html, /—/);
  assert.match(html, /<div id="root"><\/div>/);
  assert.doesNotMatch(html, /chatgpt|codex|vinext|cloudflare/i);
});

test("the source keeps the project content and accessibility affordances", async () => {
  const [app, styles] = await Promise.all([
    readFile(new URL("src/App.tsx", root), "utf8"),
    readFile(new URL("src/styles.css", root), "utf8"),
  ]);

  assert.match(app, /ShiurBank/);
  assert.match(app, /Levin Times/);
  assert.match(app, /Torahly/);
  assert.match(app, /shiurbank-home-2026\.png/);
  assert.match(app, /levin-times-home-2026\.png/);
  assert.match(app, /torahly-source-finder-2026\.png/);
  assert.match(app, /Read my résumé/);
  assert.doesNotMatch(app, /Read the full résumé/);
  assert.match(app, /loading="lazy"/);
  assert.doesNotMatch(app, /[↗↓↑→←↔]/);
  assert.doesNotMatch(app, /—/);
  assert.doesNotMatch(app, /Portfolio first|Résumé underneath|The work should make the case/);
  assert.doesNotMatch(app, /Product, design, engineering, infrastructure, and launch/);
  assert.match(app, /FOUNDER · SHIURBANK/);
  assert.match(app, /PRODUCT · ENGINEERING · OPERATIONS/);
  assert.doesNotMatch(app, /AI PRODUCT DEVELOPMENT · ARTSCROLL/);
  assert.match(app, /WEB · MOBILE · VOICE/);
  assert.doesNotMatch(app, /I FOUNDED|I BUILD AT|I SHIP/);
  assert.doesNotMatch(
    app,
    /I built ShiurBank|I built a newsroom|I built a faster way|I built a source-finding/,
  );
  assert.match(styles, /prefers-reduced-motion/i);
  assert.match(styles, /@media \(max-width: 360px\)/);
  assert.match(styles, /min-height: 44px/);
  await access(new URL("dist/resume/isaac-levin-resume.pdf", root));
  await access(new URL("dist/og.png", root));
});

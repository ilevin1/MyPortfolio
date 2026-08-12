import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);

test("the production build contains the portfolio metadata", async () => {
  const html = await readFile(new URL("dist/index.html", root), "utf8");

  assert.match(html, /<title>Isaac Levin — Product Engineer &amp; Founder<\/title>/i);
  assert.match(html, /https:\/\/isaaclev\.in\/og\.png/);
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
  assert.match(app, /torahly-source-finder-2026\.png/);
  assert.doesNotMatch(app, /Portfolio first|Résumé underneath|The work should make the case/);
  assert.match(styles, /prefers-reduced-motion/i);
  await access(new URL("dist/resume/isaac-levin-resume.pdf", root));
  await access(new URL("dist/og.png", root));
});

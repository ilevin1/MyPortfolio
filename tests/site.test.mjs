import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);

test("the production build describes a portfolio, not a services page", async () => {
  const html = await readFile(new URL("dist/index.html", root), "utf8");

  assert.match(html, /<title>Isaac Levin \| Portfolio<\/title>/i);
  assert.match(html, /Selected work by Isaac Levin across Torah, media, and AI/);
  assert.doesNotMatch(html, /Product Engineer &amp; Founder/);
  assert.doesNotMatch(html, /og\.png/);
  assert.doesNotMatch(html, /—/);
  assert.match(html, /<div id="root"><\/div>/);
  assert.doesNotMatch(html, /chatgpt|codex|vinext|cloudflare/i);
});

test("the source stays focused on the work", async () => {
  const [app, styles] = await Promise.all([
    readFile(new URL("src/App.tsx", root), "utf8"),
    readFile(new URL("src/styles.css", root), "utf8"),
  ]);

  assert.match(app, /Products I&apos;ve <em>built\.<\/em>/);
  assert.match(app, /A selection of products across Torah, media, and AI/);
  assert.match(app, /project-marquee/);
  assert.match(app, /ShiurBank/);
  assert.match(app, /Privacy and control for Torah teachers/);
  assert.match(app, /Teacher privacy/);
  assert.match(app, /Access controls/);
  assert.match(app, /Sales \+ marketing/);
  assert.match(app, /Levin Times/);
  assert.match(app, /Torahly/);
  assert.match(app, /shiurbank-home-2026\.png/);
  assert.match(app, /levin-times-home-2026\.png/);
  assert.match(app, /torahly-source-finder-2026\.png/);
  assert.match(app, /loading="lazy"/);
  assert.doesNotMatch(app, /[↗↓↑→←↔]/);
  assert.doesNotMatch(app, /—|Supabase/);
  assert.doesNotMatch(
    app,
    /Open to good problems|Start a conversation|Have a hard problem|Read my résumé|Copy email|skill-cloud|timeline|contact-section|about-section/,
  );
  assert.match(styles, /prefers-reduced-motion/i);
  assert.match(styles, /@keyframes ticker/);
  assert.doesNotMatch(app, /project-sticker|sticker-one|sticker-two|sticker-three/);
  assert.doesNotMatch(styles, /project-sticker|sticker-one|sticker-two|sticker-three/);
  assert.match(styles, /@media \(max-width: 360px\)/);
  assert.match(styles, /min-height: 44px/);
  await access(new URL("dist/resume/isaac-levin-resume.pdf", root));
});

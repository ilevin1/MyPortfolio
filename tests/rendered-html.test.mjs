import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("server-renders the finished Isaac Levin portfolio", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Isaac Levin — Product Engineer &amp; Founder<\/title>/i);
  assert.match(html, /I turn ambitious ideas into products/);
  assert.match(html, /ShiurBank/);
  assert.match(html, /Levin Times/);
  assert.match(html, /Torahly/);
  assert.match(html, /isaac-levin\.png/);
  assert.doesNotMatch(html, /codex-preview|Building your site|react-loading-skeleton/i);
});

test("keeps project assets, social metadata, and accessibility affordances wired", async () => {
  const [page, layout, styles, packageJson] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
  ]);

  assert.match(page, /aria-label="Compare raw notes with the generated study guide"/);
  assert.match(styles, /prefers-reduced-motion/i);
  assert.match(page, /\/resume\/isaac-levin-resume\.pdf/);
  assert.match(layout, /\/og\.png/);
  assert.match(layout, /x-forwarded-host/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
});

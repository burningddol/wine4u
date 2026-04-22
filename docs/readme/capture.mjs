// Playwright screenshot script for README banners.
// Usage: node docs/readme/capture.mjs

import { chromium } from "playwright";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));

const PAGES = [
  { html: "hero.html", out: "hero-banner.png" },
  { html: "section-types.html", out: "section-types.png" },
  { html: "section-ai.html", out: "section-ai.png" },
  { html: "section-detail.html", out: "section-detail.png" },
  { html: "section-security.html", out: "section-security.png" },
];

const VIEWPORT = { width: 1460, height: 820 };

async function capture() {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({
    viewport: VIEWPORT,
    deviceScaleFactor: 2,
  });

  for (const { html, out } of PAGES) {
    const page = await ctx.newPage();
    const fileUrl = "file://" + resolve(__dirname, "src", html).replace(/\\/g, "/");
    await page.goto(fileUrl, { waitUntil: "networkidle" });
    await page.waitForTimeout(300);

    const element = await page.$(".banner");
    if (!element) throw new Error(`.banner not found in ${html}`);

    const outPath = resolve(__dirname, out);
    await element.screenshot({ path: outPath, type: "png" });
    console.log(`✓ ${out}`);
    await page.close();
  }

  await browser.close();
}

capture().catch((e) => {
  console.error(e);
  process.exit(1);
});

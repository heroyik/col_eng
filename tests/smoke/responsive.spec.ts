import { expect, test } from "@playwright/test";

const VIEWPORTS = [
  { name: "small mobile", width: 320, height: 700 },
  { name: "common mobile", width: 375, height: 700 },
  { name: "large mobile", width: 430, height: 800 },
  { name: "tablet", width: 768, height: 900 },
  { name: "small desktop", width: 1024, height: 900 },
  { name: "desktop", width: 1365, height: 900 },
  { name: "wide desktop", width: 1440, height: 1000 },
];

const PAGES = [
  { name: "landing", path: "./", heading: "Colloquial English" },
  { name: "admin", path: "./admin/", heading: "Add a New Expression" },
];

for (const pageCase of PAGES) {
  for (const viewport of VIEWPORTS) {
    test(`${pageCase.name} is responsive at ${viewport.name} (${viewport.width}px)`, async ({ page }) => {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.goto(pageCase.path);

      await expect(page.getByRole("heading", { name: pageCase.heading })).toBeVisible();
      await expect(page.getByText("Real-talk English(OPIc AL), Vietnamese(OPIc IM), Chinese(HSK4), and Spanish(Intermediate).")).toBeVisible();
      await expect(page.getByRole("link", { name: "Open GitLab repository" })).toBeVisible();
      await expect(page.getByRole("button", { name: /Switch to (light|dark) theme/ })).toBeVisible();

      const overflow = await page.evaluate(() => {
        const root = document.documentElement;
        const body = document.body;
        return {
          viewport: window.innerWidth,
          documentWidth: root.scrollWidth,
          bodyWidth: body.scrollWidth,
        };
      });

      expect(overflow.documentWidth, JSON.stringify(overflow)).toBeLessThanOrEqual(viewport.width + 1);
      expect(overflow.bodyWidth, JSON.stringify(overflow)).toBeLessThanOrEqual(viewport.width + 1);
    });
  }
}

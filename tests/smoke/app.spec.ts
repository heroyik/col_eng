import { expect, test } from "@playwright/test";

test("search page loads data and supports wildcard search", async ({ page }) => {
  await page.goto("./");

  await expect(page.getByRole("heading", { name: "Colloquial English" })).toBeVisible();
  await expect(page.getByRole("tab", { name: "Learn" })).toHaveAttribute("aria-selected", "true");
  await expect(page.getByText("due today")).toBeVisible();
  await expect(page.getByText("reviewed today")).toBeVisible();
  await expect(page.getByRole("button", { name: "Enable cloud sync" })).toBeVisible();
  await expect(page.getByRole("button", { name: /Enable reminders|Reminders on|Reminders blocked|Reminders unavailable/ })).toBeVisible();
  await expect(page.getByRole("button", { name: /Switch to light theme/ })).toBeVisible();

  await page.getByPlaceholder("Type '*' to view all saved expressions").fill("*");
  await expect(page.getByText(/1518 results found/)).toBeVisible();
});

test("learning session can reveal and rate a card", async ({ page }) => {
  await page.goto("./");

  await page.getByRole("button", { name: "Start review" }).click();
  await expect(page.getByRole("region", { name: "Review session" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Tap to reveal" })).toBeVisible();

  await page.getByRole("button", { name: "Tap to reveal" }).click();
  await expect(page.getByRole("button", { name: /Good/ })).toBeEnabled();

  await page.getByRole("button", { name: /Good/ }).click();
  await expect(page.getByLabel(/Card 2 of/)).toBeVisible();
});

test("learning progress updates after a review", async ({ page }) => {
  await page.goto("./");

  await expect(page.getByText("reviewed today")).toBeVisible();
  await page.getByRole("button", { name: "Start review" }).click();
  await page.getByRole("button", { name: "Tap to reveal" }).click();
  await page.getByRole("button", { name: /Easy/ }).click();
  await page.getByRole("tab", { name: "Learn" }).click();

  await expect(page.getByText("total reviews")).toBeVisible();
});

test("learning session supports swipe rating", async ({ page }) => {
  await page.goto("./");

  await page.getByRole("button", { name: "Start review" }).click();
  await page.getByRole("button", { name: "Tap to reveal" }).click();

  const card = page.locator(".study-card");
  const box = await card.boundingBox();
  expect(box).not.toBeNull();
  if (!box) return;

  const centerX = box.x + box.width / 2;
  const centerY = box.y + box.height / 2;
  await page.mouse.move(centerX, centerY);
  await page.mouse.down();
  await page.mouse.move(centerX + 140, centerY, { steps: 5 });
  await page.mouse.up();

  await expect(page.getByLabel(/Card 2 of/)).toBeVisible();
});

test("search result can be added to review", async ({ page }) => {
  await page.goto("./");

  await page.getByPlaceholder("Type '*' to view all saved expressions").fill("doormat");
  await expect(page.getByText(/results found/)).toBeVisible();

  const addButton = page.getByRole("button", { name: "Add to Review" }).first();
  await expect(addButton).toBeVisible();
  await addButton.click();

  await expect(page.getByRole("button", { name: "In Review" }).first()).toBeDisabled();
});

test("admin page renders signed-out intake UI", async ({ page }) => {
  await page.goto("./admin/");

  await expect(page.getByRole("heading", { name: "Add a New Expression" })).toBeVisible();
  await expect(page.getByText("Please sign in to continue.")).toBeVisible();
  await expect(page.getByRole("button", { name: "Sign in with Google" })).toBeVisible();
});

test("admin page preserves required cards and signed-out controls", async ({ page }) => {
  await page.goto("./admin/");

  await expect(page.getByRole("heading", { name: "Admin & LLM Settings" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Primary Expression" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Generated JSON" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Status" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Generate JSON" })).toBeDisabled();
  await expect(page.getByRole("button", { name: "Save to Firestore" })).toBeDisabled();
});

test("admin generated JSON and status cards align on desktop", async ({ page }) => {
  await page.setViewportSize({ width: 1365, height: 900 });
  await page.goto("./admin/");

  const generated = page.getByRole("heading", { name: "Generated JSON" }).locator("..");
  const status = page.getByRole("heading", { name: "Status" }).locator("..");
  const generatedBox = await generated.boundingBox();
  const statusBox = await status.boundingBox();

  expect(generatedBox).not.toBeNull();
  expect(statusBox).not.toBeNull();
  if (!generatedBox || !statusBox) return;

  expect(Math.abs(generatedBox.width - statusBox.width)).toBeLessThanOrEqual(2);
});

import { test, expect } from "@playwright/test";
import { HomePage } from "./pages/home-page";

test("should display the homepage correctly", async ({ page }) => {
  await page.goto("https://sologenic.org");
  await expect(page.getByText("One DEX for all digital assets")).toBeVisible();
  // Add more assertions or interactions here
  const homePage = new HomePage(page);
  await homePage.clickOnQuickSwapMenu(true);
});

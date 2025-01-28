import { test, expect } from "@playwright/test";

const credentials = [
  { username: "standard_user", password: "secret_sauce" },
  { username: "locked_out_user", password: "secret_sauce" },
  { username: "problem_user", password: "secret_sauce" },
  { username: "performance_glitch_user", password: "secret_sauce" },
  { username: "error_user", password: "secret_sauce" },
  { username: "visual_user", password: "secret_sauce" },
];

for (const data of credentials) {
  test(`should log in with ${data.username}`, async ({ page }) => {
    await page.goto("https://www.saucedemo.com");
    await page.getByPlaceholder("Username").fill(data.username);
    await page.getByPlaceholder("Password").fill(data.password);
    await page.getByRole("button", { name: "Login" }).click();
    if (data.username === "locked_out_user") {
      await page.waitForSelector("h3");
      expect(
        await page.getByText(
          "Epic sadface: Sorry, this user has been locked out."
        )
      ).toBeVisible();
    } else {
      await page.waitForURL("https://www.saucedemo.com/inventory.html");
    }
  });
}

import { Page, Locator } from "playwright/test";

export class HomePage {
  readonly page: Page;
  readonly url = "https://sologenic.org";
  readonly isMobile: boolean;

  constructor(page) {
    this.page = page;
  }

  get launchDexBtn() {
    return this.isMobile
      ? this.page.getByRole("button", { name: "Launch DEX" })
      : this.page.getByRole("button", { name: "Launch DEX" });
  }

  async clickOnQuickSwapMenu(isMobile: boolean) {
    if (isMobile) {
      await this.page.locator("#openNavBtn").click();
      await this.page
        .locator(".item-right")
        .getByText("Quick Swap")
        .first()
        .click();
    } else {
      await this.page.locator(".dropbtn").getByText("dApps").click();
      await this.page.getByRole("button", { name: "Quick Swap" }).click();
    }
  }
}

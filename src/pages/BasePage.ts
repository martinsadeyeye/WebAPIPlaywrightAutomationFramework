import { Locator, Page } from "@playwright/test";

export class BasePage {
  protected readonly page: Page; // only the child of the BasePage can access the page property

  // common locators across all pages:
  protected readonly logo: Locator;
  protected readonly footerLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.logo = page.locator(".access-logo-onequity img");
    this.footerLink = page.locator(".access-logo-onequit img");
  }

  //App common features/actions: footer, logo,
  async isLogoVisible(): Promise<boolean> {
    return await this.logo.isVisible();
  }

  //page common features/actions

  //page level generic methods:
  async getPageTitle(): Promise<string> {
    return await this.page.title();
  }

  getPageCurrentURL(): string {
    return this.page.url();
  }

  async waitForPageLoad() {
    await this.page.waitForLoadState("load");
  }

  async takeScreenshot(name: string) {
    return await this.page.screenshot({
      fullPage: true,
      path: `reports/screenshot/${name}.png`,
    });
  }
}

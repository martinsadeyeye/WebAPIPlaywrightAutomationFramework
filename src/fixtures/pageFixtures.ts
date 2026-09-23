import { test as baseTest } from "@playwright/test";
import { BasePage } from "../pages/BasePage";
import { LoginPage } from "../pages/LoginPage";
import { HomePage } from "../pages/HomePage";
import { SendToEquityPage } from "../pages/transactions/SendToEquityPage";

type pageFixtures = {
  basePage: BasePage;
  loginPage: LoginPage;
  homePage: HomePage;
  sendToEquityPage: SendToEquityPage;
};

//extend the playwright test: using baseTest.extend: inheritance
export let test = baseTest.extend<pageFixtures>({
  basePage: async ({ page }, use) => {
    let basePage = new BasePage(page);
    await use(basePage);
  },
  loginPage: async ({ page }, use) => {
    let loginPage = new LoginPage(page);
    await use(loginPage);
  },
  homePage: async ({ page }, use) => {
    let homePage = new HomePage(page);
    await use(homePage);
  },
  sendToEquityPage: async ({ page }, use) => {
    let sendToEquityPage = new SendToEquityPage(page);
    await use(sendToEquityPage);
  },
});

export { expect } from "@playwright/test";

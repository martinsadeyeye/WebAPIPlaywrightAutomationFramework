import { test, expect } from "@playwright/test";
import { LoginPage } from "../../src/pages/LoginPage";

let loginPage: LoginPage;

test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page);
  await loginPage.goToLoginPage();
});

test("Equity has title", async () => {
  let pageTitle = await loginPage.getLoginPageTitle();
  console.log("Equity Login Page Title :", pageTitle);
  expect(pageTitle).toBe("Equity online - More than just banking");
});

test("forgot password exist test", async () => {
  await loginPage.getStarted();
  expect(loginPage.isForgotYourPasswordLinkExist()).toBeTruthy();
});

test("user is able to login to app test", async () => {
  await loginPage.getStarted();
  await loginPage.doSelectCountry(process.env.COUNTRY!);
  await loginPage.doLogin(process.env.USERNAME!, process.env.PASSWORD!);
  await loginPage.doEnterOTP("1", "2", "3", "4", "5", "6");
  await loginPage.doEnterSecurityAnswers(
    process.env.ANSWER1!,
    process.env.ANSWER2!,
  );
  expect(loginPage.isNewDeviceSignInExist()).toBeTruthy();
  await loginPage.doRemoveDeviceIfAvailable();
});

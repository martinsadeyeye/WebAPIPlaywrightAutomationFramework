import { test, expect } from "@playwright/test";
import { LoginPage } from "../../src/pages/LoginPage";
import { HomePage } from "../../src/pages/HomePage";

let loginPage: LoginPage;
let homePage: HomePage;

test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page);
  await loginPage.goToLoginPage();
  await loginPage.getStarted();
  await loginPage.doSelectCountry(process.env.COUNTRY!);
  await loginPage.doLogin(process.env.USERNAME!, process.env.PASSWORD!);
  await loginPage.doEnterOTP("1", "2", "3", "4", "5", "6");
  await loginPage.doEnterSecurityAnswers(
    process.env.ANSWER1!,
    process.env.ANSWER2!,
  );
  // let deviceFlag = await loginPage.isNewDeviceRadioBtnExist();
  // console.log("deviceFlag is ", deviceFlag);
  // expect(await loginPage.isNewDeviceRadioBtnExist()).toBeTruthy();
  await loginPage.doRemoveDeviceIfAvailable();
  homePage = new HomePage(page);
});

test("dashboard page has My Account", async () => {
  expect(homePage.isMyAccountExist()).toBeTruthy();
});

test("My Account Test visible", async () => {
  let myHeaderText = await homePage.getMyAccountHeader();
  console.log(myHeaderText);
  expect(myHeaderText).toEqual("My accounts");
});

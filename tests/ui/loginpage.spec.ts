import { test, expect } from "@playwright/test";
import { LoginPage } from "../../src/pages/LoginPage";
import { log, meta } from "reporting-labs";

let loginPage: LoginPage;

test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page);
  await loginPage.goToLoginPage();
});

test.skip("Equity has title", async () => {
  let pageTitle = await loginPage.getLoginPageTitle();
  console.log("Equity Login Page Title :", pageTitle);
  expect(pageTitle).toBe("Equity online - More than just banking");
});

test("@smoke forgot password exist test", async () => {
  meta({
    priority: "P3",
    severity: "minor",
    owner: "Joe",
    story: "PAY164",
    epic: "epic299",
    feature: "F37",
    issue: "bug194",
  });
  await loginPage.getStarted();
  expect(loginPage.isForgotYourPasswordLinkExist()).toBeTruthy();
});

test.skip("@smoke user is able to login to app test", async () => {
  meta({
    priority: "P2",
    severity: "major",
    owner: "Joe",
    story: "PAY",
    epic: "epic400",
    feature: "F41",
    issue: "bug401",
  });
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

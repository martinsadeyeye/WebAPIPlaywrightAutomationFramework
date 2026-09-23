import { log, meta } from "reporting-labs";
import { test, expect } from "../../src/fixtures/pageFixtures";

test.beforeEach(async ({ loginPage }) => {
  await loginPage.goToLoginPage();
});

test("Equity has title", async ({ loginPage }) => {
  meta({
    priority: "P2",
    severity: "minor",
    owner: "Martins",
    story: "USU101",
    epic: "epeci229",
    feature: "F49",
    issue: "jirabud838",
  });

  let pageTitle = await loginPage.getPageTitle();
  console.log("Equity Login Page Title :", pageTitle);
  await log("Login page title: ", pageTitle);
  expect(pageTitle).toBe("Equity online - More than just banking");
});

test("forgot password exist test", async ({ loginPage }) => {
  meta({
    priority: "P1",
    severity: "blocker",
    owner: "Manish",
    story: "USU102",
    epic: "epeci279",
    feature: "F46",
    issue: "jirabud858",
  });
  await loginPage.getStarted();
  expect(loginPage.isForgotYourPasswordLinkExist()).toBeTruthy();
});

test("user is able to login to app test", async ({ loginPage }) => {
  meta({
    priority: "P3",
    severity: "major",
    owner: "Priyanka",
    story: "USU103",
    epic: "epeci129",
    feature: "F49",
    issue: "jira828",
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

// common feature test
test("App logo exist on onboard page", async ({ basePage }) => {
  expect(basePage.isLogoVisible()).toBeTruthy();
});

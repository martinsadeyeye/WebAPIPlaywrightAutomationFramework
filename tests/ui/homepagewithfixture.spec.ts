import { log, meta } from "reporting-labs";
import { test, expect } from "../../src/fixtures/pageFixtures";

test.beforeEach(async ({ loginPage }) => {
  await loginPage.goToLoginPage();
  await loginPage.getStarted();
  await loginPage.doSelectCountry(process.env.COUNTRY!);
  await loginPage.doLogin(process.env.USERNAME!, process.env.PASSWORD!);
  await loginPage.doEnterOTP("1", "2", "3", "4", "5", "6");
  await loginPage.doEnterSecurityAnswers(
    process.env.ANSWER1!,
    process.env.ANSWER2!,
  );
  await loginPage.doRemoveDeviceIfAvailable();
});

test("dashboard page has My Account", async ({ homePage }) => {
  meta({
    priority: "P0",
    severity: "minor",
    owner: "Martins",
    story: "USU101",
    epic: "epic229",
    feature: "F49",
    issue: "bug090",
  });
  expect(homePage.isMyAccountExist()).toBeTruthy();
});

test("My Account Test visible", async ({ homePage }) => {
  meta({
    priority: "P1",
    severity: "major",
    owner: "Martins",
    story: "USU105",
    epic: "epic099",
    feature: "F48",
    issue: "bug908",
  });

  let myHeaderText = await homePage.getMyAccountHeader();
  console.log(myHeaderText);
  await log("Login page title: ", myHeaderText);

  expect(myHeaderText).toEqual("My accounts");
});

test("Airtime menu link is available on Homepage Test", async ({
  homePage,
  page,
}) => {
  await homePage.navigateToSendToEquity();
  // await page.pause();
});

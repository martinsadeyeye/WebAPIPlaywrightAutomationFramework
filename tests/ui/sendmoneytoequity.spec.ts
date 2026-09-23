import { test, expect } from "../../src/fixtures/pageFixtures";
import { log, meta } from "reporting-labs";
import { CsvHelper } from "../../src/utils/CsvHelper";
import { ExcelHelper } from "../../src/utils/ExcelHelper";
import { JsonHelper } from "../../src/utils/JsonHelper";
import { getCountryDataFilePath } from "../../src/utils/DataResolver";
import { CountryTestData } from "../../src/utils/CountryTestData";
import * as allure from "allure-js-commons";

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

test("Verify send money to equity header", async ({
  homePage,
  sendToEquityPage,
  page,
}) => {
  meta({
    priority: "P3",
    severity: "blocker",
    owner: "Joe",
    story: "PAY104",
    epic: "epic290",
    feature: "F39",
    issue: "bug114",
  });
  await homePage.navigateToSendToEquity();
  let myHeaderText = await sendToEquityPage.getSendToEquityHeader();
  await log("Login page title: ", myHeaderText);
  console.log(myHeaderText);
  expect(myHeaderText).toEqual("Send to Equity");
});

test("Send Money to Another Equity Test", async ({
  homePage,
  sendToEquityPage,
  page,
}) => {
  await homePage.navigateToSendToEquity();
});

//DD_1: read csv data directly from the CSV file and loop the test method row wise...
let testCsvData = CsvHelper.readCsv("src/testData/uganda.csv");
for (let row of testCsvData) {
  test(`Send Money with Invalid Amount with CSV Data  - ${row.accountNumber} - ${row.amount}`, async ({
    loginPage,
    homePage,
    sendToEquityPage,
  }) => {
    await homePage.navigateToSendToEquity();
    await sendToEquityPage.sendInvalidAmountToAnotherEquity(
      row.accountNumber,
      row.amount,
    );
    expect(await sendToEquityPage.isValidAmountErrorDisplayed()).toBeTruthy();
  });
}

//DD_2: read xlsx data directly from the excel file and loop the test method row wise...
let testExcelData = ExcelHelper.readExcel(
  "src/testData/uganda.xlsx",
  "sendToEquity",
);
for (let row of testExcelData) {
  test.skip(`Send Money with Invalid Amount with Excel Data - ${row.accountNumber} - ${row.amount}`, async ({
    loginPage,
    homePage,
    sendToEquityPage,
  }) => {
    meta({
      priority: "P3",
      severity: "blocker",
      owner: "Joe",
      story: "PAY102",
      epic: "epic290",
      feature: "F39",
      issue: "bug112",
    });
    await homePage.navigateToSendToEquity();
    await sendToEquityPage.sendInvalidAmountToAnotherEquity(
      row.accountNumber,
      row.amount,
    );

    await allure.step(
      "verify that send to equity menu is visible",
      async () => {
        expect(
          await sendToEquityPage.isValidAmountErrorDisplayed(),
        ).toBeTruthy();
      },
    );
  });
}

//DD_3: read json data directly from the json file and loop the test method row wise...
let testJSONData = JsonHelper.readJson<CountryTestData[]>(
  getCountryDataFilePath(),
);
for (let row of testJSONData) {
  test(`Send Money To Another Equity with Invalid Amount with JSON Data - ${row.anotherEquityAccount} - ${row.invalidAmounts}`, async ({
    loginPage,
    homePage,
    sendToEquityPage,
  }) => {
    meta({
      priority: "P3",
      severity: "blocker",
      owner: "Joe",
      story: "PAY101",
      epic: "epic290",
      feature: "F39",
      issue: "bug111",
    });

    await homePage.navigateToSendToEquity();
    await sendToEquityPage.sendInvalidAmountToAnotherEquity(
      row.anotherEquityAccount,
      row.invalidAmounts,
    );
    await allure.step(
      "verify that send to equity menu is visible",
      async () => {
        expect(
          await sendToEquityPage.isValidAmountErrorDisplayed(),
        ).toBeTruthy();
      },
    );
    let InvalidActualAmountError =
      await sendToEquityPage.getAmountErrorMessage();
    expect(InvalidActualAmountError).toEqual(process.env.InvalidError!);
  });
}

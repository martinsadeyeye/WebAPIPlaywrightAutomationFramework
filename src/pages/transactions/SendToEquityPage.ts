import { Locator, Page } from "@playwright/test";
import { BasePage } from "../BasePage";

export class SendToEquityPage extends BasePage {
  //1. private locator
  private readonly sendToEquityHeader: Locator;
  private readonly recipientCountry: Locator;
  private readonly recipientAccountNumber: Locator;
  private readonly continueBtn: Locator;
  private readonly amountCurrency: Locator;
  private readonly amountField: Locator;
  private readonly paymentReason: Locator;
  private readonly amountError: Locator;
  private readonly sendMoneyBtn: Locator;

  constructor(page: Page) {
    super(page);
    this.sendToEquityHeader = page.getByText("Send to Equity");
    this.recipientCountry = page.getByRole("textbox", { name: "Country" });
    this.recipientAccountNumber = page.getByRole("textbox", {
      name: "Account or mobile number",
    });
    this.continueBtn = page
      .locator(".mdc-button__label span")
      .filter({ hasText: "continue" });

    this.amountCurrency = page.getByRole("textbox");
    this.amountField = page.getByRole("textbox", { name: "Enter an amount" });
    this.paymentReason = page.getByRole("textbox", { name: "Payment reason" });
    this.amountError = page.locator(".mat-mdc-form-field-error"); // The amount cannot be less than 1 UGX
    this.sendMoneyBtn = page.getByRole("button", { name: "Send money" });
  }

  //3. Create public page actions (method)/ behavior : Encapsulation

  async isSendToEquityExist(): Promise<boolean> {
    return await this.sendToEquityHeader.isVisible();
  }

  async getSendToEquityHeader(): Promise<string | null> {
    await this.sendToEquityHeader.waitFor({ state: "visible" });
    return await this.sendToEquityHeader.innerText();
  }

  async sendInvalidAmountToAnotherEquity(
    accountNumber: string,
    amount: string,
  ): Promise<void> {
    await this.recipientAccountNumber.waitFor({
      state: "visible",
    });
    await this.recipientAccountNumber.fill(accountNumber);
    await this.continueBtn.click();
    await this.amountField.waitFor({ state: "visible" });
    await this.amountField.fill(amount);
  }

  async isValidAmountErrorDisplayed(): Promise<Boolean> {
    let actualError = await this.amountError.innerText();
    console.log(actualError);
    return await this.amountError.isVisible();
  }

  async getAmountErrorMessage(): Promise<string> {
    const text = await this.amountError.innerText();
    return text.replace(/\s+/g, " ").trim();
  }
}

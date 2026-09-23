import { Locator, Page } from "@playwright/test";
import { BasePage } from "../BasePage";

export class BuyAirtimePage extends BasePage {
  //1. private locator
  private readonly sendToEquityHeader: Locator;

  constructor(page: Page) {
    super(page);
    this.sendToEquityHeader = page.getByText("Send to Equity");
  }
}

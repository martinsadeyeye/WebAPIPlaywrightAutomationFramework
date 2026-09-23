import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class HomePage extends BasePage {
  //1. private locator
  private readonly myAccountHeader: Locator;
  private readonly showBalance: Locator;
  private readonly selectedCurrency: Locator;
  private readonly youHave: Locator;
  private readonly youOwe: Locator;
  private readonly hideBalance: Locator;
  private readonly homeMenuItem: Locator;
  private readonly accountsAndCardsMenuItem: Locator;
  private readonly transactMenuItem: Locator;
  private readonly borrowMenuItem: Locator;
  private readonly saveMenuItem: Locator;
  private readonly settingsMenuItem: Locator;
  private readonly languageToggle: Locator; // "English"
  private readonly darkModeToggle: Locator;
  private readonly signOutMenuItem: Locator;
  private readonly sendToEquityBtn: Locator;
  private readonly buyAirtimeBtn: Locator;
  private readonly sendToMobileBtn: Locator;
  private readonly payABillBtn: Locator;
  private readonly sendToAnotherBankBtn: Locator;
  private readonly payEquityTillBtn: Locator;
  private readonly mobileToEquityBtn: Locator;

  // private readonly myAccountsHeading: Locator;
  // private readonly viewAllAccountsLink: Locator;
  // private readonly accountCards: Locator;
  // private readonly accountCardOptionsBtn: Locator; // the "..." menu per card
  // private readonly carouselNextBtn: Locator; // the ">" arrow
  // private readonly carouselDots: Locator;
  // private readonly forexCalculatorHeading: Locator;
  // private readonly forexCalculatorExpandBtn: Locator;
  // private readonly fromCurrencyLabel: Locator; // "USD"
  // private readonly toCurrencyLabel: Locator; // "UGX"
  // private readonly buyingRateValue: Locator;
  // private readonly sellingRateValue: Locator;
  // private readonly swapCurrencyBtn: Locator; // the ⇄ icon

  //2. constructor of the page class: init the locators:
  constructor(page: Page) {
    super(page);
    this.myAccountHeader = page.getByRole("heading", {
      name: "My accounts",
      level: 3,
    });
    this.showBalance = page.getByRole("button", { name: "Show balance" });
    this.selectedCurrency = page.getByText("Selected currency", {
      exact: true,
    });
    this.youHave = page.getByText("You have", { exact: true });
    this.youOwe = page.getByText("You owe", { exact: true });
    this.hideBalance = page.getByRole("button", { name: "Hide balance" });

    this.homeMenuItem = page.getByRole("link", { name: "Home" });
    this.accountsAndCardsMenuItem = page.getByRole("link", {
      name: "Accounts & Cards",
    });
    this.transactMenuItem = page.getByRole("link", { name: "Transact" });
    this.borrowMenuItem = page.getByRole("link", { name: "Borrow" });
    this.saveMenuItem = page.getByRole("link", { name: "Save" });
    this.settingsMenuItem = page.getByRole("link", { name: "Settings & more" });
    this.languageToggle = page.getByText("English");
    this.darkModeToggle = page.locator(
      ".mat-drawer-inner-container a .mdc-list-item__content app-toggle-button",
    );
    //page.locator('.mat-drawer-inner-container a .mdc-list-item__content').filter({hasText:'Dark mode'}).locator(app-toggle-button).click();
    this.signOutMenuItem = page.getByText("Sign out", { exact: true }).first();

    this.sendToEquityBtn = page.locator(".navigation-buttons .item").filter({ hasText: "Send to" }).filter({ hasText: "Equity" });
    this.buyAirtimeBtn = page
      .locator(".navigation-buttons .item")
      .filter({ hasText: "Buy" })
      .filter({ hasText: "Airtime" });
    this.sendToMobileBtn = page
      .locator(".navigation-buttons .item")
      .filter({ hasText: "Send to" })
      .filter({ hasText: "Mobile" });
    this.payABillBtn = page
      .locator(".navigation-buttons .item")
      .filter({ hasText: "Pay a" })
      .filter({ hasText: "Bill" });
    this.sendToAnotherBankBtn = page
      .locator(".navigation-buttons .item")
      .filter({ hasText: "Send to" })
      .filter({ hasText: "Another bank" });
    this.payEquityTillBtn = page
      .locator(".navigation-buttons .item")
      .filter({ hasText: "Pay" })
      .filter({ hasText: "to Equity Till" });
    this.mobileToEquityBtn = page
      .locator(".navigation-buttons .item")
      .filter({ hasText: "Mobile to" })
      .filter({ hasText: "Equity" });
  }

  //3. Create public page actions (method)/ behavior : Encapsulation

  async isMyAccountExist(): Promise<boolean> {
    return await this.myAccountHeader.isVisible();
  }

  async getMyAccountHeader(): Promise<string | null> {
    return await this.myAccountHeader.textContent();
  }

  async navigateToSendToEquity(): Promise<void> {
    return await this.sendToEquityBtn.click();
  }

  
  async navigateToBuyAirtime(): Promise<void> {
    return await this.buyAirtimeBtn.click();
  }
  async navigateToSendToMobileWallet(): Promise<void> {
    return await this.sendToMobileBtn.click();
  }
  async navigateToPayABill(): Promise<void> {
    return await this.payABillBtn.click();
  }
  async navigateToSendToAnotherBank(): Promise<void> {
    return await this.sendToAnotherBankBtn.click();
  }
  async navigateToPayEquityTill(): Promise<void> {
    return await this.payEquityTillBtn.click();
  }
  async navigateToMobileToEquity(): Promise<void> {
    return await this.mobileToEquityBtn.click();
  }
}

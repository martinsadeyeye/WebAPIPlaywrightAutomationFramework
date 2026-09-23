import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class LoginPage extends BasePage {
  //1. private locator
  private readonly getStartedBtn: Locator;
  private readonly countryDropDown: Locator;
  private readonly countryList: Locator;
  private readonly emailOrMobileNumber: Locator;
  private readonly password: Locator;
  private readonly signInBtn: Locator;
  private readonly forgotYourPasswordLink: Locator;
  private readonly chooseOTPMethod: Locator;
  private readonly nextBtn: Locator;
  private readonly otpInput1: Locator;
  private readonly otpInput2: Locator;
  private readonly otpInput3: Locator;
  private readonly otpInput4: Locator;
  private readonly otpInput5: Locator;
  private readonly otpInput6: Locator;
  private readonly verifyBtn: Locator;
  private readonly verifyQuestionBtn: Locator;
  private readonly continueBtn: Locator;
  private readonly secQuestionOne: Locator;
  private readonly secQuestionTwo: Locator;
  private readonly confirmBtn: Locator;
  private readonly newDeviceSignInText: Locator;
  private readonly displayedDevice: Locator;
  private readonly removeDeviceBtn: Locator;
  private readonly closeModal: Locator;
  private readonly deviceRadioButton: Locator;
  private readonly systemDowntime: Locator;

  //2. constructor of the page class: init the locators:
  constructor(page: Page) {
    super(page); // this is because the parent class (BasePage) has a constructor also
    this.getStartedBtn = page.getByRole("button", { name: "Get started" });
    this.countryDropDown = page.getByRole("textbox", { name: "Country" });
    this.countryList = page
      .locator(".country-list-item")
      .locator(".text-truncate");
    this.emailOrMobileNumber = page.getByRole("textbox", {
      name: "Email address or mobile number",
    });
    this.password = page.getByRole("textbox", { name: "Enter password" });
    this.signInBtn = page.getByRole("button", { name: "Sign in" });
    this.forgotYourPasswordLink = page.getByText("Forgot your password?");
    this.chooseOTPMethod = page
      .getByTestId("choose-otp-method-mat-list-method-Sms")
      .nth(0);
    this.nextBtn = page.getByRole("button", { name: "Next" });
    this.otpInput1 = page.getByTestId("verify-otp-input-digits-0");
    this.otpInput2 = page.getByTestId("verify-otp-input-digits-1");
    this.otpInput3 = page.getByTestId("verify-otp-input-digits-2");
    this.otpInput4 = page.getByTestId("verify-otp-input-digits-3");
    this.otpInput5 = page.getByTestId("verify-otp-input-digits-4");
    this.otpInput6 = page.getByTestId("verify-otp-input-digits-5");
    this.verifyBtn = page.getByRole("button", { name: "Verify" });
    this.verifyQuestionBtn = page.getByTestId("verify-menu-ripple-Questions");
    this.continueBtn = page.getByRole("button", { name: "Continue" });
    this.secQuestionOne = page.locator("#mat-input-4");
    this.secQuestionTwo = page.locator("#mat-input-6");
    this.confirmBtn = page.getByRole("button", { name: "Confirm" });
    this.newDeviceSignInText = page.getByRole("heading", {
      name: "New device sign-in",
      level: 3,
    });
    this.systemDowntime = page.getByRole("heading", {
      name: "System Downtime",
      level: 3,
    });
    this.displayedDevice = page.locator(
      ".modal-content app-activated-device-item mat-icon",
    );
    this.removeDeviceBtn = page.getByRole("button", { name: "Remove devices" });
    this.closeModal = page.locator(".modal-content");
    this.deviceRadioButton = page
      .locator("div")
      .filter({ hasText: "radio_button_unchecked" });
  }

  //await page.locator('div').filter({ hasText: 'Dear ANTHONY,<br/><br/>Your' }).nth(4).click();
  //await page.getByRole('dialog').click();
  // await page.locator('div').filter({ hasText: 'radio_button_unchecked' }).nth(5).click();

  //3. Create public page actions (method)/ behavior : Encapsulation

  async goToLoginPage(): Promise<void> {
    await this.page.goto("/en/access/login");
  }
  async getLoginPageTitle(): Promise<string> {
    return await this.page.title();
  }
  async isForgotYourPasswordLinkExist(): Promise<boolean> {
    return await this.forgotYourPasswordLink.isVisible();
  }

  async isGetStartedVisible(): Promise<boolean> {
    return await this.getStartedBtn.isVisible();
  }

  async getStarted(): Promise<void> {
    await this.getStartedBtn.click();
  }

  async doSelectCountry(countryName: string): Promise<void> {
    await this.countryDropDown.click();
    let country: Locator[] = await this.countryList.all();

    for (let countryList of country) {
      let countryText = await countryList.innerText();
      console.log("Country available: ", countryText);
      if (countryText === countryName) {
        countryList.click();
        break;
      }
    }
  }

  async doLogin(username: string, password: string): Promise<void> {
    console.log(`user cred: ${username} - ${password}`);
    await this.emailOrMobileNumber.fill(username);
    await this.password.fill(password);
    await this.signInBtn.click();
  }


  async isValidAmountErrorDisplayed(): Promise<Boolean> {
    return await this.amountError.isVisible();
  }

  async doEnterOTP(
    digit1: string,
    digit2: string,
    digit3: string,
    digit4: string,
    digit5: string,
    digit6: string,
  ): Promise<void> {
    await this.chooseOTPMethod.click();
    await this.nextBtn.click();
    await this.otpInput1.fill(digit1);
    await this.otpInput2.fill(digit2);
    await this.otpInput3.fill(digit3);
    await this.otpInput4.fill(digit4);
    await this.otpInput5.fill(digit5);
    await this.otpInput6.fill(digit6);
    await this.verifyBtn.click();
  }

  async doEnterSecurityAnswers(
    secAnswerOne: string,
    secAnswerTwo: string,
  ): Promise<void> {
    await this.verifyQuestionBtn.click();
    await this.continueBtn.click();
    await this.secQuestionOne.fill(secAnswerOne);
    await this.secQuestionTwo.fill(secAnswerTwo);
    await this.confirmBtn.click();
    await this.page.waitForLoadState("load");
  }

  async isNewDeviceSignInExist(): Promise<boolean> {
    return await this.newDeviceSignInText.isVisible();
  }

  async isNewDeviceRadioBtnExist(): Promise<boolean> {
    return await this.displayedDevice.isVisible();
  }

  async doRemoveDeviceIfAvailable(): Promise<void> {
    //   if (await this.isNewDeviceRadioBtnExist()) {
    await this.displayedDevice
      .first()
      .waitFor({ state: "visible", timeout: 10000 });

    let deviceCount = (await this.displayedDevice.count()) - 1;
    console.log("total device:", deviceCount);

    for (let i = 0; i < deviceCount; i++) {
      let availableDevice = this.displayedDevice.nth(i);

      console.log(`Clicking link ${i + 1}/${deviceCount}`);
      await this.page.waitForLoadState("load");
      await availableDevice.click();
    }
    await this.removeDeviceBtn.click();

    // }

    if (await this.isSystemDown()) {
      await this.page.close();
    }
  }

  async isModalDisplayed(): Promise<boolean> {
    return this.closeModal.isVisible();
  }

  async closeOpenModal() {
    if (await this.isModalDisplayed()) {
    }
  }

  async isSystemDown(): Promise<boolean> {
    return this.systemDowntime.isVisible();
  }
}

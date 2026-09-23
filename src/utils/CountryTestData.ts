// src/types/CountryTestData.ts

export interface RtgsPreferentialRateAmount {
  min1: string;
  max1: string;
  min2: string;
  max2: string;
  min3: string;
  max3: string;
  min4: string;
}

export interface MobileMoneyTelcos {
  airtelMoney: string;
  favourite: string;
  mtnMoney?: string;
  mpesa?: string;
  tKash?: string;
}

export interface Telco {
  mtn?: string;
  favourite: string;
  airtel: string;
  africell?: string;
  safaricom?: string;
  equitel?: string;
  telkom?: string;
  rwandaAirtel?: string;
  rwandaMtn?: string;
}

export interface PhoneNumber {
  airtelMoney: string;
  mtn?: string;
  favourite: string;
  africell?: string;
  mpesa?: string;
  tKash?: string;
  safaricom?: string;
  equitel?: string;
  telkom?: string;
  rwandaAirtel?: string;
}

export interface PayBill {
  // Uganda-style keys
  mtnBillCode?: string;
  mtnEscrowNumber?: string;
  umeneNewConnBillCode?: string;
  umeneNewConnMeterNumber?: string;
  johnSchBiller?: string;
  johnSchAccount?: string;
  billCode?: string;
  billNumber?: string;
  billedName?: string;
  chipFishName?: string;
  uedclLightBillerMeterNumber?: string;
  uedclLightBillerTokenPhoneNumber?: string;
  // Kenya-style keys
  kplcBillCode?: string;
  kplcAccountMeterNumber?: string;
  tokenDeliveryPhoneNumber?: string;
  zukuBillCode?: string;
  zukuAccountMeterNumber?: string;
  waterBillCode?: string;
  waterAccountNumber?: string;
}

export interface DestinationCountry {
  ke: string;
  rw: string;
  ug: string;
  tz: string;
  ss: string;
  drc: string;
}

export interface InterCountry {
  keEquityAccount?: string;
  keUsdAccount?: string;
  rwEquityAccount: string;
  rwUsdAccount: string;
  tzEquityAccount: string;
  tzUsdAccount: string;
  ssEquityAccount: string;
  ssUsdAccount: string;
  ugEquityAccount?: string;
  ugUsdAccount?: string;
}

export interface Loans {
  salaryAdvanceMinimumPartialAmount: string;
  salaryAdvanceRepaymentPartialAmount: string;
}

export interface TokenPhoneNumber {
  meterNumber: string;
  phoneNumber: string;
}

export interface EcosystemPurchaseOptions {
  "1": string;
  "2": string;
  "3": string;
}

export interface FdrLoan {
  loanAmount: string;
}

export interface CountryTestData {
  // --- Identity / core account fields (common to all countries) ---
  subsidiary: string;
  anotherEquityAccount: string;
  invalidAmounts: string;
  savingsAccountNumber: string;
  foreignAccountNumber: string;
  foreignDestAccountNumber: string;
  paytocardAccountNumber: string;
  localCurrency: string;
  foreignCurrency: string;

  // --- Optional country-specific account numbers ---
  paypalAccountNumber?: string;
  pesalinkAccountNumber?: string;
  pesalinkNumber?: string;

  // --- Destination / transfer details ---
  intraDestinationAccount: string;
  intraDestinationChargeFee: string;
  intraDestinationChargeFeeFx: string;
  rtgsDestinationName: string;
  rtgsDestinationAccount: string;
  rtgsDestinationName1?: string;
  rtgsDestinationAccount1?: string;
  pesalinkRtgsDestinationName?: string;
  pesalinkRtgsDestinationAccount?: string;
  physicalAddress: string;
  anotherBankDestinationAccount: string;

  // --- Charge fees ---
  noChargeFee: string;
  usdNoChargeFee?: string;
  rtgsChargeFee: string;
  rtgsChargeFeeFx: string;
  rtgsEtfChargeFee: string;
  rtgsEtfChargeFeeFx: string;
  swiftFullChargeFee: string;
  swiftFullChargeFeeFx: string;
  swiftPartialChargeFee: string;
  swiftPartialChargeFeeFx: string;
  transactionChargeFee: string;
  transactionChargeFeePesalink?: string;
  usdPesalinkChargeFee?: string;
  payToCardChargeFee: string;
  buyGoodChargeFee: string;
  payBillChargeFee: string;
  airtimeChargeFee: string;
  westerUnionChargeFee?: string;
  agentNumberChargeFee: string;
  atmNumberChargeFee: string;

  // --- Amounts ---
  minimum: string;
  maximum: string;
  payToCardAmount: string;
  payToCardMinimum?: string;
  payToCardMaximum?: string;
  rtgsMinimumFx: string;
  rtgsMaximumFx: string;
  rtgsMinimum: string;
  rtgsMaximum: string;
  rtgsPreferentialRateAmount: RtgsPreferentialRateAmount;
  pesalinkRtgsMinimum?: string;
  pesalinkRtgsMaximum?: string;
  swiftMinimum: string;
  swiftMaximum: string;
  moderateMinimum: string;
  moderateMaximum: string;
  buyGoodMinimum: string;
  buyGoodMaximum: string;
  mobileMoneyMinimum: string;
  mobileMoneyMaximum: string;
  usdMinimum: string;
  usdMaximum: string;
  westerUnionMin?: string;
  westerUnionMax?: string;
  highValueMinimum: string;
  highValueMaximum: string;
  highValueForeign?: string;
  localAmountToUsdZero: string;
  localAmountToUsdMinimum: string;
  localAmountToUsdMaximum: string;
  usdToLocalAmountMinimum: string;
  usdToLocalAmountMaximum: string;
  interCountryMinimumZero: string;
  interCountryMinimum: string;
  interCountryMaximum: string;
  interCountryChargeFee: string;
  interCountryUsdChargeFee: string;
  agentMin: string;
  agentMax: string;
  atmMin: string;
  atmMax: string;
  payPalMin?: string;
  payPalMax?: string;
  payPalChargeFee?: string;

  // --- Location / SWIFT / address details ---
  swiftCountry: string;
  swiftBankCode: string;
  swiftAccount: string;
  countryValue: string;
  subCountryValue: string;
  l0CationCityValue: string;
  province: string;
  county: string;
  locationTown: string;
  streetRoadBuildingNameValue: string;
  transactionCurrency?: string;

  // --- Buy goods / till ---
  buyGoodsTillNumber: string;
  buyGoodsTillSearchNumber: string;

  // --- Savings / goals / loans ---
  goalOpeningAmount: string;
  goalTargetAmount: string;
  fixedAmount: string;
  classicOpeningAmount: string;
  classicMinimumAmountCheck: string;
  classicRecurringAmount: string;
  callOpeningAmount: string;
  callWithdrawalAmount: string;
  callWithdrawalAmount2: string;
  callMinimumAmountCheck: string;
  savingsChallengeStartingAmount?: string;
  boostikaSourceAccountNumber?: string;
  boostikaPartialAmount?: string;
  installmentPartialAmount?: string;
  installmentPartialRepaymentAmount?: string;
  ecosystemPartialAmount?: string;
  paymentCode?: string;
  oneMonthPartialAmount: string;
  oneMonthPartialRepaymentAmount: string;
  salaryAdvanceRepaymentPartialAmount?: string;
  salaryAdvanceLoanAmount?: string;
  pensionLoanAmount?: string;
  pensionRepaymentPartialAmount?: string;
  assetFinanceLoanAmount: string;
  residentialMortgageLoanAmount?: string;
  projectCost: string;
  customersDeposit: string;
  mortgageLoanAmount: string;
  workingCapitalLoanAmount: string;
  loanProducts?: string[];
  ecosystemPurchaseOptions?: EcosystemPurchaseOptions;
  fdrLoan?: FdrLoan;
  minLoanLimit?: string;
  loans?: Loans;

  // --- Nested reference/lookup objects ---
  mobileMoneyTelcos: MobileMoneyTelcos;
  telco: Telco;
  phoneNumber: PhoneNumber;
  payBill: PayBill;
  destinationCountry: DestinationCountry;
  interCountry: InterCountry;
  tokenPhoneNumber?: TokenPhoneNumber;

  // --- Agent / ATM ---
  agentNumber: string;

  // --- Scheduled payments ---
  schedulePaymentMinimum: string;
  schedulePaymentMaximum: string;
  schedulePaymentMinimumUsd: string;
  schedulePaymentMaximumUsd: string;
  schedulePaymentMin: string;
  schedulePaymentMax: string;
  schedulePaymentMobileMoneyMin: string;
  schedulePaymentMobileMoneyMax: string;
  schedulePaymentChargeFee: string;
  schedulePaymentIntraDestinationChargeFee: string;
  schedulePaymentMmChargeFee: string;
  schedulePaymentNoChargeFee: string;
  schedulePaymentNoChargeMm: string;
  schedulePaymentPayBillChargeFee: string;

  // --- Money transfer (MoneyGram, Western Union, Govt payments) ---
  mtcn: string;
  moneyGramMin: string;
  moneyGramMax: string;
  moneyGramRecipientCountry: string;
  govtPaymentMin?: string;
  govtPaymentMax?: string;
  cbkRefNumber?: string;
  cbkChargeFee?: string;

  // --- Favourites / aliases ---
  equityAccAlias: string;
  walletAlias: string;
  rtgsAlias: string;
  swiftAlias: string;
  paybillAlias: string;
  buyGoodsAlias: string;
  buyAirtimeAlias: string;

  // --- Insurance / investment (Kenya-specific so far) ---
  educationSavingTargetAmount?: string;
  coverStartDate?: string;
  coverEndDate?: string;
  investmentTerm?: string;
  targetOption?: string;
  premiumFrequency?: string;
  beneficiaryRelationship?: string;
  beneficiaryFirstName?: string;
  beneficiaryLastName?: string;
  beneficiaryDobYear?: string;
  beneficiaryDobDay?: string;
  beneficiaryIdNumber?: string;
  beneficiaryEmail?: string;
  beneficiaryPhoneNumber?: string;
  removeReason?: string;
  inpatientAmount?: string;
  outpatientAmount?: string;
  otherLoanAmount?: string;
  spouseDobDate?: string;
  noOfChildren?: string;
  bronzeTargetAmount?: string;
  silverTargetAmount?: string;
  goldTargetAmount?: string;
  platinumTargetAmount?: string;

  // --- Card details ---
  cardName?: string;
  cardNumber?: string;
  cvv2?: string;
  expiryDate?: string;
}

import { test as baseTest } from "@playwright/test";
import { ApiHelper } from "../api/ApiHelper";

//define types for API fixtures:
type ApiFixtures = {
  apiHelper: ApiHelper;
  bookerApiHelper: ApiHelper;
  goRestApiHelper: ApiHelper;
};

export let test = baseTest.extend<ApiFixtures>({
  apiHelper: async ({ request }, use) => {
    let apiHelper = new ApiHelper(request, process.env.API_BASE_URL!);
    await use(apiHelper);
  },

  bookerApiHelper: async ({ request }, use) => {
    let bookerApiHelper = new ApiHelper(
      request,
      process.env.BOOKER_API_BASE_URL!,
    );
    await use(bookerApiHelper);
  },
  goRestApiHelper: async ({ request }, use) => {
    let goRestApiHelper = new ApiHelper(
      request,
      process.env.GO_REST_API_BASE_URL!,
    );
    await use(goRestApiHelper);
  },
});

export { expect } from "@playwright/test";

import test, { APIResponse, expect } from "@playwright/test";

let AUTH_TOKEN = {
  Authorization:
    "Bearer 1d845aa4bebcdb0fea690adf59de3b6fb715af4f80c5eb86c3556abc69909d81",
};

test("get all users api test", async ({ request }) => {
  let response: APIResponse = await request.get(
    "https://gorest.co.in/public/v2/users",
    {
      headers: AUTH_TOKEN,
    },
  );

  //console.log(response);
  let jsonBody = await response.json();
  console.log(jsonBody);
  console.log(response.status());
  console.log(response.statusText());
});

test("create user POST api test", async ({ request }) => {
  let userData = {
    name: "PW User",
    email: `pwautomation_${Date.now()}@mann.test`,
    gender: "male",
    status: "active",
  };

  //JS Object --- JSON (Serialization)
  //JSON.stringify();

  let response: APIResponse = await request.post(
    "https://gorest.co.in/public/v2/users/",
    {
      headers: AUTH_TOKEN,
      data: userData,
    },
  );

  //console.log(response);
  let jsonBody = await response.json();
  console.log(jsonBody);
  console.log(response.status());
  console.log(response.statusText());
});

test("Update user PUT api test", async ({ request }) => {
  let userData = {
    name: "Obi Cubana",
    email: "obi_cubana@hartmann-mann.test",
    gender: "male",
    status: "inactive",
  };

  //JS Object --- JSON (Serialization)
  //JSON.stringify();

  let response: APIResponse = await request.put(
    "https://gorest.co.in/public/v2/users/8617292",
    {
      headers: AUTH_TOKEN,
      data: userData,
    },
  );

  //console.log(response);
  let jsonBody = await response.json();
  console.log(jsonBody);
  console.log(response.status());
  console.log(response.statusText());
});

test("Delete user DELETE api test", async ({ request }) => {
  let response: APIResponse = await request.delete(
    "https://gorest.co.in/public/v2/users/8617292",
    {
      headers: AUTH_TOKEN,
    },
  );

  console.log(response.status());
  console.log(response.statusText());
  expect(response.status()).toBe(204);
});

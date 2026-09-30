import { test, expect } from "../../src/fixtures/apifixtures";

const TOKEN = process.env.API_TOKEN!;

let AUTH_HEADER = {
  Authorization: `Bearer ${TOKEN}`,
};

let userId: number;

test.describe.serial("Running E2E go rest CRUD apis tests", () => {
  //GET
  test("GET API - get all user", async ({ goRestApiHelper }) => {
    let response = await goRestApiHelper.get("/public/v2/users", AUTH_HEADER);

    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
  });

  //POST
  test("POST API - Create a new user", async ({ goRestApiHelper }) => {
    let userData = {
      name: "PW User",
      email: `pwAutomation_${Date.now()}@mann.dev`,
      gender: "male",
      status: "active",
    };

    let response = await goRestApiHelper.post(
      "/public/v2/users",
      userData,
      AUTH_HEADER,
    );

    expect(response.status).toBe(201);
    userId = response.body.id;
    console.log(userId);
  });

  //PUT
  test("PUT API - update a user", async ({ goRestApiHelper }) => {
    let userData = {
      name: "PW User",
      email: `updatedEmail${Date.now()}@mann.test`,
      gender: "male",
      status: "inactive",
    };

    let response = await goRestApiHelper.put(
      `/public/v2/users/${userId}`,
      userData,
      AUTH_HEADER,
    );

    expect(response.status).toBe(200);
    let updatedUserId = response.body.id;
    expect(updatedUserId).toBe(userId);
    expect(response.body.status).toBe(userData.status);
  });

  //DELETE
  test("Delete API - Delete a user", async ({ goRestApiHelper }) => {
    let response = await goRestApiHelper.delete(
      `/public/v2/users/${userId}`,
      AUTH_HEADER,
    );

    expect(response.status).toBe(204);
  });
});

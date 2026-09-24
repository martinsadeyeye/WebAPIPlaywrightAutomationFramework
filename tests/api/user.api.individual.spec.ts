import { test, expect } from "../../src/fixtures/apifixtures";

const TOKEN = process.env.API_TOKEN!;

let AUTH_HEADER = {
  Authorization: `Bearer ${TOKEN}`,
};

//Helper - generic function -- create a user (POST- CALL)

async function createUser(goRestApiHelper: any) {
  //User JS Object
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
  return response.body;
}

//Test case 1: create a user test + verify : AAA
// POST call --> Retrieve the USER ID ---
// GET Call --> verify the User created
test("Create a user test", async ({ goRestApiHelper }) => {
  //Create a user
  let userResponse = await createUser(goRestApiHelper);

  //get a user
  let getResponse = await goRestApiHelper.get(
    `/public/v2/users/${userResponse.id}`,
    AUTH_HEADER,
  );
  expect(getResponse.status).toBe(200);
  expect(getResponse.body.name).toBe("PW User");
});

//Test case 2: Update a user test + verify : AAA
// POST call --> Retrieve the USER ID ---
// GET Call --> verify the User created using /userID
// PUT Call- update user details using /userID
// GET Call --> verify the User updated using /userID
test("update a user test", async ({ goRestApiHelper }) => {
  //1. Create a user
  let userResponse = await createUser(goRestApiHelper);

  //2. get a user
  let getResponse = await goRestApiHelper.get(
    `/public/v2/users/${userResponse.id}`,
    AUTH_HEADER,
  );
  expect(getResponse.status).toBe(200);
  expect(getResponse.body.name).toBe("PW User");

  //3. Update a user details
  let userUpdatedData = {
    name: "PW1 User1",
    email: `updatedEmail${Date.now()}@mann.test`,
    gender: "male",
    status: "inactive",
  };

  let updateResponse = await goRestApiHelper.put(
    `/public/v2/users/${userResponse.id}`,
    userUpdatedData,
    AUTH_HEADER,
  );

  expect(updateResponse.status).toBe(200);
  let updatedUserId = updateResponse.body.id;
  expect.soft(updatedUserId).toBe(userResponse.id);
  expect.soft(updateResponse.body.status).toBe(userUpdatedData.status);

  //4. get a user detail after update
  getResponse = await goRestApiHelper.get(
    `/public/v2/users/${updatedUserId}`,
    AUTH_HEADER,
  );
  expect(getResponse.status).toBe(200);
  expect.soft(getResponse.body.name).toBe("PW1 User1");
});

//Test case 3: Update a user test + verify : AAA
// POST call --> Retrieve the USER ID ---
// GET Call --> verify the User created using /userID
// PATCH Call- update user details using /userID
// GET Call --> verify the User updated using /userID
test("partial update a user test", async ({ goRestApiHelper }) => {
  //1. Create a user
  let userResponse = await createUser(goRestApiHelper);

  //2. get a user
  let getResponse = await goRestApiHelper.get(
    `/public/v2/users/${userResponse.id}`,
    AUTH_HEADER,
  );
  expect(getResponse.status).toBe(200);
  expect.soft(getResponse.body.name).toBe("PW User");

  //3. Partial update a user details - email
  let userEmailUpdatedData = {
    email: `updatedEmail${Date.now()}@mann.test`,
  };

  let partialUpdateResponse = await goRestApiHelper.patch(
    `/public/v2/users/${userResponse.id}`,
    userEmailUpdatedData,
    AUTH_HEADER,
  );

  expect(partialUpdateResponse.status).toBe(200);
  let partialUpdatedUserId = partialUpdateResponse.body.id;
  expect.soft(partialUpdatedUserId).toBe(userResponse.id);
  expect.soft(getResponse.body.name).toBe("PW User");
  expect
    .soft(partialUpdateResponse.body.email)
    .toBe(userEmailUpdatedData.email);

  //4. get a user detail after update
  getResponse = await goRestApiHelper.get(
    `/public/v2/users/${partialUpdatedUserId}`,
    AUTH_HEADER,
  );

  expect(getResponse.status).toBe(200);
  expect.soft(partialUpdatedUserId).toBe(userResponse.id);
  expect.soft(getResponse.body.name).toBe("PW User");
});

//Test case 4: Delete a user test + verify : AAA
// POST call --> Retrieve the USER ID ---
// GET Call --> verify the User created using /userID
// DELETE Call- update user details using /userID - 204
// GET Call --> verify the User updated using /userID - 404
test("Delete a user test", async ({ goRestApiHelper }) => {
  //1. Create a user
  let userResponse = await createUser(goRestApiHelper);

  //2. get a user
  let getResponse = await goRestApiHelper.get(
    `/public/v2/users/${userResponse.id}`,
    AUTH_HEADER,
  );
  expect(getResponse.status).toBe(200);
  expect(getResponse.body.name).toBe("PW User");

  //3. Delete a user details
  let deleteResponse = await goRestApiHelper.delete(
    `/public/v2/users/${userResponse.id}`,
    AUTH_HEADER,
  );
  expect(deleteResponse.status).toBe(204);

  //4. get a user detail after update
  getResponse = await goRestApiHelper.get(
    `/public/v2/users/${userResponse.id}`,
    AUTH_HEADER,
  );
  expect(getResponse.status).toBe(404);
  expect(getResponse.body.message).toBe("Resource not found");
});

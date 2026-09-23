import { ApiHelper } from "../../src/api/ApiHelper";
import { test, expect } from "../../src/fixtures/apifixtures";

let token: string;

test.beforeEach(
  "Generate Token For Contact API Test",
  async ({ apiHelper }) => {
    let Credential = {
      email: "adeyeye079@gmail.com",
      password: "testing123",
    };

    let response = await apiHelper.post("/users/login", Credential, {
      "Content-Type": "application/json",
    });
    expect(response.status).toBe(200);
    token = response.body.token;
    console.log("Token Generated: ", token);
  },
);

async function AddContact(apiHelper: any) {
  let userData = {
    firstName: "John",
    lastName: "Doe",
    birthdate: "1970-01-01",
    email: "jdoe@fake.com",
    phone: "8005555555",
    street1: "1 Main St.",
    street2: "Apartment A",
    city: "New York",
    stateProvince: "KS",
    postalCode: "12345",
    country: "USA",
  };

  let response = await apiHelper.post("/contacts", userData, {
    Authorization: `Bearer ${token}`,
  });

  expect(response.status).toBe(201);
  return response.body;
}

// GET
test("GET All Contact List Test", async ({ apiHelper }) => {
  let response = await apiHelper.get("/contacts", {
    Authorization: `Bearer ${token}`,
  });

  expect(response.status).toBe(200);
  expect(response.body.length).toBeGreaterThan(0);
});

// POST - Add Contact
test("POST/GET API - Add Contact Test", async ({ apiHelper }) => {
  // 1.  Add Contact
  let addContactResponse = await AddContact(apiHelper);

  // 2. Get the Add Contact details using the _id
  let getResponse = await apiHelper.get(
    `/contacts/${addContactResponse._id}`,
    {
      Authorization: `Bearer ${token}`,
    }, // lowercase 'i'
  );

  expect(getResponse.status).toBe(200);
  expect.soft(getResponse.body.firstName).toBeTruthy();
  expect.soft(getResponse.body.lastName).toBeTruthy();
  expect.soft(getResponse.body.birthdate).toBeTruthy();
  expect.soft(getResponse.body.email).toBeTruthy();
  expect.soft(getResponse.body.phone).toBeTruthy();
});

// PUT - Update Contact
test("PUT - Update Contact Test", async ({ apiHelper }) => {
  // 1.  Add Contact
  let addContactResponse = await AddContact(apiHelper);

  // 2. Get the Add Contact details using the _id
  let getResponse = await apiHelper.get(
    `/contacts/${addContactResponse._id}`,
    {
      Authorization: `Bearer ${token}`,
    }, // lowercase 'i'
  );

  expect(getResponse.status).toBe(200);
  expect.soft(getResponse.body.firstName).toBeTruthy();
  expect.soft(getResponse.body.lastName).toBeTruthy();
  expect.soft(getResponse.body.birthdate).toBeTruthy();
  expect.soft(getResponse.body.email).toBeTruthy();
  expect.soft(getResponse.body.phone).toBeTruthy();

  //3. Update contact details using the _id created
  let updateData = {
    firstName: "Mark",
    lastName: "Doe",
    birthdate: "1973-01-01",
    email: `updatedEmail${Date.now()}@mann.test`,
    phone: "8005555511",
    street1: "1 Main St.",
    street2: "Apartment A",
    city: "New York",
    stateProvince: "KS",
    postalCode: "12345",
    country: "USA",
  };
  let contactUpdateResponse = await apiHelper.put(
    `/contacts/${addContactResponse._id}`,
    updateData,
    {
      Authorization: `Bearer ${token}`,
    },
  );

  expect(contactUpdateResponse.status).toBe(200);
  expect.soft(contactUpdateResponse.body.firstName).toBe(updateData.firstName);
  expect.soft(contactUpdateResponse.body.lastName).toBe(updateData.lastName);
  expect.soft(contactUpdateResponse.body.email).toBeTruthy();
  expect.soft(contactUpdateResponse.body.street1).toBe(updateData.street1);
  expect
    .soft(contactUpdateResponse.body.postalCode)
    .toBe(updateData.postalCode);
  expect.soft(contactUpdateResponse.body.country).toBe(updateData.country);
});

// DELETE - Delete Contact
test("DELETE - Delete Contact Test", async ({ apiHelper }) => {
  // 1.  Add Contact
  let addContactResponse = await AddContact(apiHelper);

  // 2. Get the Add Contact details using the _id
  let getResponse = await apiHelper.get(
    `/contacts/${addContactResponse._id}`,
    {
      Authorization: `Bearer ${token}`,
    }, // lowercase 'i'
  );

  expect(getResponse.status).toBe(200);
  expect.soft(getResponse.body.firstName).toBeTruthy();
  expect.soft(getResponse.body.lastName).toBeTruthy();
  expect.soft(getResponse.body.birthdate).toBeTruthy();
  expect.soft(getResponse.body.email).toBeTruthy();
  expect.soft(getResponse.body.phone).toBeTruthy();

  //3. Delete contact details using the _id created
  console.log("Deleted ID: ", `${addContactResponse._id}`);
  let deleteResponse = await apiHelper.delete(
    `/contacts/${addContactResponse._id}`,
    {
      Authorization: `Bearer ${token}`,
    },
  );

  expect(deleteResponse.status).toBe(200);

  // // 4. Get Delete details using the _id
  // getResponse = await apiHelper.get(
  //   `/contacts/${addContactResponse._id}`,
  //   {
  //     Authorization: `Bearer ${token}`,
  //   }, // lowercase 'i'
  // );
});

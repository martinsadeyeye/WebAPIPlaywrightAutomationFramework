import { ApiHelper } from "../../src/api/ApiHelper";
import { test, expect } from "../../src/fixtures/apifixtures";

let token: string;

test.beforeEach("POST API - Create Booking Token", async ({ bookerApiHelper }) => {
  let Credential = {
    username: "admin",
    password: "password123",
  };

  let response = await bookerApiHelper.post("/auth", Credential, {
    "Content-Type": "application/json",
  });
  expect(response.status).toBe(200);
  token = response.body.token;
  console.log("New Token: ", token);
});

async function createBooking(bookerApiHelper: any) {
  let userData = {
    firstname: "Seun",
    lastname: "Brown",
    totalprice: 111,
    depositpaid: true,
    bookingdates: {
      checkin: "2027-01-01",
      checkout: "2027-01-01",
    },
    additionalneeds: "Breakfast",
  };

  let response = await bookerApiHelper.post("/booking", userData);

  expect(response.status).toBe(200);
  return response.body;
}

//GET
test("GET All Booking Ids Test", async ({ bookerApiHelper }) => {
  let response = await bookerApiHelper.get("/booking");

  expect(response.status).toBe(200);
  expect(response.body.length).toBeGreaterThan(0);
});

//POST
test("POST/GET API - Create a Booking", async ({ bookerApiHelper }) => {
  // 1. Create Booking
  let createBookingResponse = await createBooking(bookerApiHelper);

  // 2, Get the Created booking details using the bookingID
  let getResponse = await bookerApiHelper.get(
    `/booking/${createBookingResponse.bookingid}`, // lowercase 'i'
  );

  expect(getResponse.status).toBe(200);
  expect.soft(getResponse.body.firstname).toBeTruthy();
  expect.soft(getResponse.body.lastname).toBeTruthy();
  expect.soft(getResponse.body.totalprice).toBeGreaterThan(0);
});

//PUT
test("PUT API - Full update a Booking", async ({ bookerApiHelper }) => {
  //1. Create Booking
  let createResponse = await createBooking(bookerApiHelper);

  //2. Get the booking created
  let getBookingResponse = await bookerApiHelper.get(
    `/booking/${createResponse.bookingid}`,
  );
  expect(getBookingResponse.status).toBe(200);
  expect(getBookingResponse.body.firstname).toBeTruthy();

  //3. Update booking details using the booking id created
  let userData = {
    firstname: "James",
    lastname: "Brown",
    totalprice: 111,
    depositpaid: true,
    bookingdates: {
      checkin: "2018-01-01",
      checkout: "2019-01-01",
    },
    additionalneeds: "Breakfast",
  };

  let bookingUpdateResponse = await bookerApiHelper.put(
    `/booking/${createResponse.bookingid}`,
    userData,
    {
      Cookie: `token=${token}`,
    },
  );

  expect(bookingUpdateResponse.status).toBe(200);
  expect.soft(bookingUpdateResponse.body.firstname).toBe(userData.firstname);
  expect.soft(bookingUpdateResponse.body.lastname).toBe(userData.lastname);
  expect
    .soft(bookingUpdateResponse.body.depositpaid)
    .toBe(userData.depositpaid);
  expect
    .soft(bookingUpdateResponse.body.bookingdates.checkin)
    .toBe(userData.bookingdates.checkin);
  expect
    .soft(bookingUpdateResponse.body.bookingdates.checkout)
    .toBe(userData.bookingdates.checkout);
});

//DELETE
test("Delete API - Delete a Booking using BookingID", async ({
  bookerApiHelper,
}) => {
  //1. Create Booking
  let createResponse = await createBooking(bookerApiHelper);

  //2. Get the booking created
  let getBookingResponse = await bookerApiHelper.get(
    `/booking/${createResponse.bookingid}`,
  );
  expect(getBookingResponse.status).toBe(200);
  expect(getBookingResponse.body.firstname).toBeTruthy();

  //3. Update booking details using the booking id created
  let userData = {
    firstname: "James",
    lastname: "Brown",
    totalprice: 111,
    depositpaid: true,
    bookingdates: {
      checkin: "2018-01-01",
      checkout: "2019-01-01",
    },
    additionalneeds: "Breakfast",
  };

  let bookingUpdateResponse = await bookerApiHelper.put(
    `/booking/${createResponse.bookingid}`,
    userData,
    {
      Cookie: `token=${token}`,
    },
  );

  expect(bookingUpdateResponse.status).toBe(200);
  expect.soft(bookingUpdateResponse.body.firstname).toBe(userData.firstname);
  expect.soft(bookingUpdateResponse.body.lastname).toBe(userData.lastname);
  expect
    .soft(bookingUpdateResponse.body.depositpaid)
    .toBe(userData.depositpaid);
  expect
    .soft(bookingUpdateResponse.body.bookingdates.checkin)
    .toBe(userData.bookingdates.checkin);
  expect
    .soft(bookingUpdateResponse.body.bookingdates.checkout)
    .toBe(userData.bookingdates.checkout);

  // Delete the created and Updated booking using the bookingID
  console.log("Deleted Booking ID: ", `${createResponse.bookingid}`);
  let deleteResponse = await bookerApiHelper.delete(
    `/booking/${createResponse.bookingid}`,
    {
      Cookie: `token=${token}`,
    },
  );

  expect(deleteResponse.status).toBe(201);
});

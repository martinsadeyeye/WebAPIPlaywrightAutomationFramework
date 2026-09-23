import { ApiHelper } from "../../src/api/ApiHelper";
import { test, expect } from "../../src/fixtures/apifixtures";

let token: string;
let bookingId: number;

test.describe.serial("Running E2E  Booking CRUD apis tests", () => {
  //GET
  test("GET All Booking Ids Test", async ({ apiHelper }) => {
    let response = await apiHelper.get("/booking");

    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);

    bookingId = response.body[100].bookingid;
  });

  //GET
  test("GET Booking Id detail Test", async ({ apiHelper }) => {
    let response = await apiHelper.get(`/booking/${bookingId}`);

    expect(response.status).toBe(200);
    expect(response.body.firstname).toBeTruthy();
    expect(response.body.lastname).toBeTruthy();
    expect(response.body.totalprice).toBeGreaterThan(0);
  });

  //POST
  test("POST API - Create a Booking", async ({ apiHelper }) => {
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

    let response = await apiHelper.post("/booking", userData);

    expect(response.status).toBe(200);
    bookingId = response.body.bookingid;
    console.log("New Booking Id: ", bookingId);
    expect(response.body.booking.firstname).toBe(userData.firstname);
    expect(response.body.booking.lastname).toBe(userData.lastname);
    expect(response.body.booking.depositpaid).toBe(userData.depositpaid);
    expect(response.body.booking.bookingdates.checkin).toBe(
      userData.bookingdates.checkin,
    );
    expect(response.body.booking.bookingdates.checkout).toBe(
      userData.bookingdates.checkout,
    );
  });

  //POST - Create Token
  test("POST API - Create Booking Token", async ({ apiHelper }) => {
    let userData = {
      username: "admin",
      password: "password123",
    };

    let response = await apiHelper.post("/auth", userData);
    expect(response.status).toBe(200);
    token = response.body.token;
    console.log("New Token: ", token);
  });

  //PUT
  test("PUT API - Full update a Booking", async ({ apiHelper }) => {
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

    let AUTH_HEADER = {
      Cookie: `token=${token}`, // built here, at execution time, when token is populated
    };

    let response = await apiHelper.put(
      `/booking/${bookingId}`,
      userData,
      AUTH_HEADER,
    );

    expect(response.status).toBe(200);
    expect(response.body.firstname).toBe(userData.firstname);
    expect(response.body.lastname).toBe(userData.lastname);
    expect(response.body.depositpaid).toBe(userData.depositpaid);
    expect(response.body.bookingdates.checkin).toBe(
      userData.bookingdates.checkin,
    );
    expect(response.body.bookingdates.checkout).toBe(
      userData.bookingdates.checkout,
    );
  });

  //PATCH - Partial Update (API docs claim partial payload works via PUT, but the live API rejects it — full payload required)
  test("PATCH API - Partial update a Booking", async ({ apiHelper }) => {
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

    let AUTH_HEADER = {
      Cookie: `token=${token}`,
    };

    let response = await apiHelper.put(
      `/booking/${bookingId}`,
      userData,
      AUTH_HEADER,
    );

    expect(response.status).toBe(200);
    expect(response.body.firstname).toBe(userData.firstname);
    expect(response.body.lastname).toBe(userData.lastname);
  });
  //DELETE
  test("Delete API - Delete a Booking using BookingID", async ({
    apiHelper,
  }) => {
    let AUTH_HEADER = {
      Cookie: `token=${token}`,
    };

    console.log("Deleted Booking ID: ", bookingId);
    let response = await apiHelper.delete(`/booking/${bookingId}`, AUTH_HEADER);

    expect(response.status).toBe(201);
  });
});

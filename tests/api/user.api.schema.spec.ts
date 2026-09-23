// npm install ajv
// schema: type of response data
// ajv -- node lib for the schema validation

import Ajv from "ajv";
import { test, expect } from "../../src/fixtures/apifixtures";
import { JsonHelper } from "../../src/utils/JsonHelper";
import { getSchemaDataFilePath } from "../../src/utils/DataResolver";
import { UserSchemaData } from "../../src/utils/SchemaTestData";

const TOKEN = process.env.API_TOKEN!;

let AUTH_HEADER = {
  Authorization: `Bearer ${TOKEN}`,
};

//setup the AJV
let ajv = new Ajv();

//define JSON Schema - now define in its own folder
// let userSchema = {
//   type: "object",
//   properties: {
//     id: {
//       type: "number",
//     },
//     name: {
//       type: "string",
//     },
//     email: {
//       type: "string",
//     },
//     gender: {
//       type: "string",
//     },
//     status: {
//       type: "string",
//     },
//   },
//   required: ["id", "name", "email", "gender", "status"],
// };

let userArraySchema = {
  type: "array",
  items: JsonHelper.readJson<UserSchemaData[]>(getSchemaDataFilePath()),
};

test("GET a User - Schema test", async ({ apiHelper }) => {
  //User JS Object
  let userData = {
    name: "PW User",
    email: `pwAutomation_${Date.now()}@mann.dev`,
    gender: "male",
    status: "active",
  };

  let response = await apiHelper.post(
    "/public/v2/users",
    userData,
    AUTH_HEADER,
  );

  expect(response.status).toBe(201);
  let UserId = response.body.id;
  console.log("created user id ", UserId);

  // get a user
  let getUserResponse = await apiHelper.get(
    `/public/v2/users/${UserId}`,
    AUTH_HEADER,
  );
  expect(getUserResponse.status).toBe(200);

  // verify response schema
  let validate = ajv.compile(
    JsonHelper.readJson<UserSchemaData[]>(getSchemaDataFilePath()),
  );
  let isSchemaValid = validate(getUserResponse.body);
  if (!isSchemaValid) {
    console.log("SCHEMA ERRORS: ", validate.errors);
  }

  expect(isSchemaValid).toBeTruthy();
});

test("Get all users - Schema Test", async ({ apiHelper }) => {
  // get a user
  let getAllUsersResponse = await apiHelper.get(
    "/public/v2/users",
    AUTH_HEADER,
  );
  expect(getAllUsersResponse.status).toBe(200);

  // verify response schema
  let validate = ajv.compile(userArraySchema);
  let isSchemaValid = validate(getAllUsersResponse.body);
  if (!isSchemaValid) {
    console.log("SCHEMA ERRORS: ", validate.errors);
  }

  expect(isSchemaValid).toBeTruthy();
});

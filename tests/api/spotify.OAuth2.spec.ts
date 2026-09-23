import { ApiHelper } from "../../src/api/ApiHelper";
import { test, expect } from "../../src/fixtures/apifixtures";

let OAUTH_CONFIG = {
  tokenURL: "https://accounts.spotify.com/api/token",
  clientId: process.env.OAUTH_CLIENT_ID!,
  clientSecret: process.env.OAUTH_CLIENT_SECRET!,
  grantType: process.env.GRANT_TYPE!,
};

let accessToken: string;

test.beforeEach("POST -- generate the access token", async ({ request }) => {
  let response = await request.post(OAUTH_CONFIG.tokenURL, {
    form: {
      grant_type: OAUTH_CONFIG.grantType,
      client_id: OAUTH_CONFIG.clientId,
      client_secret: OAUTH_CONFIG.clientSecret,
    },
  });
  expect(response.status()).toBe(200);
  let jsonResponse = await response.json();
  console.log("token api response: ", jsonResponse);
  accessToken = jsonResponse.access_token;
  console.log("access token: ", accessToken);
});

test("get albums data test", async ({ apiHelper }) => {
  // apiHelper is fine here since this DOES target api.spotify.com (its configured baseURL)
  let albumResponse = await apiHelper.get("/v1/albums/4aawyAB9vmqN3uQ7FjRGTy", {
    Authorization: `Bearer ${accessToken}`,
  });

  expect(albumResponse.status).toBe(200);
  console.log(albumResponse.body);

  let albumJSONBody = albumResponse.body;
  console.log("Total Tracks: ", albumJSONBody.total_tracks);
  console.log("External Url: ", albumJSONBody.external_urls.spotify);
  console.log("Images Array Length: ", albumJSONBody.images.length);
  expect.soft(albumResponse.body.total_tracks).toBe(18);
  expect.soft(albumResponse.body.images.length).toBe(3);
  expect
    .soft(albumJSONBody.external_urls.spotify)
    .toBe("https://open.spotify.com/album/4aawyAB9vmqN3uQ7FjRGTy");
});

import { test, expect } from "@playwright/test";

//Web App --> intercept the network calls and logs them...
// **/* --> wildcard pattern for URLs
test("intercept and log requests", async ({ page }) => {
  await page.route("**/*", async (route) => {
    console.log(route.request().method(), route.request().url());
    await route.continue(); // url1 ---capture, url2 --capture
  });

  //navigate to web app:
  await page.goto(
    "https://naveenautomationlabs.com/opencart/index.php?route=account/login",
  );
});

//intercept with mocking:
// mocking: fake data/response
// route.fulfill() actually does:It lets you intercept a network request the browser makes and respond to it yourself,
// with data you control — instead of letting the real request hit the real server.
//Mocking API responses — simulating a specific backend response (success, error, edge case)
// without needing the real backend to actually return that data
// Testing UI behavior in isolation — e.g., verifying your app shows an error message correctly
// when the API returns a 500, without needing to actually trigger a real server error
//Speeding up tests — bypassing slow or flaky real network calls
// Testing edge cases hard to reproduce naturally — like an empty list, a malformed response, or a specific error code
test("mock search data api", async ({ page }) => {
  let fakeProducts = [
    {
      name: "Fake Macbook Pro",
      price: "$899",
    },
    { name: "Fake Iphone 18", price: "$799" },
  ];

  //https://naveenautomationlabs.com/opencart/index.php?route=product/search&search=macbook

  await page.route(
    "**/index.php?route=product/search&search=macbook",
    async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(fakeProducts),
      });
    },
  );

  //navigate to web app:
  await page.goto(
    "https://naveenautomationlabs.com/opencart/index.php?route=product/search&search=macbook",
  );
  await page.pause();
});

test("mock search page with fake HTML", async ({ page }) => {
  await page.route(
    "**/index.php?route=product/search&search=macbook",
    async (route) => {
      route.fulfill({
        status: 200,
        contentType: "text/html",
        body: `
                <html>
                <body>
                    <h1>Search Results</h1>
                    <div class="product-layout">
                        <h4><a href="#">Fake MacBook Pro</a></h4>
                        <p class="price">$599</p>
                    </div>
                    <div class="product-layout">
                        <h4><a href="#">Fake iPhone 20</a></h4>
                        <p class="price">$999</p>
                    </div>
                </body>
                </html>
            `,
      });
    },
  );

  await page.goto(
    "https://naveenautomationlabs.com/opencart/index.php?route=product/search&search=macbook",
  );

  // now assert on the fake HTML
  const heading = await page.textContent("h1");
  expect(heading).toBe("Search Results");

  const products = await page.locator(".product-layout h4").allTextContents();
  expect(products).toEqual(["Fake MacBook Pro", "Fake iPhone 20"]);

  const prices = await page.locator(".price").allTextContents();
  expect(prices).toEqual(["$599", "$999"]);

  await page.pause();
});

test("UI correctly displays a mocked 401 login error", async ({ page }) => {
  await page.route("**/index.php?route=account/login", async (route) => {
    await route.fulfill({
      status: 401,
      contentType: "text/html",
      body: `
        <html>
        <body>
            <div class="alert alert-danger alert-dismissible">
                <i class="fa fa-exclamation-circle"></i>
                " Warning: No match for E-Mail Address and/or Password."
            </div>
        </body>
        </html>
      `,
    });
  });

  await page.goto(
    "https://naveenautomationlabs.com/opencart/index.php?route=account/login",
  );

  let errorMessage = await page.locator(".alert.alert-danger").innerText();
  expect(errorMessage).toBe(
    '" Warning: No match for E-Mail Address and/or Password."',
  );
});

test("UI correctly displays a mocked 500 internal server error", async ({
  page,
}) => {
  await page.route("**/index.php?route=account/forgotten", async (route) => {
    await route.fulfill({
      status: 500,
      contentType: "text/html",
      body: `
        <html>
        <body>
            <div class="alert alert-danger alert-dismissible">
                <i class="fa fa-exclamation-circle"></i>
                "Internal Sever Error"
            </div>
        </body>
        </html>
      `,
    });
  });

  await page.goto(
    "https://naveenautomationlabs.com/opencart/index.php?route=account/forgotten",
  );

  let errorMessage = await page.locator(".alert.alert-danger").innerText();
  expect(errorMessage).toBe('"Internal Sever Error"');
});

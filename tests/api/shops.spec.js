import { test, expect } from "@playwright/test";
import { ObjectId } from "mongodb";

// Forces tests in this file to run sequentially in the order they
// are defined
test.describe.configure({ mode: "serial" });

// _id is manually chosen for the purpose of testing:
const test_id = new ObjectId();

const TEST_ORIGIN = "http://localhost:3000"; // TODO: work this into environment variables

// test adding a dummy shop to the database:
test("api/shops/add", async ({ request }) => {
  // create a test shop to add to the backend
  const shopJSON = {
    _id: test_id,
    name: "Tester Coffee Shop",
    email: "testytesttest@wideawakedb.com",
    phone: "1234567890",
    googleMapsLink: "https://goo.gl/maps/GUeEretGhzahohx56",
  };

  const apiResponse = await request.post(`${TEST_ORIGIN}/api/shops/add`, {
    data: JSON.stringify(shopJSON),
  });

  const responseJSON = await apiRequestResponse.json();

  expect(apiRequestResponse.ok);
});

// test retrieving the dummy shop
test("api/shops/get-by-id", async ({ request }) => {
  const apiResponse = await request.get(`${TEST_ORIGIN}/api/shops/`);
  const json = await apiResponse.json();

  expect(apiResponse.ok);
  expect(json.name === "Tester Coffee Shop");
  expect(json.email === "testytesttest@wideawakedb.com");
  expect(json.phone === "1234567890");
  expect(json.googleMapsLink === `https://goo.gl/maps/GUeEretGhzahohx56`);
  expect(new ObjectId(json._id) === test_id);
});

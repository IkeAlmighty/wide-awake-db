import { test, expect } from "@playwright/test";
import { ObjectId } from "mongodb";

const TEST_ORIGIN = "http://localhost:3000"; // TODO: work this into environment variables

// test adding a dummy shop to the database:
test("api/shops/add", async ({ request }) => {
  const test_id = new ObjectId();
  // create a test shop to add to the backend
  const shopJSON = {
    _id: test_id,
    testId: "add test",
    name: "Tester Coffee Shop",
    email: "testytesttest@wideawakedb.com",
    phone: "1234567890",
    googleMapsLink: "https://goo.gl/maps/GUeEretGhzahohx56",
  };

  const apiResponse = await request.post(`${TEST_ORIGIN}/api/shops/add`, {
    data: JSON.stringify({ shopJSON }),
  });

  const responseJSON = await apiResponse.json();

  expect(apiResponse.ok());
  expect(ObjectId(responseJSON._id) === test_id);
});

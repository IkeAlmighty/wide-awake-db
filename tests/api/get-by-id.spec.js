import { test, expect } from "@playwright/test";
import { ObjectId } from "mongodb";

const TEST_ORIGIN = "http://localhost:3000"; // TODO: work this into environment variables

test("api/shops/get-by-id", async ({ request }) => {
  const test_id = new ObjectId();
  // first, create the test object:
  const shopInputJSON = {
    _id: test_id,
    testId: "get-by-id-test",
    name: "Tester Coffee Shop",
    email: "testytesttest@wideawakedb.com",
    phone: "1234567890",
    googleMapsLink: "https://goo.gl/maps/GUeEretGhzahohx56",
  };

  const apiPostResponse = await request.post(`${TEST_ORIGIN}/api/shops/add`, {
    data: JSON.stringify({ shopJSON: shopInputJSON }),
  });

  expect(apiPostResponse.ok);

  const postResponseJSON = await apiPostResponse.json();

  const apiGetResponse = await request.get(
    `${TEST_ORIGIN}/api/shops/get-by-id?_id=${postResponseJSON._id.toString()}`
  );

  expect(apiGetResponse.ok);

  const { shopJSON } = await apiGetResponse.json();

  expect(shopJSON.name === "Tester Coffee Shop");
  expect(shopJSON.email === "testytesttest@wideawakedb.com");
  expect(shopJSON.phone === "1234567890");
  expect(shopJSON.googleMapsLink === `https://goo.gl/maps/GUeEretGhzahohx56`);
  expect(new ObjectId(shopJSON._id) === test_id);
});

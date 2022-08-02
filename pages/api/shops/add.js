import { ObjectId } from "mongodb";
import clientPromise from "../../../lib/mongodb";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(400).send("only POST requests accepted");
    return;
  }

  const { shopJSON } = JSON.parse(req.body);

  if (!shopJSON) {
    res.status(400).send("client did not defined a payload.");
    return;
  }

  const client = await clientPromise;

  const createShopMongoResponse = await client
    .db()
    .collection("shops")
    .insertOne({ ...shopJSON, _id: new ObjectId(shopJSON._id || undefined) });

  // if not acknowledged, send a 500 error:
  if (
    !createShopMongoResponse.acknowledged ||
    !createShopMongoResponse.insertedId
  ) {
    res.status(500).end();
    return;
  }

  // send back the _id of shop:
  res.status(201).json({ _id: createShopMongoResponse.insertedId.toString() });
}

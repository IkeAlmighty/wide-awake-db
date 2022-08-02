import { ObjectId } from "mongodb";
import clientPromise from "../../../lib/mongodb";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.status(400).send("only GET requests accepted");
    return;
  }

  const { _id } = req.query;

  const client = await clientPromise;

  const shopJSON = await client
    .db()
    .collection("shops")
    .findOne({ _id: new ObjectId(_id) });

  if (!shopJSON) {
    res.status(404).end();
    return;
  }

  res.status(200).json({ shopJSON });
}

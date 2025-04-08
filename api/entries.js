import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);
const dbName = 'simpleApp';
const collectionName = 'entries';

export default async function handler(req, res) {
  await client.connect();
  const db = client.db(dbName);
  const collection = db.collection(collectionName);

  if (req.method === 'POST') {
    const { text } = req.body;
    await collection.insertOne({ text, createdAt: new Date() });
    res.status(200).json({ success: true });
  } else {
    const entries = await collection.find().sort({ createdAt: -1 }).toArray();
    res.status(200).json(entries);
  }
}

import { connectDB } from './_db';

export default async function handler(req, res) {
  const db = await connectDB();
  const topicsCol = db.collection('topics');

  if (req.method === 'GET') {
    const topics = await topicsCol.find().toArray();
    res.status(200).json(topics);
  }

  if (req.method === 'POST') {
    const { name } = req.body;
    const result = await topicsCol.insertOne({ name, ideas: [] });
    res.status(200).json(result);
  }
}

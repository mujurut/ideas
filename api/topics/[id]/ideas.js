import { connectDB, ObjectId } from '../../_db';

export default async function handler(req, res) {
  const db = await connectDB();
  const topicsCol = db.collection('topics');
  const id = req.query.id;

  if (req.method === 'POST') {
    const { idea } = req.body;
    const result = await topicsCol.updateOne(
      { _id: new ObjectId(id) },
      { $push: { ideas: idea } }
    );
    res.status(200).json(result);
  }
}

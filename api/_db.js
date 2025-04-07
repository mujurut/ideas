import { MongoClient, ObjectId } from 'mongodb';

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

let db = null;
export async function connectDB() {
  if (!db) {
    await client.connect();
    db = client.db('ideaTracker');
  }
  return db;
}

export { ObjectId };

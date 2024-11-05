import { MongoClient } from "mongodb";
import '../loadenv.js'

const connectionString = process.env.MONGO_URI || "";
const client = new MongoClient(connectionString);
let conn;
try {
  conn = await client.connect();
} catch(e) {
  console.error(e);
}
let db = conn.db("sample_training");
export default db;
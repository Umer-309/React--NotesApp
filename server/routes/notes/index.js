import express from "express";
import db from "../../db/conn.js";
import { ObjectId } from "mongodb";

const router = express.Router();

router.get("/", async (req, res) => {
  let collection = await db.collection("notes");
  let results = await collection.find({})
    .toArray();
  res.send(results).status(200);
});

router.post("/", async (req, res) => {
  try {
    if (!db) {
      console.error("Database connection not established.");
      return res.status(500).send({ error: "Database connection not available" });
    }

    const collection = db.collection("notes");
    const newDocument = req.body;

    if (!newDocument || typeof newDocument !== "object") {
      return res.status(400).send({ error: "Invalid document data" });
    }

    const result = await collection.insertOne(newDocument);

    if (result.insertedId) {
      res.status(201).send({ ...newDocument });
    } else {
      res.status(500).send({ error: "Document insertion failed" });
    }
  } catch (error) {
    console.error("Error inserting document:", error.message);
    res.status(500).send({ error: "An error occurred", details: error.message });
  }
});

router.patch('/', async (req, res) => {
  try {
    const collection = db.collection('notes');
    const { id, body, updatedAt } = req.body;
    const updates = {
      $set: { body, updatedAt }
    };
    const result = await collection.updateOne({ _id: new ObjectId(id) }, updates)

    res.status(200).send({result})
  } catch (error) {
    console.error("Error updating document:", error.message);
    res.status(500).send({ error: "An error occurred", details: error.message });
  }
})


router.delete("/", async (req, res) => {
  try {
    if (!db) {
      console.error("Database connection not established.");
      return res.status(500).send({ error: "Database connection not available" });
    }

    const collection = db.collection("notes");
    const { _id } = req.body;
    const query = collection.find({ _id });

    if (!_id || typeof _id !== "string") {
      return res.status(400).send({ error: "Invalid document ID" });
    }

    const objectId = new ObjectId(_id);
    const result = await collection.deleteOne({ _id: objectId });

    if (result.deletedCount > 0) {
      res.status(200).send({ message: "Document deleted successfully" });
    } else {
      res.status(404).send({ error: "Document not found" });
    }
  } catch (error) {
    console.error("Error deleting document:", error.message);
    res.status(500).send({ error: "An error occurred", details: error.message });
  }
});


export default router;
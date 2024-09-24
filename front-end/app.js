const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');

// MongoDB connection URI
const uri = "mongodb+srv://priyarajamani2004:Ph0n1x0ne@cluster1.cn1ax.mongodb.net/test?retryWrites=true&w=majority"; // Replace with your MongoDB URI
let dbClient;

async function connectToDB() {
  if (!dbClient) {
    try {
      const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
      dbClient = await client.connect();
      console.log("Connected to MongoDB!");
    } catch (error) {
      console.error("Error connecting to MongoDB:", error);
    }
  }
  return dbClient.db('assessment platform'); // Replace with your actual MongoDB database name
}

// Initialize Express app
const app = express();
app.use(bodyParser.json());

// API to submit the assessment result
app.post('/submit-assessment', async (req, res) => {
  const { studentName, score } = req.body;

  try {
    const db = await connectToDB();
    const result = await db.collection('student_scores').insertOne({ studentName, score });
    res.status(200).send({ message: "Score submitted successfully!", result });
  } catch (error) {
    res.status(500).send({ error: "Failed to submit score", details: error });
  }
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 5000');
});

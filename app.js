// app.js (Code 1)
const express = require("express");
const bodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;

const app = express();
app.use(bodyParser.json());

// Connect to MongoDB
const url = "mongodb://localhost:27017";
const dbName = "mydatabase";
let db;
MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {
  if (err) throw err;
  console.log("Connected to MongoDB");
  db = client.db(dbName);
});

// Sign up route
app.post("/signup", (req, res) => {
  const { username, email, password } = req.body;
  // Check if the user already exists
  db.collection("users").findOne({ username }, (err, user) => {
    if (err) throw err;
    if (user) {
      res.json({ error: "Username already exists" });
    } else {
      // Insert the user into the database
      db.collection("users").insertOne({ username, email, password }, (err, result) => {
        if (err) throw err;
        res.json({ message: "User created" });
      });
    }
  });
});

// Sign in route
app.post("/signin", (req, res) => {
  const { username, password } = req.body;
  // Check if the user exists and the password is correct
  db.collection("users").findOne({ username }, (err, user) => {
    if (err) throw err;
    if (!user) {
      res.json({ error: "User not found" });
    } else if (user.password !== password) {
      res.json({ error: "Incorrect password" });
    } else {
      res.json({ message: "User signed in" });
    }
  });
});

// Next page route
app.get("/nextpage", (req, res) => {
  res.send("Welcome to the next page!");
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});

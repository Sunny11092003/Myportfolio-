const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Tiger123.a.thanu",
  database: "portfolioprj"
});

db.connect((err) => {
  if (err) {
    console.log("Database connection failed:", err);
  } else {
    console.log("Connected to MySQL");
  }
});

app.post("/feedback", (req, res) => {
  const { name, email, message } = req.body;

  const sql = "INSERT INTO feedback (name,email,message) VALUES (?,?,?)";

  db.query(sql, [name, email, message], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error saving feedback");
    } else {
      res.send("Feedback stored successfully");
    }
  });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
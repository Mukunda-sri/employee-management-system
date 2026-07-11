const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Employee Management System API Running");
});

app.get("/employees", (req, res) => {
  db.query("SELECT * FROM employees", (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(results);
    }
  });
});
app.post("/employees", (req, res) => {
  const { name, email, department, salary } = req.body;

  const sql =
    "INSERT INTO employees (name, email, department, salary) VALUES (?, ?, ?, ?)";

  db.query(
    sql,
    [name, email, department, salary],
    (err, result) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.send("Employee added successfully");
      }
    }
  );
});
app.listen(5000, () => {
  console.log("Server running on port 5000");
});
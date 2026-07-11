console.log("MY NEW SERVER FILE LOADED");
const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();

app.use(cors());
app.use(express.json());
console.log("PUT ROUTE VERSION");
app.post("/test", (req, res) => {
  res.send("POST route working");
});
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
app.post("/employees", (req, res) => 
    {
     console.log(req.body);
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

app.delete("/employees/:id", (req, res) => {
  const { id } = req.params;

  db.query(
    "DELETE FROM employees WHERE id = ?",
    [id],
    (err, result) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.send("Employee deleted successfully");
      }
    }
  );
});
app.put("/employees/:id", (req, res) => {
  const { id } = req.params;
  const { name, email, department, salary } = req.body;

  const sql =
    "UPDATE employees SET name=?, email=?, department=?, salary=? WHERE id=?";

  db.query(
    sql,
    [name, email, department, salary, id],
    (err, result) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.send("Employee updated successfully");
      }
    }
  );
});
app.put("/test", (req, res) => {
  console.log("PUT TEST HIT");
  res.send("PUT route working");
});
console.log("PUT route registered");
app.listen(5000, () => {
  console.log("Server running on port 5000");
});
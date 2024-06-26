import express from "express";
import sqlite from "better-sqlite3";
import cors from "cors";
import fs from "fs";

const db = sqlite("data.db");

// Function to initialize the database
function initDb() {
  db.prepare(
    "CREATE TABLE IF NOT EXISTS units (id INTEGER PRIMARY KEY, code TEXT UNIQUE, desc TEXT, cp REAL, type TEXT)"
  ).run();
  const units = JSON.parse(fs.readFileSync("units.json", "utf-8"));
  const { count: unitCount } = db
    .prepare("SELECT COUNT(*) as count FROM units")
    .get();
  if (unitCount === 0) {
    const insertUnit = db.prepare(
      "INSERT INTO units (code, desc, cp, type) VALUES (?, ?, ?, ?)"
    );
    units.forEach((unit) => {
      insertUnit.run(unit.code, unit.desc, unit.cp, unit.type);
    });
  }
  db.prepare(
    "CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, username TEXT UNIQUE, password TEXT)"
  ).run();
  const { count: userCount } = db
    .prepare("SELECT COUNT(*) as count FROM users")
    .get();

  if (userCount === 0) {
    db.prepare("INSERT INTO users (username, password) VALUES (?, ?)").run(
      "admin",
      "admin"
    );
  }
}

const app = express();

app.use(cors());

app.post("/login", express.json(), (req, res) => {
  const { username, password } = req.body;
  const user = db
    .prepare("SELECT * FROM users WHERE username = ? AND password = ?")
    .get(username, password);
  if (user) {
    res.json({ success: true });
  } else {
    res.json({ success: false, message: "Invalid username or password" });
  }
});

app.get("/units", (req, res) => {
  // Get all units from the database
  const units = db.prepare("SELECT * FROM units").all();
  res.json(units);
});

app.post("/units", express.json(), (req, res) => {
  const { code, desc, cp, type } = req.body;
  const unit = db.prepare("SELECT * FROM units WHERE code = ?").get(code);
  if (!code || !desc || !cp || !type) {
    res.json({ success: false, message: "All fields are required" });
    return;
  }
  if (unit) {
    res.json({ success: false, message: "Unit code already exists" });
    return;
  }
  const insertUnit = db.prepare(
    "INSERT INTO units (code, desc, cp, type) VALUES (?, ?, ?, ?)"
  );
  try {
    insertUnit.run(code, desc, cp, type);
    res.json({
      success: true,
      message: "Unit " + code + " " + desc + " successfully",
    });
  } catch (e) {
    res.json({ success: false, message: e.message });
  }
});
app.put("/units", express.json(), (req, res) => {
  let { code, desc, cp, type } = req.body;
  if (!code) {
    res.json({ success: false, message: "Code field is required" });
    return;
  }
  const unit = db.prepare("SELECT * FROM units WHERE code = ?").get(code);
  console.log(unit);
  if (!unit) {
    res.json({ success: false, message: "Unit not found" });
    return;
  }
  if (!desc) {
    desc = unit.desc;
  }
  if (!cp) {
    cp = unit.cp;
  }
  if (!type) {
    type = unit.type;
  }

  const updateUnit = db.prepare(
    "UPDATE units SET desc = ?, cp = ?, type = ? WHERE code = ?"
  );
  try {
    updateUnit.run(desc, cp, type, code);
    res.json({
      success: true,
      message: "Unit " + code + " " + desc + " updated successfully",
    });
  } catch (e) {
    res.json({ success: false, message: e.message });
  }
});
app.delete("/units/:code", (req, res) => {
  const { code } = req.params;
  const unit = db.prepare("SELECT * FROM units WHERE code = ?").get(code);
  if (!unit) {
    res.json({ success: false, message: "Unit not found" });
    return;
  }
  const deleteUnit = db.prepare("DELETE FROM units WHERE code = ?");
  try {
    deleteUnit.run(code);
    res.json({
      success: true,
      message: "Unit " + unit.code + " " + unit.desc + " deleted successfully",
    });
  } catch (e) {
    res.json({ success: false, message: e.message });
  }
});

initDb(); // Initialize the database

app.listen(8080, () => {
  console.log("Server is running on http://localhost:8080");
});

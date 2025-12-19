const express = require("express");
const jwt = require("jsonwebtoken");
const pool = require("../config/db");

const router = express.Router();

/* ========= LOGIN ========= */
router.post("/login", async (req, res) => {
  try {
    const { userId, email, password } = req.body;

    if (!userId || !email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    const result = await pool.query(
      "SELECT * FROM users WHERE id = $1 AND email = $2",
      [userId, email]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    if (result.rows[0].password !== password) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      { id: userId, email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

/* ========= SIGNUP ========= */
router.post("/signup", async (req, res) => {
  try {
    const { userId, name, email, password } = req.body;

    if (!userId || !name || !email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    const passwordRegex = /^(?=.*[0-9])(?=.*[@#$!]).{8,}$/;

    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        message:
          "Password must be at least 8 characters with number & special char",
      });
    }

    const existing = await pool.query(
      "SELECT * FROM users WHERE id = $1 OR email = $2",
      [userId, email]
    );

    if (existing.rows.length > 0) {
      return res.status(400).json({ message: "User already exists" });
    }

    await pool.query(
      "INSERT INTO users (id, name, email, password) VALUES ($1,$2,$3,$4)",
      [userId, name, email, password]
    );

    res.json({ message: "Signup successful" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;

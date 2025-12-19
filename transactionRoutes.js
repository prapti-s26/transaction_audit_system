const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");
const {
  transferMoney,
  getHistory
} = require("../controllers/transactionController");

const pool = require("../config/db");

// GET BALANCE API
router.get("/balance", auth, async (req, res) => {
  try {
    const userId = req.user.id;

    const result = await pool.query(
      "SELECT balance FROM users WHERE id = $1",
      [userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ balance: result.rows[0].balance });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch balance" });
  }
});


router.post("/transfer", auth, transferMoney);
router.get("/history", auth, getHistory);

module.exports = router;

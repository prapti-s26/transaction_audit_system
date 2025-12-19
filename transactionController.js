const pool = require("../config/db");

// TRANSFER MONEY
exports.transferMoney = async (req, res) => {
  const { receiverId, amount } = req.body;
  const senderId = req.user.id;

  const amountNum = Number(amount);

  // VALIDATION 
  if (!receiverId || !amountNum || amountNum <= 0) {
    return res.status(400).json({ message: "Invalid input data" });
  }

  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    // sender check
    const senderRes = await client.query(
      "SELECT balance FROM users WHERE id = $1",
      [senderId]
    );

    if (senderRes.rows.length === 0) {
      throw new Error("Sender not found");
    }

    if (senderRes.rows[0].balance < amountNum) {
      throw new Error("Insufficient balance");
    }

    // debit sender
    await client.query(
      "UPDATE users SET balance = balance - $1 WHERE id = $2",
      [amountNum, senderId]
    );

    // credit receiver
    await client.query(
      "UPDATE users SET balance = balance + $1 WHERE id = $2",
      [amountNum, receiverId]
    );

    // audit log
    await client.query(
      `INSERT INTO transactions (sender_id, receiver_id, amount, status)
       VALUES ($1, $2, $3, 'SUCCESS')`,
      [senderId, receiverId, amountNum]
    );

    await client.query("COMMIT");

    res.json({ message: "Transfer successful" });

  } catch (err) {
    await client.query("ROLLBACK");
    res.status(400).json({ error: err.message });

  } finally {
    client.release();
  }
};

// 📜 TRANSACTION HISTORY
exports.getHistory = async (req, res) => {
  const userId = req.user.id;

  const result = await pool.query(
    `SELECT * FROM transactions
     WHERE sender_id = $1 OR receiver_id = $1
     ORDER BY timestamp DESC`,
    [userId]
  );

  res.json(result.rows);
};

const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/", require("./routes/authRoutes"));
app.use("/api", require("./routes/transactionRoutes"));

app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});

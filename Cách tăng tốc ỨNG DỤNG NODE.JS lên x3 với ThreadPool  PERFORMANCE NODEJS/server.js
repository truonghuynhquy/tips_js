const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
require("dotenv").config();
const os = require("os");

process.env.UV_THREADPOOL_SIZE = os.cpus().length;
// Không ai làm như này người ta thường bỏ vô environment

app.get("/", async (req, res) => {
  const hashPassword = await bcrypt.hash("This is a Password", 10);
  res.send(hashPassword);
});

app.listen(process.env.PORT, () => {
  console.log("The server is running 3000");
});

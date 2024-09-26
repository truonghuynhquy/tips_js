const mongoose = require("mongoose");

const conn = mongoose.createConnection("mongodb://localhost:27017/test");

conn.on("connected", function () {
  console.log(`Mongodb::: connected:::${this.name}`);
});

conn.on("disconnected", function () {
  console.log(`Mongodb::: disconnected:::${this.name}`);
});

conn.on("error", function (err) {
  console.log(`Mongodb::: error:::${JSON.stringify(err)}`);
});

process.on("SIGINT", async () => {
  await conn.close();
  console.log("Mongoose connection disconnected through app termination");
  process.exit(0);
});

module.exports = conn;

const express = require("express");
const app = express();
const UserRoute = require("./routes/user.route");
const createError = require("http-errors");
require("dotenv").config();
// require("./helpers/connections_mongodb");

app.get("/", (req, res) => {
  res.send("Hello WordPress!");
});

app.use(express.json());
app.use(express.urlencoded({ extends: true }));
app.use("/user", UserRoute);

app.use((req, res, next) => {
  // const error = new Error("Not Found");
  // error.status = 500;
  // next(error);
  next(createError.NotFound("This is does not exist"));
});

app.use((err, req, res, next) => {
  res.json({
    status: err.status || 500,
    message: err.message,
  });
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

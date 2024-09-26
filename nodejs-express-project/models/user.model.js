const mongoose = require("mongoose");
const schema = mongoose.Schema();

const {
  testConnection,
  // userConnection,
} = require("../helpers/connections_multi_mongodb");

const UserSchema = new schema({
  username: {
    type: String,
    lowercase: true,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// const UserSchema01 = new schema({
//   username: {
//     type: String,
//     lowercase: true,
//     unique: true,
//     required: true,
//   },
//   password: {
//     type: String,
//     required: true,
//   },
// });

module.exports = testConnection.model("user", UserSchema);

// module.exports = {
//   test: testConnection.model("user", UserSchema),
//   user: userConnection.model("user", UserSchema01),
// };

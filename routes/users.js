const mongoose = require("mongoose");
const plm = require("passport-local-mongoose");
require("dotenv").config();
mongoose.connect(process.env.MONGO_URL);

// Create a User Schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
  },

  fullname: {
    type: String,
    required: true,
  },
});

userSchema.plugin(plm);
// Create a User model using the schema
const User = mongoose.model("User", userSchema);

module.exports = User;

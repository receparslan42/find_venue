var mongoose = require("mongoose"); // Import mongoose

// Define User schema
const user = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
}, { versionKey: false, timestamps: true });

module.exports = mongoose.model("User", user, "users");

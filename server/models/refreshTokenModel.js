const mongoose = require("mongoose");
const { dateNow } = require("../utils/date");

// Define the refreshToken schema
const refreshTokenSchema = new mongoose.Schema({
  token: { type: String, require: true }, // Token string (required)
  user: {
    type: mongoose.Schema.Types.ObjectId, // Reference to the user model
    ref: "users",
  },
  created_at: {
    type: Date,
    default: dateNow(), // Set the default created_at date using the dateNow function
  },
  updated_at: {
    type: Date,
    default: dateNow(), // Set the default updated_at date using the dateNow function
  },
});

// Export the refreshToken model
exports.RefreshTokenModel = mongoose.model("refreshToken", refreshTokenSchema);

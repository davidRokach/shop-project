require("dotenv").config();

// Loads environment variables from a .env file

exports.config = {
  PASS_DB: process.env.PASS_DB,
  USER_DB: process.env.USER_DB,
  TOKEN_SECRET: process.env.TOKEN_SECRET,
  MONGO_DB: process.env.MONGO_DB,
  PORT: process.env.PORT,
};

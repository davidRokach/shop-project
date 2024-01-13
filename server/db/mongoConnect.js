const mongoose = require("mongoose");
const { config } = require("../config/secret");

// Connect to the MongoDB database
main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(config.MONGO_DB); // Connect to the MongoDB database using the connection string from the config file
  console.log("mongo connect to atlas"); // Print a success message upon successful connection
}

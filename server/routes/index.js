const express = require("express");
const router = express.Router();

// Define a GET route for the homepage
router.get("/", async (req, res) => {
  res.json({ msg: "Express homepage work" });
});

// Export the router to be used in other files
module.exports = router;

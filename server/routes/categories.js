// Importing required modules
const express = require("express");
const { ProductModel } = require("../models/productModel");
const router = express.Router();

// GET route for retrieving distinct categories
router.get("/", async (req, res) => {
  try {
    // Retrieve distinct category values from the ProductModel collection
    const categories = await ProductModel.distinct("category");

    // Send the distinct categories as a JSON response
    res.json({ categories });
  } catch (error) {
    console.error(error);
    // Handle the error in case of any exception
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;

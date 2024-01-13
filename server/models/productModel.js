const mongoose = require("mongoose");
const Joi = require("joi");
const { dateNow } = require("../utils/date");

// Define the product schema
const productSchema = new mongoose.Schema({
  name: String, // Product name
  info: String, // Product information
  price: Number, // Product price
  category: {
    type: String,
    enum: [
      "Phones",
      "Speaker",
      "Pc",
      "Laptop",
      "Tablet",
      "Keyboard",
      "Mouse",
      "Hard Drives",
      "USB",
      "Microphone",
      "Wearable",
      "Camera",
      "Home",
      "Accessory",
      "Audio",
      "Monitor",
      "Headphone",
      "Console",
    ], // Product category (limited to phones, speaker, pc...)
  },
  image: String, // Product image URL
  moreImages: Array, // Array of additional product image URLs
  company: String, // Product company/brand
  model: String, // Product model
  year: Number, // Product year
  quantity: Number, // Product quantity
  inStock: {
    type: Boolean,
    default: true, // Indicates whether the product is in stock (defaults to true)
  },
  reviews: Array, // Array of product reviews
  created_at: {
    type: Date,
    default: dateNow(), // Set the default created_at date using the dateNow function
  },
  updated_at: {
    type: Date,
    default: dateNow(), // Set the default updated_at date using the dateNow function
  },
  user_id: {
    type: String,
    default: null,
  },
});

// Export the product model
exports.ProductModel = mongoose.model("products", productSchema);

// Define a function to validate product data using Joi
exports.validateProduct = (_reqBody) => {
  // Define a Joi schema to validate the product data
  const joiSchema = Joi.object({
    // Validate the product name
    name: Joi.string().min(2).max(100).required(),

    // Validate the product information
    info: Joi.string().min(2).max(600).required(),

    // Validate the product price (minimum value: 0.01, maximum value: 99999.99)
    price: Joi.number().min(0.01).max(99999.99).required(),

    // Validate the product category (must be one of "phones", "speaker", "pc"...)
    category: Joi.string()
      .valid(
        "Phones",
        "Speaker",
        "Pc",
        "Laptop",
        "Tablet",
        "Keyboard",
        "Mouse",
        "Hard Drives",
        "USB",
        "Microphone",
        "Wearable",
        "Camera",
        "Home",
        "Accessory",
        "Audio",
        "Monitor",
        "Headphone",
        "Console"
      )
      .required(),

    // Validate the product image URL (minimum length: 2, maximum length: 400)
    // Allow null or an empty string as valid values for the image
    image: Joi.string().min(2).max(400).allow(null, ""),

    // Validate the array of additional product image URLs
    // Each element in the array must be a string with minimum length: 2, maximum length: 400
    // Allow null or an empty string as valid values for the array
    // Allow a maximum of 5 elements in the array
    moreImages: Joi.array()
      .items(Joi.string().min(2).max(400))
      .max(5)
      .allow(null, ""),

    // Validate the product company/brand (minimum length: 2, maximum length: 400)
    company: Joi.string().min(2).max(400).required(),

    // Validate the product model (minimum length: 2, maximum length: 400)
    model: Joi.string().min(2).max(400).required(),

    // Validate the product year (minimum value: 1900, maximum value: current year)
    year: Joi.number().min(1900).max(new Date().getFullYear()).required(),

    // Validate the product quantity (must be an integer, minimum value: 0, maximum value: 1000)
    quantity: Joi.number().integer().min(0).max(1000).required(),

    // Validate the product inStock status (must be a boolean value)
    inStock: Joi.boolean().required(),
  });

  // Perform the validation using the Joi schema and return the result
  return joiSchema.validate(_reqBody);
};

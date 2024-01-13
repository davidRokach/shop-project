const mongoose = require("mongoose");
const Joi = require("joi");
// For token
const { dateNow } = require("../utils/date");

// Define the user schema
let userSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    unique: true,
  },
  password: String,
  role: {
    type: String,
    default: "user",
  },
  profileImage: {
    type: String,
    default:
      "https://cdn.tutsplus.com/mac/authors/jacob-penderworth/user-black.png",
  },
  favorite: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "products",
    },
  ],
  shopCart: {
    cart: [
      {
        _id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "products",
        },
        amount: {
          type: Number,
          default: 1, // You can set a default amount if needed
        },
      },
    ],
    totalPrice: {
      type: Number,
      default: 0,
    },
    totalItems: {
      type: Number,
      default: 0,
    },
  },
  isOnline: {
    type: Boolean,
    default: false,
  },
  // Modify the "address" field in the user schema
  address: {
    street: {
      type: String,
      default: "No street address provided",
    },
    city: {
      type: String,
      default: "No city provided",
    },
    state: {
      type: String,
      default: "No state provided",
    },
    postalCode: {
      type: String,
      default: "No postal code provided",
    },
    country: {
      type: String,
      default: "No country provided",
    },
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

// Export the user model
exports.UserModel = mongoose.model("users", userSchema);

// Validation schema for user registration
exports.validateUser = (_reqBody) => {
  const joiSchema = Joi.object({
    name: Joi.string().min(2).max(100).required(),
    email: Joi.string().min(2).max(100).email().required(),
    password: Joi.string().min(2).max(50).required(),
  });
  return joiSchema.validate(_reqBody);
};

// Validation schema for user login
exports.validateLogin = (_reqBody) => {
  const joiSchema = Joi.object({
    email: Joi.string().min(2).max(200).email().required(),
    password: Joi.string().min(2).max(50).required(),
  });
  return joiSchema.validate(_reqBody);
};

exports.validateUpdateUser = (_reqBody) => {
  const joiSchema = Joi.object({
    name: Joi.string().min(2).max(100).required(),
    email: Joi.string().min(2).max(200).email().required(),
    profileImage: Joi.string().uri(), // Assuming it's a URL
  });
  return joiSchema.validate(_reqBody);
};

exports.validatePassword = (_reqBody) => {
  const joiSchema = Joi.object({
    password: Joi.string().min(2).max(50).required(),
  });
  return joiSchema.validate(_reqBody);
};

// Validation schema for shopCart items
exports.validateShopCartItem = (_reqBody) => {
  const joiSchema = Joi.object({
    _id: Joi.string().required(), // Assuming you send the product ID when updating the cart
    amount: Joi.number().integer().min(1).required(),
  });
  return joiSchema.validate(_reqBody);
};

exports.validateUpdateAddress = (_reqBody) => {
  const joiSchema = Joi.object({
    street: Joi.string().min(2).max(100),
    city: Joi.string().min(2).max(100),
    state: Joi.string().min(2).max(100),
    postalCode: Joi.string().min(2).max(20),
    country: Joi.string().min(2).max(100),
  });

  return joiSchema.validate(_reqBody);
};

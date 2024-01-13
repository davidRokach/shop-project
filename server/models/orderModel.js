const mongoose = require("mongoose");
const Joi = require("joi");
const { dateNow } = require("../utils/date");

const orderSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  items: [
    {
      product_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "products",
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
    },
  ],
  total_price: {
    type: Number,
    required: true,
  },
  shipping_price: {
    type: Number,
    default: 10, // Set the default shipping price to 10 or adjust as needed
  },
  status: {
    type: String,
    default: "Pending",
  },
  created_at: {
    type: Date,
    default: dateNow(), // Set the default created_at date using the dateNow function
  },
});

exports.OrderModel = mongoose.model("orders", orderSchema);

exports.validateOrder = (_reqBody) => {
  const joiSchema = Joi.object({
    orderItems: Joi.array()
      .items(
        Joi.object({
          _id: Joi.object().required(), // Validates that _id is an object
          amount: Joi.number().integer().min(1).required(),
        })
      )
      .min(1)
      .required(),
    totalOrderPrice: Joi.number().required(),
    shipping_price: Joi.number().default(0),
    status: Joi.string(),
  });
  return joiSchema.validate(_reqBody);
};

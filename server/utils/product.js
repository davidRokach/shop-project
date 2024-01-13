const { ProductModel } = require("../models/productModel");
const { UserModel } = require("../models/userModel");

exports.updateProductQuantities = async (orderItems) => {
  for (const orderItem of orderItems) {
    const product = await ProductModel.findById(orderItem._id._id);
    if (!product) {
      throw new Error(`Product with ID ${orderItem._id._id} not found`);
    }

    if (product.quantity < orderItem.amount) {
      throw new Error(`Insufficient quantity for product ${product.name}`);
    }
    product.quantity -= orderItem.amount;
    await product.save();
  }
};

exports.deleteCartItems = async (userId) => {
  try {
    // Find the user document by ID
    const user = await UserModel.findById(userId);

    // Check if the user exists
    if (!user) {
      throw new Error("User not found");
    }

    // Remove the cart items from the user document
    user.shopCart = { cart: [], totalItems: 0, totalPrice: 0 };
    console.log(user);

    // Save the updated user document
    await user.save();

    console.log(`Deleted cart items for user with ID: ${userId}`);
  } catch (error) {
    // Handle any errors that occur during the deletion process
    console.error(`Error deleting cart items: ${error}`);
    throw error; // Rethrow the error to be caught by the calling function if necessary
  }
};

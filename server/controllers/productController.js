// Importing required modules and models
const { OrderModel, validateOrder } = require("../models/orderModel");
const { ProductModel, validateProduct } = require("../models/productModel");
const { UserModel, validateShopCartItem } = require("../models/userModel");
const {
  updateProductQuantities,
  deleteCartItems,
} = require("../utils/product");

// Controller object for product-related operations
const productCtrl = {
  async getProducts(req, res) {
    try {
      // Extracting query parameters from the request
      const perPage = req.query.perPage || 12;
      const page = req.query.page - 1 || 0;
      const sort = req.query.sort || "_id";
      const reverse = req.query.reverse == "yes" ? 1 : -1;
      const category = req.query.category;
      const search = req.query.s;
      const user_id = req.query.user_id;

      // Defining an initial empty filter object
      let filterFind = {};

      // Creating an array to hold individual filters
      const filters = [];

      // Applying filters based on the query parameters
      if (category) {
        filters.push({ category });
      }
      if (search) {
        const searchExp = new RegExp(search, "i");
        filters.push({ $or: [{ name: searchExp }, { info: searchExp }] });
      }
      if (user_id) {
        filters.push({ user_id });
      }

      // Combine filters using $and operator
      if (filters.length > 0) {
        filterFind = { $and: filters };
      }

      // Querying the ProductModel collection with the applied filters
      const data = await ProductModel.find(filterFind)
        .limit(perPage)
        .skip(page * perPage)
        .sort({ [sort]: reverse });

      // Querying the ProductModel collection with the applied filters
      const allProduct = await ProductModel.find(filterFind);

      let unitsInStock = 0;
      allProduct.forEach((item) => {
        unitsInStock += item.quantity;
      });

      // Sending the retrieved data as a JSON response
      res.json({
        products: data,
        unitsInStock,
        amountOfProducts: allProduct.length,
      });
    } catch (err) {
      console.log(err);
      res.status(502).json({ err });
    }
  },
  async getSingleProductById(req, res) {
    try {
      const id = req.params.id;

      // Querying the ProductModel collection for a single product by its ID
      const data = await ProductModel.findOne({ _id: id });

      // Sending the retrieved data as a JSON response
      res.json(data);
    } catch (err) {
      console.log(err);
      res.status(502).json({ err });
    }
  },
  async count(req, res) {
    try {
      // Extracting query parameters from the request
      const perPage = req.query.perPage || 5;
      const category = req.query.category;
      const search = req.query.s;
      const user_id = req.query.user_id;

      // Defining an initial empty filter object
      let filterFind = {};

      // Applying filters based on the query parameters
      if (category) {
        filterFind = { category_url: category };
      }
      if (search) {
        const searchExp = new RegExp(search, "i");
        filterFind = { $or: [{ name: searchExp }, { info: searchExp }] };
      }
      if (user_id) {
        filterFind = { user_id };
      }

      // Counting the number of documents in the ProductModel collection that match the filters
      const count = await ProductModel.countDocuments(filterFind);

      // Sending the count and the number of pages as a JSON response
      res.json({ count, pages: Math.ceil(count / perPage) });
    } catch (err) {
      console.log(err);
      res.status(502).json({ err });
    }
  },
  async getFavorite(req, res) {
    try {
      // Finding the user by their ID and retrieving their favorite products
      const { favorite } = await UserModel.findOne({ _id: req.tokenData._id });

      // Sending the favorite products as a JSON response
      res.json(favorite);
    } catch (err) {
      console.log(err);
      res.status(502).json({ err });
    }
  },
  async getShopCartAndUpdate(req, res) {
    try {
      // Finding the user by their ID and retrieving their shopping cart
      const user = await UserModel.findOne({
        _id: req.tokenData._id,
      }).populate("shopCart.cart._id");

      const shopCart = user.shopCart;

      // Calculate total price and total items
      let totalPrice = 0;
      let totalItems = 0;

      // Remove items with null _id
      for (let i = shopCart.cart.length - 1; i >= 0; i--) {
        if (shopCart.cart[i]._id == null) {
          shopCart.cart.splice(i, 1);
        } else {
          totalPrice += shopCart.cart[i]._id.price * shopCart.cart[i].amount;
          totalItems += shopCart.cart[i].amount;
        }
      }

      // Update the totalPrice in shopCart
      shopCart.totalPrice = totalPrice.toFixed(2);

      // Update the totalItems in shopCart
      shopCart.totalItems = totalItems;

      // Save the updated shopCart to the database
      await user.save();

      // Sending the updated shopping cart as a JSON response
      res.json(shopCart);
    } catch (err) {
      console.log(err);
      res.status(502).json({ err });
    }
  },
  async addProduct(req, res) {
    // Validating the request body using the validateProduct function
    const validBody = validateProduct(req.body);
    if (validBody.error) {
      return res.status(400).json(validBody.error.details);
    }

    try {
      // Creating a new product instance based on the request body
      const product = new ProductModel(req.body);
      product.user_id = req.tokenData._id;

      // Saving the product to the database
      await product.save();

      // Sending the saved product as a JSON response
      res.json(product);
    } catch (err) {
      console.log(err);
      if (err.errors.category.properties.message) {
        res.status(502).json({ err: err.errors.category.properties.message });
      }
      res.status(502).json({ err });
    }
  },
  async addFavorite(req, res) {
    try {
      if (!Array.isArray(req.body.favorite)) {
        return res
          .status(400)
          .json({ msg: "You need to send favorite as an array" });
      }

      // Updating the user's favorite products with the provided array
      const user = await UserModel.updateOne(
        { _id: req.tokenData._id },
        { favorite: req.body.favorite }
      );

      // Sending the updated user as a JSON response
      res.json(user);
    } catch (err) {
      console.log(err);
      res.status(502).json({ err });
    }
  },
  async modifyShopCartItem(req, res) {
    try {
      const { shopCartItem, action, newAmount } = req.body;

      if (!shopCartItem || typeof shopCartItem !== "object") {
        return res
          .status(400)
          .json({ msg: "You need to send shopCartItem as an object" });
      }

      const validation = validateShopCartItem(shopCartItem);

      if (validation.error) {
        return res
          .status(400)
          .json({ msg: validation.error.details[0].message });
      }

      const userId = req.tokenData._id;

      const user = await UserModel.findOne({ _id: userId });

      const existingItem = user.shopCart.cart.find(
        (item) => item._id == shopCartItem._id
      );

      if (existingItem) {
        if (
          !action ||
          (action !== "increase" &&
            action !== "decrease" &&
            action !== "updateAmount" &&
            action !== "delete")
        ) {
          return res.status(400).json({ msg: "Invalid action specified" });
        }
        if (action === "increase") {
          existingItem.amount += 1;
        } else if (action === "decrease") {
          if (existingItem.amount === 1) {
            return res.json({
              msg: "Item amount is already at the minimum of 1",
            });
          }
          existingItem.amount -= 1;
        } else if (action === "updateAmount") {
          if (newAmount == 0) {
            return res.json({
              msg: "Item amount cannot be set to 0",
            });
          }
          existingItem.amount = newAmount;
        } else if (action === "delete") {
          // Find the index of the existingItem in the cart array
          const itemIndex = user.shopCart.cart.findIndex(
            (item) => item._id == shopCartItem._id
          );

          if (itemIndex !== -1) {
            // Remove the item from the cart array
            user.shopCart.cart.splice(itemIndex, 1);
          } else {
            return res.status(400).json({ msg: "Item not found in cart" });
          }
        }
      } else {
        shopCartItem.amount = 1;
        user.shopCart.cart.push(shopCartItem);
      }

      // Update the user's shopping cart with the modified array
      const updatedUser = await UserModel.findOneAndUpdate(
        { _id: userId },
        {
          shopCart: {
            cart: user.shopCart.cart,
          },
        },
        { new: true }
      );

      // Sending the updated user as a JSON response
      res.json(updatedUser);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal server error" });
    }
  },
  async updateProductById(req, res) {
    // Validating the request body using the validateProduct function
    const validBody = validateProduct(req.body);
    if (validBody.error) {
      return res.status(400).json(validBody.error.details);
    }

    try {
      const id = req.params.id;
      let data;

      // Checking the role of the user to determine the update permission
      if (req.tokenData.role != "user") {
        // Updating the product by its ID with the provided request body
        data = await ProductModel.updateOne({ _id: id }, req.body);
      } else {
        // Updating the product by its ID and the user ID to ensure ownership
        data = await ProductModel.updateOne(
          { _id: id, user_id: req.tokenData._id },
          req.body
        );
      }

      // Sending the update result as a JSON response
      res.json(data);
    } catch (err) {
      console.log(err);
      res.status(502).json({ err });
    }
  },
  async deleteProductById(req, res) {
    try {
      const id = req.params.id;
      let data;

      // Checking if the user is not a regular user, admin, or super admin
      if (req.tokenData.role != "user") {
        // Deleting the product by its ID
        data = await ProductModel.deleteOne({ _id: id });
      }
      // If the user is a regular user, checking if the record belongs to the user
      else {
        data = await ProductModel.deleteOne({
          _id: id,
          user_id: req.tokenData._id,
        });
      }

      // Sending the delete result as a JSON response
      res.json(data);
    } catch (err) {
      console.log(err);
      res.status(502).json({ err });
    }
  },
  async orderProducts(req, res) {
    try {
      // Extract data from the request body
      const { orderItems, shipping_price, totalOrderPrice, status } = req.body;

      // Check if orderItems is a valid array and not empty
      if (!Array.isArray(orderItems) || orderItems.length === 0) {
        return res.status(400).json({ error: "Invalid order items" });
      }

      // Validate the order data using an external validation function
      const { error } = validateOrder({ ...req.body });

      // If validation fails, return an error response
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }

      // Update product quantities and validate
      await updateProductQuantities(orderItems);

      // Calculate the final total price including shipping
      const finalTotalPrice = totalOrderPrice + shipping_price;

      // Transform orderItems into a format suitable for database storage
      const items = orderItems.map((item) => ({
        product_id: item._id._id,
        quantity: item.amount,
        price: item._id.price,
      }));

      // Create an order object
      const order = new OrderModel({
        user_id: req.tokenData._id,
        items: items,
        total_price: finalTotalPrice.toFixed(2),
        status: "Pending",
        shipping_price: shipping_price,
      });

      // Save the order to the database
      await order.save();

      // Delete items from the cart after successfully placing the order
      await deleteCartItems(req.tokenData._id);

      // Return a success response with the order details
      res.status(201).json({ message: "Order placed successfully", order });
    } catch (err) {
      // Handle errors gracefully and return an error response
      console.error(err);
      res
        .status(500)
        .json({ error: "Internal server error", err: err.toString() });
    }
  },
  async getOrders(req, res) {
    try {
      // Retrieve all orders from the database and populate product details
      const orders = await OrderModel.find({})
        .populate("items.product_id")
        .populate("user_id");

      // Return the orders as a JSON response
      res.json(orders);
    } catch (err) {
      // Handle errors and return an error response
      console.log(err);
      res.status(502).json({ err });
    }
  },
};

module.exports = productCtrl;

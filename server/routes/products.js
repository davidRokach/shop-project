const express = require("express");
const { authAdmin, auth } = require("../middlewares/auth");
const {
  getProducts,
  getSingleProductById,
  count,
  getFavorite,
  addProduct,
  addFavorite,
  updateProductById,
  deleteProductById,
  modifyShopCartItem,
  getShopCartAndUpdate,
  orderProducts,
  getOrders,
} = require("../controllers/productController");

const router = express.Router();

// Route to get all products
router.get("/", getProducts);

// Route to get a single product by ID
router.get("/single/:id", getSingleProductById);

// Route to retrieve the count of records based on search, user ID, and category
// Provides significant resource savings compared to a regular find request
router.get("/count", count);

// Route to get favorite products for an authenticated user
router.get("/favorite", auth, getFavorite);

// Route to get products in the shopping cart for an authenticated user
router.get("/shopCart", auth, getShopCartAndUpdate);

// Route to add a new product (restricted to admin users)
router.post("/", auth, authAdmin, addProduct);

// Route to add a product to favorites
router.post("/favorite", addFavorite);

// Route to add a product to the shopping cart
router.post("/shopCart", auth, modifyShopCartItem);

// Route to update a product by ID (restricted to admin users)
router.put("/:id", auth, authAdmin, updateProductById);

// Route to delete a product by ID (restricted to admin users)
router.delete("/:id", auth, authAdmin, deleteProductById);

router.post("/order", auth, orderProducts);

router.get("/orders", auth, authAdmin, getOrders);

module.exports = router;

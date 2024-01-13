const express = require("express");
const { auth, authAdmin } = require("../middlewares/auth");
const {
  checkToken,
  userInfo,
  userList,
  register,
  login,
  changeRole,
  deleteById,
  logoutUser,
  editById,
  changePassword,
  updateAddress,
} = require("../controllers/userController");

const router = express.Router();

// Route to check the validity of a token
router.get("/checkToken", auth, checkToken);

// Route to get user information (excluding password) if a valid token is provided
router.get("/userInfo", auth, userInfo);

// Route to get the list of users (restricted to admin or super admin)
router.get("/userList", auth, authAdmin, userList);

// Route to register a new user
router.post("/", register);

// Route to handle user login
router.post("/login", login);

// Route to handle user logout
router.post("/logout", auth, logoutUser);

// Route to edit user information by their ID
router.patch("/editUser/:id", auth, editById);

router.patch("/changePassword/:id", auth, changePassword);

// Route to change the role (admin or regular user) of a user (restricted to admin or super admin)
router.patch("/changeRole/:id/:role", auth, authAdmin, changeRole);

// Route to delete a user by their ID (restricted to admin or the user themselves)
router.delete("/deleteUser/:id", auth, deleteById);

// Route to delete a user by their ID (restricted to admin or the user themselves)
router.put("/updateAddress/", auth, updateAddress);

module.exports = router;

const bcrypt = require("bcrypt");
const {
  UserModel,
  validateLogin,
  validateUser,
  validateUpdateUser,
  validatePassword,
} = require("../models/userModel");
const {
  createToken,
  saveAccessTokenOnCookie,
  saveRefreshTokenOnCookie,
  clearTokensFromCookies,
} = require("../utils/jwtUtils");
const { RefreshTokenModel } = require("../models/refreshTokenModel");
const { dateNow } = require("../utils/date");

const userCtrl = {
  async checkToken(req, res) {
    // Returns the token data as a JSON response
    res.json(req.tokenData);
  },
  async userInfo(req, res) {
    try {
      // Retrieves the user's information by their ID, excluding password, __v, and updatedAt fields
      // Populates the 'favorite' and 'shopCart' fields with their corresponding documents
      const user = await UserModel.findOne(
        { _id: req.tokenData._id },
        { password: 0, __v: 0, updatedAt: 0 }
      )
        .populate("favorite")
        .populate("shopCart.cart._id");
      res.json(user);
    } catch (err) {
      console.log(err);
      res.status(502).json({ err });
    }
  },
  async userList(req, res) {
    try {
      // Retrieves all users' information, excluding the password field
      const users = await UserModel.find({}, { password: 0 });
      res.json({ users });
    } catch (err) {
      console.log(err);
      res.status(502).json({ err });
    }
  },
  async register(req, res) {
    // Validating the request body using the validateUser function
    const validBody = validateUser(req.body);
    if (validBody.error) {
      return res.status(401).json(validBody.error.details);
    }
    try {
      // Creating a new user instance based on the request body
      const user = new UserModel(req.body);

      // Encrypting the password using bcrypt
      user.password = await bcrypt.hash(user.password, 10);

      // Saving the user to the database
      await user.save();

      // Hiding the password for client-side display
      user.password = "*******";

      // Sending the saved user as a JSON response with the status code 201 (Created)
      res.status(201).json(user);
    } catch (err) {
      // Handling the error if the email is already in the system (code 11000)
      if (err.code == 11000) {
        return res
          .status(401)
          .json({ err: "Email already in system", code: 11000 });
      }
      console.log(err);
      res.status(502).json({ err });
    }
  },
  async login(req, res) {
    // Validating the request body using the validateLogin function
    const validBody = validateLogin(req.body);
    if (validBody.error) {
      return res.status(401).json(validBody.error.details);
    }
    try {
      // Checking if the provided email exists in the database
      const user = await UserModel.findOne({ email: req.body.email });
      if (!user) {
        return res
          .status(401)
          .json({ msg: "Email or password not found or wrong!" });
      }

      // Comparing the provided password with the encrypted password in the database using bcrypt
      const passwordValid = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!passwordValid) {
        return res
          .status(401)
          .json({ msg: "Email or password not found or wrong!" });
      }

      // Creating access and refresh tokens using the createToken function
      const access_token = createToken(user, "15m"); //5m-15m
      const refresh_token = createToken(user, "7d"); //7d

      // Creating a new refresh token document and saving it to the database
      const newRefreshToken = new RefreshTokenModel({
        user: user._id,
        token: refresh_token,
      });
      await newRefreshToken.save();

      // Saving the access and refresh tokens on the client-side cookies using saveAccessTokenOnCookie and saveRefreshTokenOnCookie functions
      saveAccessTokenOnCookie(res, access_token);
      saveRefreshTokenOnCookie(res, refresh_token);

      // Set the 'isOnline' property of the user to true and save the changes to the database
      await UserModel.updateOne({ _id: user._id }, { isOnline: true });

      // Sending a success message as a JSON response
      return res.json({ msg: "User successfully logged in" });
    } catch (err) {
      console.log(err);
      res.status(502).json({ err });
    }
  },
  async changeRole(req, res) {
    try {
      const { id, role } = req.params;
      // Checking if the role is valid (either "user" or "admin")
      if (role != "user" && role != "admin") {
        return res.status(401).json({ err: "You can send admin or user role" });
      }

      // Preventing the admin from changing their own role
      if (id == req.tokenData._id) {
        return res.status(401).json({ err: "You can't change yourself" });
      }

      // Set the updated_at field to the current time using the dateNow() function
      const updateTimeFunc = dateNow(); // Assuming dateNow() is a custom function that returns a function providing the current time
      const updated_at = updateTimeFunc();

      // Updating the role and updated_at fields of the specified user in the database
      const data = await UserModel.updateOne(
        { _id: id, role: { $not: new RegExp("superadmin") } },
        { role, updated_at }
      );

      // Send the updated data as a response
      res.json(data);
    } catch (err) {
      console.log(err);
      res.status(502).json({ err });
    }
  },
  async editById(req, res) {
    try {
      const { id } = req.params;

      // Validating the request body using the validateUser function
      const validBody = validateUpdateUser(req.body);
      if (validBody.error) {
        return res.status(400).json(validBody.error.details);
      }

      if (
        req.tokenData._id === id ||
        req.tokenData.role === "superadmin" ||
        req.tokenData.role === "admin"
      ) {
        // Check if the user ID matches the authenticated user's ID or if the authenticated user is a superadmin or admin
        // This allows the user or authorized administrators to edit user information

        // Set the updated_at field to the current time obtained from the dateNow() function
        const updateTimeFunc = dateNow(); // Assuming dateNow() is a custom function that returns a function returning the current time
        // Updating the user information by their ID in the database
        const data = await UserModel.updateOne(
          { _id: id },
          {
            name: req.body.name,
            email: req.body.email,
            profileImage: req.body.profileImage,
            updated_at: updateTimeFunc(),
          }
        );

        // Send the updated data as a response
        res.json(data);
      } else {
        // If the user is not authorized to edit other users, send a message
        res.status(401).json({ err: "Unauthorized to edit this user." });
      }
    } catch (err) {
      // Handling the error if the email is already in the system (code 11000)
      if (err.code == 11000) {
        return res
          .status(401)
          .json({ err: "Email already in system", code: 11000 });
      }
      console.log(err);
      res.status(500).json({ err: "Internal server error." });
    }
  },
  async changePassword(req, res) {
    try {
      const { id } = req.params;
      // Validating the request body using the validatePassword function
      const validBody = validatePassword({ password: req.body.newPassword });
      if (validBody.error) {
        return res.status(400).json(validBody.error.details);
      }

      if (req.tokenData._id === id) {
        // Check if the user ID matches the authenticated user's ID
        // This allows the user to change their own password

        // Find the user with the specified ID in the database
        const user = await UserModel.findOne({ _id: id });
        if (!user) {
          // If the user is not found, return a 404 response
          return res.status(404).json({ err: "User not found." });
        }

        // Comparing the provided password with the encrypted password in the database using bcrypt
        const passwordValid = await bcrypt.compare(
          req.body.oldPassword,
          user.password
        );
        if (!passwordValid) {
          // If the provided current password is incorrect, return a 401 response
          return res
            .status(401)
            .json({ msg: "Current password is incorrect!" });
        }

        // Generate a new hash of the new password using bcrypt
        const newHashedPassword = await bcrypt.hash(req.body.newPassword, 10);

        // Set the updated_at field to the current time obtained from the dateNow() function
        const currentTime = dateNow(); // Assuming dateNow() is a custom function that returns a function providing the current time

        // Update the user's password in the database
        const updateQuery = UserModel.updateOne(
          { _id: id },
          {
            password: newHashedPassword,
            updated_at: currentTime(),
          }
        );
        const data = await updateQuery.exec();

        // Send the updated data as a response
        res.json(data);
      } else {
        // If the user is not authorized to change other users' passwords, send an error message
        res
          .status(401)
          .json({ err: "Unauthorized to change password for this user." });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ err: "Internal server error." });
    }
  },
  async deleteById(req, res) {
    try {
      const { id } = req.params; // Get the user ID from the request parameters
      const { role, _id } = req.tokenData; // Get the role and ID of the authenticated user from the token data

      // Check if the authenticated user is an admin trying to delete themselves
      if (role === "admin" && id === _id) {
        return res
          .status(401)
          .json({ err: "Unauthorized to delete your own user account." });
      }

      // Check if the authenticated user is an admin trying to delete another admin
      if (role === "admin" && _id !== id) {
        const adminToDelete = await UserModel.findById(id);

        if (adminToDelete && adminToDelete.role === "admin") {
          return res
            .status(403)
            .json({ err: "Unauthorized to delete an admin user." });
        }
      }

      // Check if the authenticated user is deleting their own account or if they are a superadmin
      if (_id === id || role === "superadmin") {
        // Deleting the specified user from the database
        const data = await UserModel.deleteOne({
          _id: id,
        });

        res.json(data);
      } else {
        return res
          .status(403)
          .json({ err: "Unauthorized to delete this user." });
      }
    } catch (err) {
      console.log(err);
      res.status(502).json({ err });
    }
  },
  async logoutUser(req, res) {
    try {
      // Clearing tokens from client-side cookies using the clearTokensFromCookies function
      clearTokensFromCookies(res);
      // Set the 'isOnline' property of the user to false and save the changes to the database
      await UserModel.updateOne(
        { _id: req.tokenData._id },
        { isOnline: false }
      );

      // Sending a JSON response indicating successful logout
      res.json("User logged out successfully");
    } catch (err) {
      console.log(err);
      // Handling any error that occurs and sending an error response with the status code 500 (Internal Server Error)
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
  async updateAddress(req, res) {
    try {
      const id  = req.tokenData._id;
      const { body } = req;

      // Find the user by ID and update their address
      const updatedUser = await UserModel.findByIdAndUpdate(
        id,
        { $set: { address: body } },
        { new: true }
      );

      if (!updatedUser) {
        return res.status(404).json({ error: "User not found" });
      }

      // Send a success response with the updated user data
      res
        .status(200)
        .json({ message: "Address updated successfully", user: updatedUser });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};

module.exports = userCtrl;

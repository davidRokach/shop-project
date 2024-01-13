const jwt = require("jsonwebtoken");
const { config } = require("../config/secret");
const {
  clearTokensFromCookies,
  saveAccessTokenOnCookie,
  saveRefreshTokenOnCookie,
  createToken,
} = require("../utils/jwtUtils");
const { RefreshTokenModel } = require("../models/refreshTokenModel");

// Middleware for authenticating requests
exports.auth = async (req, res, next) => {
  const accessToken = req.cookies.access_token;
  const refreshToken = req.cookies.refresh_token;

  // Check if access token exists
  if (!accessToken) {
    clearTokensFromCookies(res);
    return res.status(401).json({
      err: "Unauthorized, Access token required",
      errorCode: "MW401",
    });
  }

  try {
    // Verify the access token
    const decoded = jwt.verify(accessToken, config.TOKEN_SECRET);
    req.tokenData = decoded;
    console.log("Using Access Token");
    next();
  } catch (err) {
    console.log("Access Token invalid, checking refresh token");

    // Check if refresh token exists
    if (!refreshToken) {
      clearTokensFromCookies(res);
      return res.status(401).json({
        err: "Unauthorized, Refresh token required",
        errorCode: "MW401",
      });
    }

    try {
      // Verify the refresh token
      const decodedRefreshToken = jwt.verify(refreshToken, config.TOKEN_SECRET);
      const role = decodedRefreshToken.role;
      const _id = decodedRefreshToken._id;

      // Create new access and refresh tokens
      const new_access_token = createToken({ role, _id }, "15m"); // 5 minutes to 15 minutes
      const new_refresh_token = createToken({ role, _id }, "7d"); // 7 days

      // Update the refresh token in the database
      const { matchedCount, modifiedCount } = await RefreshTokenModel.updateOne(
        {
          user: decodedRefreshToken._id,
          token: refreshToken,
        },
        {
          token: new_refresh_token,
        }
      );

      // Check if the refresh token update was successful
      if (!matchedCount && !modifiedCount) {
        clearTokensFromCookies(res);
        return res.status(401).json({
          err: "Unauthorized, Refresh token required",
          errorCode: "MW401",
        });
      }

      // Save the new access and refresh tokens on cookies
      saveAccessTokenOnCookie(res, new_access_token);
      saveRefreshTokenOnCookie(res, new_refresh_token);
      req.tokenData = decodedRefreshToken;
      console.log(
        "Using Refresh Token and refreshing Access and Refresh tokens"
      );
      next();
    } catch (err) {
      // Set the 'isOnline' property of the user to false and save the changes to the database
      await UserModel.updateOne(
        { _id: req.tokenData._id },
        { isOnline: false }
      );
      console.log("Refresh Token Invalid");
      res.status(401).json({ err: "Token invalid or expired" });
    }
  }
};

// Middleware for checking if the user is an admin
exports.authAdmin = ({ tokenData: { role } }, res, next) => {
  if (role === "admin" || role == "superadmin") {
    return next();
  }

  return res.status(401).json({
    err: "Unauthorized, Forbidden",
    errorCode: "MW403",
  });
};

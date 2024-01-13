const jwt = require("jsonwebtoken");
const { config } = require("../config/secret");

// Function to create a JWT token based on user data and time-to-live (ttl)
exports.createToken = ({ _id, name, role }, ttl) => {
  const token = jwt.sign({ _id, name, role }, config.TOKEN_SECRET, {
    expiresIn: ttl,
  });
  return token;
};

// Function to save the refresh token on a cookie in the HTTP response
exports.saveRefreshTokenOnCookie = async (res, refreshToken) => {
  res.cookie("refresh_token", refreshToken, {
    httpOnly: true, // Cookie cannot be accessed by client-side JavaScript
    sameSite: "strict", // Cookie is only sent for same-site requests                            //lax, strict,none
  });
};

// Function to save the access token on a cookie in the HTTP response
exports.saveAccessTokenOnCookie = async (res, accessToken) => {
  res.cookie("access_token", accessToken, {
    httpOnly: true, // Cookie cannot be accessed by client-side JavaScript
    sameSite: "strict", // Cookie is only sent for same-site requests                                   //lax, strict,none
  });
};

// Function to clear the refresh token and access token cookies from the response
exports.clearTokensFromCookies = (res) => {
  res.clearCookie("refresh_token");
  res.clearCookie("access_token");
};

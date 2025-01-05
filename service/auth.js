require("dotenv").config();

const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY;

function setUser(user) {
  return jwt.sign({ _id: user._id, email: user.email }, SECRET_KEY);
}

function getUser(token) {
  try {
    if (!token) return null;

    // Verify and decode the token
    return jwt.verify(token, SECRET_KEY);
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      console.error("Invalid token:", error.message);
      return null;
    }
    if (error.name === "TokenExpiredError") {
      console.error("Token expired");
      return null;
    }
    console.error("Error verifying token:", error);
    return null;
  }
}

module.exports = {
  setUser,
  getUser,
};

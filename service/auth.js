const jwt = require("jsonwebtoken");
const secretKey = "Shubh@000867345$$";

function setUser( user) {
  return jwt.sign({_id:user._id,email:user.email}, secretKey);
}

function getUser(token) {
  try {
    if (!token) return null;

    // Verify and decode the token
    return jwt.verify(token, secretKey);
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

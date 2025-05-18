// utils/jwt.js
const jwt = require("jsonwebtoken");
require("dotenv").config();

function generateToken(payload) {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
}

function refreshToken(payload) {
  return jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: "7d" });
}

function verifyToken(token) {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    console.error("Token verification failed:", err.message);
    return null;
  }
}

module.exports = { generateToken, verifyToken, refreshToken };

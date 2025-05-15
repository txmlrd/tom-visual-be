const User = require("../models/User");
const bcrypt = require("bcryptjs");
const { generateToken, refreshToken } = require("../utils/jwt");

async function register(req, res) {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ username, password: hashedPassword });
    res.status(201).json({ message: "User terdaftar!" });
  } catch (err) {
    res.status(500).json({ message: "Error register user", error: err.message });
  }
}

async function login(req, res) {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });
    if (!user) return res.status(401).json({ message: "User tidak ditemukan" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Password salah" });

    const tokenAccess = generateToken({ id: user.id, username: user.username });
    const tokenRefresh = refreshToken({ id: user.id, username: user.username });
    res.json({ message: "Login berhasil", tokenAccess, tokenRefresh });
  } catch (err) {
    res.status(500).json({ message: "Error login", error: err.message });
  }
}

async function logout(res) {
  try {
    res.json({ message: "Logout berhasil" });
  } catch (err) {
    res.status(500).json({ message: "Error logout", error: err.message });
  }
}

module.exports = { register, login, logout };

const verifyToken = require("./jwt").verifyToken;

function authMiddleware(req, res, next) {
  // Ambil token dari header Authorization: Bearer <token>
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res.status(401).json({ message: "Token tidak ditemukan" });
  }

  const token = authHeader.split(" ")[1]; // ambil token setelah "Bearer"

  if (!token) {
    return res.status(401).json({ message: "Token tidak ditemukan" });
  }

  const decoded = verifyToken(token);

  if (!decoded) {
    return res.status(401).json({ message: "Token tidak valid atau expired" });
  }

  // Simpan data user dari token ke req.user supaya bisa dipakai di route berikutnya
  req.user = decoded;
  next(); // lanjut ke handler route
}

module.exports = authMiddleware;
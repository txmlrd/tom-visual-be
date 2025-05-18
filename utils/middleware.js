const verifyToken = require("./jwt").verifyToken;

function authMiddleware(req, res, next) {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res.status(401).json({ message: "Token tidak ditemukan" });
  }

  const parts = authHeader.split(" ");
  if (parts.length !== 2 || parts[0] !== "Bearer") {
    return res.status(401).json({ message: "Format token salah" });
  }

  const token = parts[1];

  try {
    const decoded = verifyToken(token);
    if (!decoded) {
      return res.status(401).json({ message: "Token tidak valid atau expired" });
    }

    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Token tidak valid atau expired" });
  }
}

module.exports = authMiddleware;

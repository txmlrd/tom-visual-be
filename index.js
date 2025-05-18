require("dotenv").config();
const express = require("express");
const app = express();
const port = 3000;

const { connectDB, sequelize } = require("./utils/db");
const authRoutes = require("./routes/auth");
const postRoutes = require("./routes/post");
const getRoutes = require("./routes/get");
const authMiddleware = require("./utils/middleware");

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/post", authMiddleware, postRoutes);
app.use("/api/get", authMiddleware, getRoutes);


app.get("/public", (req, res) => {
  res.send("Selamat datang di API Auth! PUBLIC");
});

app.get("/private", authMiddleware, (req, res) => {
  res.send("Selamat datang di API Auth! PRIVATE");
});

async function startServer() {
  await connectDB();
  await sequelize.sync();
  app.listen(port, () => {
    console.log(`Server running di http://localhost:${port}`);
  });
}

startServer();

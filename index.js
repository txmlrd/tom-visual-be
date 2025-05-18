require("dotenv").config();
const express = require("express");
const app = express();
const port = 3000;

const { connectDB, sequelize } = require("./utils/db");
const authRoutes = require("./routes/auth");
const projectRoutes = require("./routes/project");
const getRoutes = require("./routes/get");
const projectTypeRoutes = require("./routes/projectType");
const authMiddleware = require("./utils/middleware");

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/project", authMiddleware, projectRoutes);
app.use("/api/get", authMiddleware, getRoutes);
app.use("/api/project-type", authMiddleware, projectTypeRoutes);

app.use("/storage", express.static("storage"));

app.get("/public", (req, res) => {
  res.send("Selamat datang di API Auth! PUBLIC");
});

app.get("/private", authMiddleware, (req, res) => {
  res.send("Selamat datang di API Auth! PRIVATE");
});

async function startServer() {
  try {
    await connectDB();
    await sequelize.sync();
    app.listen(port, () => {
      console.log(`Server running di http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

startServer();

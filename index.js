require("dotenv").config();
const express = require("express");
const app = express();
const port = 3000;

const { connectDB, sequelize } = require("./utils/db");
const authRoutes = require("./routes/auth");

app.use(express.json());

app.use("/api/auth", authRoutes);

async function startServer() {
  await connectDB();
  await sequelize.sync();
  app.listen(port, () => {
    console.log(`Server running di http://localhost:${port}`);
  });
}

startServer();

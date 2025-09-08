require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");

const app = express();
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const incomeRoutes = require("./routes/incomeRoutes");
const expenseRoutes = require("./routes/expenseRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

app.use(cors());
app.use(express.json());

connectDB();

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/income", incomeRoutes);
app.use("/api/v1/expense", expenseRoutes);
app.use("/api/v1/dashboard", dashboardRoutes);

// Serve uploaded files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Serve frontend static files from dist
app.use(express.static(path.join(__dirname, "../frontend/Mine/dist")));

// Catch-all route for frontend (after API and uploads)
app.get("*", (req, res) => {
  // If the request doesn't match an API or static file, serve index.html
  res.sendFile(path.resolve(__dirname, "../frontend/Mine/dist", "index.html"));
});

// 404 handler for API routes only
app.use((req, res, next) => {
  if (req.originalUrl.startsWith("/api")) {
    return res.status(404).send("Route not found: " + req.originalUrl);
  }
  next();
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
const express = require("express");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors({
  origin: "https://preppath-frontend.vercel.app",
  credentials: true
}));
app.use(express.json());

// Basic Route (Test Route)
app.get("/", (req, res) => {
  res.json({ message: "PrepPath AI Backend Running Successfully" });
});

//  Route Imports 
const authRoutes = require("./routes/authRoutes");
const profileRoutes = require("./routes/profileRoutes");
const roadmapRoutes = require("./routes/roadmapRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/roadmap", roadmapRoutes);

// Global Error Handler (we'll build later)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
});

module.exports = app;

// server.js
const express = require("express");
const cors = require("cors");
require("dotenv").config();

// Import routes
const authRoutes = require("./routes/auth");
const offersRoutes = require("./routes/offers");
const applicationsRoutes = require("./routes/applications");

// Initialize app
const app = express();

// ------------------- MIDDLEWARE -------------------
app.use(
  cors({
    origin: process.env.CLIENT_URL || "https://christ-project2025-chi.vercel.app",
    credentials: true,
  })
);

app.use(express.json());

// ------------------- ROUTES -------------------
app.use("/api/auth", authRoutes);
app.use("/api/offers", offersRoutes);
app.use("/api/applications", applicationsRoutes);

// ------------------- HEALTH CHECK -------------------
app.get("/", (req, res) => {
  res.status(200).send("Christ Recruiter Portal API is running 🚀");
});

// ------------------- START SERVER -------------------
const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

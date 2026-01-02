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

// Get port from environment or default to 5000
const PORT = process.env.PORT || 5000;

// ------------------- MIDDLEWARE -------------------
// Enable CORS for your frontend (Vercel URL)
app.use(
  cors({
    origin: process.env.CLIENT_URL || "https://christ-project2025-chi.vercel.app",
    credentials: true, // Allow cookies, authorization headers
  })
);

// Parse JSON body
app.use(express.json());

// ------------------- ROUTES -------------------
// Authentication routes
app.use("/api/auth", authRoutes);

// Offers routes
app.use("/api/offers", offersRoutes);

// Applications routes
app.use("/api/applications", applicationsRoutes);

// ------------------- TEST ROUTE -------------------
app.get("/", (req, res) => {
  res.send("Christ Recruiter Portal API is running 🚀");
});

// ------------------- START SERVER -------------------
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

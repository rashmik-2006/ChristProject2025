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

// Render provides PORT dynamically
const PORT = process.env.PORT || 5000;

// ------------------- MIDDLEWARE -------------------

// Allowed frontend URLs
const allowedOrigins = [
  "https://christ-project2025-chi.vercel.app", // Vercel frontend
  process.env.CLIENT_URL,                      // optional env override
].filter(Boolean);

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (Postman, server-to-server)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("CORS not allowed"), false);
    },
    credentials: true,
  })
);

// Parse JSON body
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
// IMPORTANT: bind to 0.0.0.0 for Render
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

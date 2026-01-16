const express = require("express");
const cors = require("cors");
require("dotenv").config();

const prisma = require("./prisma/client");

const authRoutes = require("./routes/auth");
const offersRoutes = require("./routes/offers");
const applicationsRoutes = require("./routes/applications");

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL || "*",
    credentials: true,
  })
);

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/offers", offersRoutes);
app.use("/api/applications", applicationsRoutes);

app.get("/", (req, res) => {
  res.send("Christ Recruiter Portal API is running 🚀");
});

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    console.log("🔄 Connecting to database...");
    await prisma.$connect();
    console.log("✅ Database connected");

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error);
    process.exit(1);
  }
}

startServer();

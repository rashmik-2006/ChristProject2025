// server.js
const authRoutes = require('./routes/auth');
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const offersRoutes = require('./routes/offers');
const applicationsRoutes = require('./routes/applications');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware

app.use(cors({ origin: process.env.CLIENT_URL })); // Allow frontend to connect
app.use(express.json()); // Allow server to read JSON

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/offers', offersRoutes);
app.use('/api/applications', applicationsRoutes);

// Test Route
app.get('/', (req, res) => {
  res.send('Christ Recruiter Portal API is running 🚀');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
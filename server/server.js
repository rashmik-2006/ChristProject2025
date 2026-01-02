const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const offersRoutes = require('./routes/offers');
const applicationsRoutes = require('./routes/applications');

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ CORS (FIXED)
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://glistening-sopapillas-cc2ee9.netlify.app",
      "https://6957e8dd20f4f30008f4ce30--glistening-sopapillas-cc2ee9.netlify.app"
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
  })
);

app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/offers', offersRoutes);
app.use('/api/applications', applicationsRoutes);

// Test route
app.get('/', (req, res) => {
  res.send('Christ Recruiter Portal API is running 🚀');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

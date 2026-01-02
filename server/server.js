const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const offersRoutes = require('./routes/offers');
const applicationsRoutes = require('./routes/applications');

const app = express();
const PORT = process.env.PORT || 5000;

/* =======================
   CORS CONFIG (FIX)
======================= */

const allowedOrigins = [
  "http://localhost:5173",
  "https://6957e8dd20f4f30008f4ce30--glistening-sopapillas-cc2ee9.netlify.app"
];

app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (Postman, server-to-server)
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));

/* =======================
   MIDDLEWARE
======================= */

app.use(express.json());

/* =======================
   ROUTES
======================= */

app.use('/api/auth', authRoutes);
app.use('/api/offers', offersRoutes);
app.use('/api/applications', applicationsRoutes);

/* =======================
   TEST ROUTE
======================= */

app.get('/', (req, res) => {
  res.send('Christ Recruiter Portal API is running 🚀');
});

/* =======================
   START SERVER
======================= */

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

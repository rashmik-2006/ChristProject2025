const express = require('express');
const router = express.Router();

// 👇 THIS WAS MISSING OR WRONG
const authController = require('../controllers/authController');

router.post('/signup', authController.signup);
router.post('/verify-otp', authController.verifyOTP);
router.post('/login', authController.login);

// New Password Routes
router.post('/forgot-password', authController.forgotPassword);
router.post('/reset-password', authController.resetPassword);

module.exports = router;
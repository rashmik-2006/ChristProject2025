const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/sendEmail");
const prisma = require("../prisma/client");

const JWT_SECRET = process.env.JWT_SECRET || "super_secret_key_123";


// 1️⃣ SIGNUP & SEND OTP
exports.signup = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      role,
      company_name,
      company_website,
      industry,
      company_size,
      location,
      phone,
    } = req.body;

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser && existingUser.is_verified) {
      return res.status(400).json({ error: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otp_expiry = new Date(Date.now() + 10 * 60 * 1000);

    await prisma.user.upsert({
      where: { email },
      update: {
        name,
        password: hashedPassword,
        role,
        otp,
        otp_expiry,
        company_name,
        company_website,
        industry,
        company_size,
        location,
        phone,
      },
      create: {
        name,
        email,
        password: hashedPassword,
        role,
        otp,
        otp_expiry,
        is_verified: false,
        company_name,
        company_website,
        industry,
        company_size,
        location,
        phone,
      },
    });

    await sendEmail(
      email,
      "Your Verification OTP",
      `Your OTP for Christ Portal is: ${otp}`
    );

    res.status(200).json({ message: "OTP sent to email" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error creating user" });
  }
};


// 2️⃣ VERIFY OTP
exports.verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (
      !user ||
      user.otp !== otp ||
      new Date() > new Date(user.otp_expiry)
    ) {
      return res.status(400).json({ error: "Invalid or expired OTP" });
    }

    await prisma.user.update({
      where: { email },
      data: {
        is_verified: true,
        otp: null,
        otp_expiry: null,
      },
    });

    const token = jwt.sign(
      {
        id: user.id,
        role: user.role,
        name: user.name,
        email: user.email,
        company_name: user.company_name,
        phone: user.phone,
        location: user.location,
        company_website: user.company_website,
      },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      message: "Verified successfully",
      token,
      role: user.role,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Verification failed" });
  }
};


// 3️⃣ LOGIN
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user || !user.is_verified) {
      return res
        .status(400)
        .json({ error: "User not found or not verified" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign(
      {
        id: user.id,
        role: user.role,
        name: user.name,
        email: user.email,
        company_name: user.company_name,
        phone: user.phone,
        location: user.location,
        company_website: user.company_website,
      },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      token,
      role: user.role,
      name: user.name,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Login failed" });
  }
};


// 4️⃣ FORGOT PASSWORD
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otp_expiry = new Date(Date.now() + 10 * 60 * 1000);

    await prisma.user.update({
      where: { email },
      data: { otp, otp_expiry },
    });

    await sendEmail(
      email,
      "Reset Your Password",
      `Your Password Reset OTP is: ${otp}`
    );

    res.json({ message: "OTP sent to email" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error processing request" });
  }
};


// 5️⃣ RESET PASSWORD
exports.resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (
      !user ||
      user.otp !== otp ||
      new Date() > new Date(user.otp_expiry)
    ) {
      return res.status(400).json({ error: "Invalid or expired OTP" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await prisma.user.update({
      where: { email },
      data: {
        password: hashedPassword,
        otp: null,
        otp_expiry: null,
      },
    });

    res.json({ message: "Password reset successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error resetting password" });
  }
};

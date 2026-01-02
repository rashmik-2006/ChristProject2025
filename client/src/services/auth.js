// src/services/auth.js
import { api } from "./api";
import { jwtDecode } from "jwt-decode";

// ---------------- LOGIN ----------------
export const loginUser = async (email, password) => {
  const response = await api.post("/auth/login", { email, password });

  if (response?.data?.token) {
    localStorage.setItem("token", response.data.token);
    localStorage.setItem(
      "user",
      JSON.stringify(jwtDecode(response.data.token))
    );
  }

  return response.data;
};

// ---------------- SIGNUP ----------------
export const signupUser = async (userData) => {
  const response = await api.post("/auth/signup", userData);
  return response.data;
};

// ---------------- VERIFY OTP ----------------
export const verifyOTP = async (email, otp) => {
  const response = await api.post("/auth/verify-otp", { email, otp });

  if (response?.data?.token) {
    localStorage.setItem("token", response.data.token);
    localStorage.setItem(
      "user",
      JSON.stringify(jwtDecode(response.data.token))
    );
  }

  return response.data;
};

// ---------------- LOGOUT ----------------
export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  window.location.replace("/login");
};

// ---------------- CURRENT USER ----------------
export const getCurrentUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

// ---------------- PASSWORD RESET ----------------
export const requestPasswordReset = async (email) => {
  const response = await api.post("/auth/forgot-password", { email });
  return response.data;
};

export const resetPassword = async (email, otp, newPassword) => {
  const response = await api.post("/auth/reset-password", {
    email,
    otp,
    newPassword,
  });
  return response.data;
};

import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

// Axios instance
export const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach token automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

/* =========================
   AUTH APIs
========================= */

export const loginUser = (data) =>
  api.post("/auth/login", data);

export const signupUser = (data) =>
  api.post("/auth/signup", data);

export const verifyOTP = (data) =>
  api.post("/auth/verify-otp", data);

export const forgotPassword = (data) =>
  api.post("/auth/forgot-password", data);

export const resetPassword = (data) =>
  api.post("/auth/reset-password", data);

/* =========================
   OFFERS APIs
========================= */

// GET all offers
export const getOffers = () =>
  api.get("/offers");

// CREATE offer
export const createOffer = (data) =>
  api.post("/offers", data);

// GET offer by ID
export const getOfferById = (id) =>
  api.get(`/offers/${id}`);

// GET applications for an offer
export const getApplicationsByOffer = (offerId) =>
  api.get(`/offers/${offerId}/applications`);

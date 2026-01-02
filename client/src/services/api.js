// src/services/api.js
import axios from "axios";

// Base API URL (Render backend)
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// Axios instance
export const api = axios.create({
  baseURL: API_URL,
  withCredentials: false,
});

// Attach JWT token if exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ------------------ OFFERS ------------------
export const getOffers = () => api.get("/offers");

export const getOfferById = (id) => api.get(`/offers/${id}`);

export const createOffer = (data) => api.post("/offers", data);

// ------------------ APPLICATIONS ------------------
export const createApplication = (data) =>
  api.post("/applications", data);

export const getApplicationsByOffer = (offerId) =>
  api.get(`/applications/offer/${offerId}`);

// Default export (optional but safe)
export default api;

// src/services/api.js
import axios from 'axios';

// Backend base URL
// Netlify env: VITE_API_URL=https://christproject2025-wj51.onrender.com/api
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Attach JWT token if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ------------------ AUTH APIs ------------------

// Signup
export const signup = (data) => api.post('/auth/signup', data);

// Login
export const login = (data) => api.post('/auth/login', data);

// ------------------ OFFERS APIs ------------------

export const getOffers = () => api.get('/offers');
export const getOfferById = (id) => api.get(`/offers/${id}`);
export const createOffer = (data) => api.post('/offers', data);

// ------------------ APPLICATION APIs ------------------

export const createApplication = (data) => api.post('/applications', data);
export const getApplicationsByOffer = (offerId) =>
  api.get(`/applications/offer/${offerId}`);

// Export axios instance
export default api;

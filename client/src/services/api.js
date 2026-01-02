// src/services/api.js
import axios from 'axios';

// Use environment variable VITE_API_URL set in Netlify (or fallback to localhost for local dev)
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create axios instance
export const api = axios.create({
  baseURL: API_URL,
});

// Add auth token to every request if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // Assuming JWT stored in localStorage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ------------------ API ENDPOINT FUNCTIONS ------------------

// Offers
export const getOffers = () => api.get('/offers');
export const getOfferById = (id) => api.get(`/offers/${id}`);
export const createOffer = (data) => api.post('/offers', data);

// Applications
export const createApplication = (data) => api.post('/applications', data);
export const getApplicationsByOffer = (offerId) => api.get(`/applications/offer/${offerId}`);

// Export the axios instance
export default api;

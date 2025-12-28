import { api } from './api';
import { jwtDecode } from 'jwt-decode';

export const loginUser = async (email, password) => {
  const response = await api.post('/auth/login', { email, password });
  if (response.data.token) {
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('user', JSON.stringify(jwtDecode(response.data.token)));
  }
  return response.data;
};

export const signupUser = async (userData) => {
  return await api.post('/auth/signup', userData);
};

export const verifyOTP = async (email, otp) => {
  const response = await api.post('/auth/verify-otp', { email, otp });
  if (response.data.token) {
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('user', JSON.stringify(jwtDecode(response.data.token)));
  }
  return response.data;
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  window.location.href = '/login';
};

export const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('user'));
};

export const requestPasswordReset = async (email) => {
  return await api.post('/auth/forgot-password', { email });
};

export const resetPassword = async (email, otp, newPassword) => {
  return await api.post('/auth/reset-password', { email, otp, newPassword });
};
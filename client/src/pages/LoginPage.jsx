import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../services/auth';
import { Lock, Mail } from 'lucide-react';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // Store error here
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors
    try {
      await loginUser(email, password);
      navigate('/'); 
    } catch (err) {
      // Show error in red box instead of alert
      setError(err.response?.data?.error || 'Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md w-96">
        <h2 className="text-2xl font-bold text-center text-christ-navy mb-6">Christ Portal Login</h2>
        
        {/* 🔴 INLINE ERROR MESSAGE */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 text-sm p-3 rounded-lg mb-4 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="relative">
            <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
            <input 
              type="email" placeholder="Email Address" required
              className="w-full pl-10 p-3 border rounded-lg focus:border-christ-blue outline-none"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-3 text-gray-400" size={20} />
            <input 
              type="password" placeholder="Password" required
              className="w-full pl-10 p-3 border rounded-lg focus:border-christ-blue outline-none"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          
          {/* Forgot Password Link */}
          <div className="text-right">
            <Link to="/forgot-password" className="text-xs text-christ-blue hover:underline">
              Forgot Password?
            </Link>
          </div>

          <button className="w-full bg-christ-navy text-white py-3 rounded-lg font-bold hover:bg-opacity-90">
            Login
          </button>
        </form>
        <p className="text-center mt-4 text-sm text-gray-600">
          New User? <Link to="/signup" className="text-christ-blue font-bold">Create Account</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
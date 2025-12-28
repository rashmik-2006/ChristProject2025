import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { requestPasswordReset, resetPassword } from '../services/auth';
import { KeyRound, Mail, ArrowRight } from 'lucide-react';

const ForgotPasswordPage = () => {
  const [step, setStep] = useState(1); // Step 1: Email, Step 2: OTP & New Pass
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState(''); // Inline error state
  const [message, setMessage] = useState(''); // Success message
  const navigate = useNavigate();

  const handleSendOTP = async (e) => {
    e.preventDefault();
    setError(''); setMessage('');
    try {
      await requestPasswordReset(email);
      setStep(2);
      setMessage(`OTP sent to ${email}`);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to send OTP");
    }
  };

  const handleReset = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await resetPassword(email, otp, newPassword);
      alert("Password Reset Successful! Please login.");
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.error || "Failed to reset password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md w-96">
        <h2 className="text-2xl font-bold text-center text-christ-navy mb-2">Reset Password</h2>
        
        {/* INLINE ERROR / SUCCESS MESSAGES */}
        {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-sm text-center">{error}</div>}
        {message && <div className="bg-green-100 text-green-700 p-3 rounded mb-4 text-sm text-center">{message}</div>}

        {step === 1 ? (
          <form onSubmit={handleSendOTP} className="space-y-4">
            <p className="text-gray-500 text-sm text-center mb-4">Enter your registered email to receive an OTP.</p>
            <div className="relative">
              <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
              <input 
                type="email" placeholder="Email Address" required
                className="w-full pl-10 p-3 border rounded-lg focus:ring-2 focus:ring-christ-blue outline-none"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <button className="w-full bg-christ-navy text-white py-3 rounded-lg font-bold hover:bg-opacity-90 flex items-center justify-center gap-2">
              Send OTP <ArrowRight size={18} />
            </button>
          </form>
        ) : (
          <form onSubmit={handleReset} className="space-y-4">
            <input 
              placeholder="Enter 6-digit OTP" required
              className="w-full p-3 border rounded-lg text-center tracking-widest font-bold"
              onChange={(e) => setOtp(e.target.value)}
            />
            <div className="relative">
              <KeyRound className="absolute left-3 top-3 text-gray-400" size={20} />
              <input 
                type="password" placeholder="New Password" required
                className="w-full pl-10 p-3 border rounded-lg"
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <button className="w-full bg-green-600 text-white py-3 rounded-lg font-bold hover:bg-green-700">
              Change Password
            </button>
          </form>
        )}
        
        <button onClick={() => navigate('/login')} className="w-full text-center mt-6 text-sm text-gray-500 hover:text-christ-navy">
          Back to Login
        </button>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
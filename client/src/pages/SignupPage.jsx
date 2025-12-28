import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signupUser, verifyOTP } from '../services/auth';

const SignupPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [otp, setOtp] = useState('');
  
  // State for all the new fields
  const [formData, setFormData] = useState({ 
    company_name: '', email: '', company_website: '', industry: '', 
    company_size: '', location: '', name: '', phone: '',
    password: '', confirm_password: '', role: 'recruiter' 
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirm_password) {
      return alert("Passwords do not match!");
    }
    try {
      await signupUser(formData);
      setStep(2);
      alert("OTP sent to your email!");
    } catch (error) {
      alert("Error: " + (error.response?.data?.error || "Signup Failed"));
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    try {
      await verifyOTP(formData.email, otp);
      navigate('/'); 
    } catch (error) {
      alert("Invalid OTP!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-10">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-2xl">
        <h2 className="text-3xl font-bold text-christ-navy mb-2">Create a Company Account</h2>
        <p className="text-gray-500 mb-8">Fill out the form below to register your company.</p>

        {step === 1 ? (
          <form onSubmit={handleSignup} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Row 1 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
              <input name="company_name" onChange={handleChange} required className="w-full p-3 bg-blue-50 border-none rounded-lg" placeholder="e.g. Christ University" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Official Company Email</label>
              <input name="email" type="email" onChange={handleChange} required className="w-full p-3 bg-blue-50 border-none rounded-lg" placeholder="e.g. rahul@company.com" />
            </div>

            {/* Row 2 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Company Website</label>
              <input name="company_website" onChange={handleChange} className="w-full p-3 bg-blue-50 border-none rounded-lg" placeholder="https://..." />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Industry / Domain</label>
              <input name="industry" onChange={handleChange} className="w-full p-3 bg-blue-50 border-none rounded-lg" placeholder="e.g. Education, IT" />
            </div>

            {/* Row 3 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Company Size</label>
              <select name="company_size" onChange={handleChange} className="w-full p-3 bg-blue-50 border-none rounded-lg">
                <option value="">Select Size</option>
                <option>1-50</option>
                <option>50-200</option>
                <option>200-1000</option>
                <option>1000+</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Company Location</label>
              <input name="location" onChange={handleChange} required className="w-full p-3 bg-blue-50 border-none rounded-lg" placeholder="e.g. Bangalore" />
            </div>

            {/* Row 4 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">HR / Recruiter Name</label>
              <input name="name" onChange={handleChange} required className="w-full p-3 bg-blue-50 border-none rounded-lg" placeholder="Your Full Name" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <input name="phone" onChange={handleChange} required className="w-full p-3 bg-blue-50 border-none rounded-lg" placeholder="+91..." />
            </div>

            {/* Row 5 - Passwords */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input name="password" type="password" onChange={handleChange} required className="w-full p-3 bg-blue-50 border-none rounded-lg" placeholder="••••••••" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
              <input name="confirm_password" type="password" onChange={handleChange} required className="w-full p-3 bg-blue-50 border-none rounded-lg" placeholder="••••••••" />
            </div>

            <button className="col-span-full bg-christ-navy text-white py-4 rounded-lg font-bold hover:bg-opacity-90 mt-4">
              Register
            </button>
            
            <p className="col-span-full text-center text-sm text-gray-600">
              Already have an account? <Link to="/login" className="text-christ-navy font-bold">Log in</Link>
            </p>
          </form>
        ) : (
          <form onSubmit={handleVerify} className="space-y-6">
            <div className="text-center">
              <h3 className="text-xl font-bold mb-2">Verify Your Email</h3>
              <p className="text-gray-500 text-sm">We sent a 6-digit code to {formData.email}</p>
            </div>
            <input 
              placeholder="Enter 6-digit OTP" 
              required 
              className="w-full p-4 bg-gray-50 border border-gray-200 rounded-lg text-center text-2xl tracking-[0.5em] font-bold" 
              onChange={(e) => setOtp(e.target.value)} 
              maxLength={6}
            />
            <button className="w-full bg-green-600 text-white py-4 rounded-lg font-bold hover:bg-green-700">
              Verify & Login
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default SignupPage;
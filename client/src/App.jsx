import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import { LayoutDashboard, PlusCircle, LogOut } from 'lucide-react';
import OffersPage from './pages/OffersPage';
import CreateOfferPage from './pages/CreateOfferPage';
import OfferDetailsPage from './pages/OfferDetailsPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import { logout } from './services/auth';
import ProfilePage from './pages/ProfilePage';
import { User } from 'lucide-react'; // Add User icon
import ForgotPasswordPage from './pages/ForgotPasswordPage';
// 1. The Layout Component (Decides if Sidebar should show)
const Layout = ({ children }) => {
  const location = useLocation();
  // Hide sidebar on login and signup pages
const isAuthPage = ['/login', '/signup', '/forgot-password'].includes(location.pathname);
  
  const isActive = (path) => location.pathname === path 
    ? "bg-christ-blue text-white" 
    : "text-gray-300 hover:bg-christ-blue hover:text-white";

  // If we are logging in, just show the login box (Full Screen)
  if (isAuthPage) {
    return <div className="min-h-screen bg-gray-100">{children}</div>;
  }

  // Otherwise, show the Sidebar + The Page
  return (
    <div className="flex bg-gray-100 min-h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-christ-navy min-h-screen text-white fixed left-0 top-0 flex flex-col justify-between">
        <div>
          <div className="p-6 border-b border-gray-700">
            <h1 className="text-xl font-bold text-christ-gold">Christ University</h1>
            <p className="text-xs text-gray-400 mt-1">Recruiter Portal</p>
          </div>
          <nav className="mt-6 px-4 space-y-2">
            <Link to="/" className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive('/')}`}>
              <LayoutDashboard size={20} />
              <span>Dashboard</span>
            </Link>
            <Link to="/create-offer" className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive('/create-offer')}`}>
              <PlusCircle size={20} />
              <span>Post New Offer</span>
            </Link>
            <Link to="/profile" className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive('/profile')}`}>
  <User size={20} />
  <span>Company Profile</span>
</Link>
          </nav>
        </div>
        
        {/* New Logout Button */}
        <div className="p-4 border-t border-gray-700">
          <button onClick={logout} className="flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-900/20 w-full rounded-lg transition-colors">
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-64 flex-1 p-8">
        {children}
      </div>
    </div>
  );
};

// 2. Security Guard (Redirects to Login if no token found)
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  if (!token) return <Navigate to="/login" />;
  return children;
};

// 3. Main Router
const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          {/* Public Routes (Anyone can see) */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />

          {/* Protected Routes (Must be Logged In) */}
          <Route path="/" element={<ProtectedRoute><OffersPage /></ProtectedRoute>} />
          <Route path="/create-offer" element={<ProtectedRoute><CreateOfferPage /></ProtectedRoute>} />
          <Route path="/offer/:id" element={<ProtectedRoute><OfferDetailsPage /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
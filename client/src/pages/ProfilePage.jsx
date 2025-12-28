import React from 'react';
import { getCurrentUser } from '../services/auth';
import { User, Building, Phone, MapPin, Globe } from 'lucide-react';

const ProfilePage = () => {
  const user = getCurrentUser(); // Get user from local storage

  // Note: For a real app, you might want to fetch the latest data from the API
  // but for now, we will display what we have or a placeholder.
  
  if (!user) return <div className="p-8">Please log in.</div>;

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-christ-navy mb-6">Company Profile</h1>
      
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="bg-christ-navy h-32 w-full relative">
          <div className="absolute -bottom-12 left-8">
            <div className="bg-white p-2 rounded-full shadow-md">
              <div className="bg-gray-200 rounded-full h-24 w-24 flex items-center justify-center text-3xl font-bold text-gray-500">
                {user.name ? user.name.charAt(0) : "U"}
              </div>
            </div>
          </div>
        </div>
        
        <div className="pt-16 pb-8 px-8">
          <h2 className="text-2xl font-bold text-gray-900">{user.name}</h2>
          <p className="text-gray-500">{user.role === 'recruiter' ? 'Recruiter' : 'Student'}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            <div className="space-y-4">
              <h3 className="font-bold text-gray-900 border-b pb-2">Contact Info</h3>
              <div className="flex items-center gap-3 text-gray-600">
                <User size={18} /> <span>{user.name}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <Phone size={18} /> <span>{user.phone || "No phone added"}</span>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-bold text-gray-900 border-b pb-2">Company Details</h3>
               {/* NOTE: By default, the JWT token might not have all these extra fields 
                  unless we update the login controller to send them.
                  For now, this will show placeholders if the data isn't in the token.
               */}
              <div className="flex items-center gap-3 text-gray-600">
                <Building size={18} /> <span>{user.company_name || "Company Name"}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <MapPin size={18} /> <span>{user.location || "Location"}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <Globe size={18} /> <span>{user.company_website || "Website"}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
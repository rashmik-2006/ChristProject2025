import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getOffers } from '../services/api';
import { Building2, MapPin, Calendar, Users } from 'lucide-react';

const OffersPage = () => {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOffers();
  }, []);

  const loadOffers = async () => {
    try {
      const response = await getOffers();
      setOffers(response.data);
    } catch (error) {
      console.error('Error loading offers:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-christ-navy">Internship Offers</h2>
        <Link to="/create-offer" className="bg-christ-gold text-christ-navy px-4 py-2 rounded-lg font-semibold hover:bg-yellow-500">
          + Post New Offer
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {offers.map((offer) => (
          <Link key={offer.id} to={`/offer/${offer.id}`} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100">
            <div className="flex justify-between items-start mb-4">
              <div className="bg-blue-50 p-3 rounded-lg">
                <Building2 className="text-christ-blue" size={24} />
              </div>
              <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">Active</span>
            </div>
            
            <h3 className="font-bold text-lg text-gray-800 mb-1">{offer.title}</h3>
            <p className="text-gray-500 text-sm mb-4">{offer.company_name}</p>
            
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <MapPin size={16} />
                <span>{offer.location} ({offer.work_mode})</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={16} />
                <span>{new Date(offer.joining_date).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-2 text-christ-blue font-medium mt-3 pt-3 border-t border-gray-100">
                <Users size={16} />
                <span>{offer._count?.applications || 0} Applicants</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default OffersPage;

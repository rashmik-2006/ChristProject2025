import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getOfferById, getApplicationsByOffer } from '../services/api';

const OfferDetailsPage = () => {
  const { id } = useParams();
  const [offer, setOffer] = useState(null);
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const offerRes = await getOfferById(id);
        setOffer(offerRes.data);
        const appsRes = await getApplicationsByOffer(id);
        setApplications(appsRes.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [id]);

  if (!offer) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="bg-white p-8 rounded-xl shadow-sm">
        <h1 className="text-3xl font-bold text-christ-navy mb-2">{offer.title}</h1>
        <p className="text-xl text-gray-600 mb-6">{offer.company_name}</p>
        
        <div className="grid grid-cols-3 gap-6 text-sm">
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-gray-500">Stipend</p>
            <p className="font-semibold">{offer.stipend}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-gray-500">Location</p>
            <p className="font-semibold">{offer.location}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-gray-500">Duration</p>
            <p className="font-semibold">{offer.duration || 'N/A'}</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-8 rounded-xl shadow-sm">
        <h3 className="text-xl font-bold text-christ-navy mb-4">Applicants ({applications.length})</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b bg-gray-50">
                <th className="p-4 font-semibold text-gray-600">Student Name</th>
                <th className="p-4 font-semibold text-gray-600">Course</th>
                <th className="p-4 font-semibold text-gray-600">GPA</th>
                <th className="p-4 font-semibold text-gray-600">Resume</th>
                <th className="p-4 font-semibold text-gray-600">Status</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app) => (
                <tr key={app.id} className="border-b hover:bg-gray-50">
                  <td className="p-4">{app.student_name}</td>
                  <td className="p-4">{app.course}</td>
                  <td className="p-4">{app.gpa}</td>
                  <td className="p-4"><a href={app.resume_url} className="text-blue-600 hover:underline">View</a></td>
                  <td className="p-4"><span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs">{app.status}</span></td>
                </tr>
              ))}
              {applications.length === 0 && (
                <tr><td colSpan="5" className="p-8 text-center text-gray-400">No applicants yet.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OfferDetailsPage;
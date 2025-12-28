import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createOffer } from '../services/api';

const CreateOfferPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    company_name: '', sector: '', address: '', contact_info: '', email: '', hr_contact: '',
    title: '', description: '', required_skills: '', duration: '', work_mode: 'On-site',
    location: '', application_date: '', joining_date: '', completion_date: '',
    remuneration: '', stipend: '', eligible_for_credits: false
  });

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createOffer(formData);
      navigate('/');
    } catch (error) {
      alert('Error creating offer');
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm p-8">
      <h2 className="text-2xl font-bold text-christ-navy mb-6">Post New Internship Offer</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Company Details */}
        <div className="col-span-full border-b pb-2 mb-2"><h3 className="font-semibold text-gray-500">Company Details</h3></div>
        <input name="company_name" placeholder="Company Name" onChange={handleChange} required className="p-3 border rounded-lg" />
        <input name="sector" placeholder="Sector (e.g. IT, Finance)" onChange={handleChange} required className="p-3 border rounded-lg" />
        <input name="email" type="email" placeholder="Official Email" onChange={handleChange} required className="p-3 border rounded-lg" />
        <input name="hr_contact" placeholder="HR Contact Name" onChange={handleChange} required className="p-3 border rounded-lg" />
        
        {/* Internship Details */}
        <div className="col-span-full border-b pb-2 mb-2 mt-4"><h3 className="font-semibold text-gray-500">Internship Details</h3></div>
        <input name="title" placeholder="Internship Title (e.g. Data Analyst)" onChange={handleChange} required className="p-3 border rounded-lg" />
        <select name="work_mode" onChange={handleChange} className="p-3 border rounded-lg">
          <option>On-site</option>
          <option>Remote</option>
          <option>Hybrid</option>
        </select>
        <input name="location" placeholder="Location (City)" onChange={handleChange} required className="p-3 border rounded-lg" />
        <input name="stipend" placeholder="Stipend Amount" onChange={handleChange} required className="p-3 border rounded-lg" />
        
        <div className="col-span-full">
          <textarea name="description" placeholder="Job Description" onChange={handleChange} required className="w-full p-3 border rounded-lg h-32"></textarea>
        </div>

        {/* Dates */}
        <div className="col-span-full border-b pb-2 mb-2 mt-4"><h3 className="font-semibold text-gray-500">Important Dates</h3></div>
        <div><label className="text-xs text-gray-500">Application Deadline</label><input type="date" name="application_date" onChange={handleChange} required className="w-full p-3 border rounded-lg" /></div>
        <div><label className="text-xs text-gray-500">Joining Date</label><input type="date" name="joining_date" onChange={handleChange} required className="w-full p-3 border rounded-lg" /></div>
        <div><label className="text-xs text-gray-500">Completion Date</label><input type="date" name="completion_date" onChange={handleChange} required className="w-full p-3 border rounded-lg" /></div>

        <button type="submit" className="col-span-full bg-christ-navy text-white py-3 rounded-lg font-bold hover:bg-opacity-90 mt-4">
          Publish Offer
        </button>
      </form>
    </div>
  );
};

export default CreateOfferPage;
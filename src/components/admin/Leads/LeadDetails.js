import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaEnvelope, FaPhone, FaCalendar, FaCar } from 'react-icons/fa';
import LeadStatusBadge from './LeadStatusBadge';
import LoadingSpinner from '../../common/LoadingSpinner';

const LeadDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [lead, setLead] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setLead({
        id: parseInt(id),
        name: 'John Doe',
        email: 'john@example.com',
        phone: '+1 (555) 123-4567',
        carInterest: 'BMW X5',
        status: 'New',
        message: 'Interested in a test drive for the BMW X5. I saw it online and would love to see it in person. Please let me know available times.',
        createdAt: '2026-06-26T10:00:00',
        notes: [
          { id: 1, text: 'Called customer, left voicemail', date: '2026-06-26T11:30:00' },
          { id: 2, text: 'Sent email with car details', date: '2026-06-26T12:00:00' }
        ]
      });
      setLoading(false);
    }, 1000);
  }, [id]);

  if (loading) return <LoadingSpinner />;
  if (!lead) return <div>Lead not found</div>;

  return (
    <div className="max-w-4xl mx-auto">
      <button
        onClick={() => navigate('/admin/leads')}
        className="flex items-center text-blue-600 hover:underline mb-6"
      >
        <FaArrowLeft className="mr-2" /> Back to Leads
      </button>

      <div className="bg-white rounded-xl shadow p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">{lead.name}</h1>
            <p className="text-gray-500">Lead #{lead.id}</p>
          </div>
          <div className="mt-3 sm:mt-0">
            <LeadStatusBadge status={lead.status} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="space-y-3">
            <div className="flex items-center">
              <FaEnvelope className="text-gray-400 w-5 mr-3" />
              <span>{lead.email}</span>
            </div>
            <div className="flex items-center">
              <FaPhone className="text-gray-400 w-5 mr-3" />
              <span>{lead.phone}</span>
            </div>
            <div className="flex items-center">
              <FaCalendar className="text-gray-400 w-5 mr-3" />
              <span>{new Date(lead.createdAt).toLocaleString()}</span>
            </div>
            <div className="flex items-center">
              <FaCar className="text-gray-400 w-5 mr-3" />
              <span>Interested in: <strong>{lead.carInterest}</strong></span>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-2">Message</h3>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-gray-700">{lead.message}</p>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3">Notes & Activity</h3>
          <div className="space-y-3">
            {lead.notes.map((note) => (
              <div key={note.id} className="bg-gray-50 rounded-lg p-3">
                <p className="text-gray-700">{note.text}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {new Date(note.date).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeadDetails;
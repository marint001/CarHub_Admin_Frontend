import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  FaArrowLeft, 
  FaEnvelope, 
  FaPhone, 
  FaCalendar, 
  FaCar,
  FaUser,
  FaClock,
  FaComment,
  FaEdit,
  FaSave,
  FaTimes
} from 'react-icons/fa';
import LeadStatusBadge from './LeadStatusBadge';
import LoadingSpinner from '../../common/LoadingSpinner';
import { toast } from 'react-toastify';

const LeadDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [lead, setLead] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [status, setStatus] = useState('');
  const [note, setNote] = useState('');

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
        message: 'Interested in a test drive for the BMW X5. I saw it online and would love to see it in person. Please let me know available times for this weekend if possible.',
        createdAt: '2026-06-26T10:00:00',
        notes: [
          { id: 1, text: 'Initial inquiry received', date: '2026-06-26T10:00:00' },
          { id: 2, text: 'Called customer, left voicemail', date: '2026-06-26T11:30:00' },
          { id: 3, text: 'Sent email with car details and available test drive slots', date: '2026-06-26T12:00:00' }
        ]
      });
      setStatus('New');
      setLoading(false);
    }, 1000);
  }, [id]);

  const handleStatusUpdate = () => {
    setLead({ ...lead, status });
    toast.success(`Status updated to ${status}`);
    setEditing(false);
  };

  const handleAddNote = () => {
    if (!note.trim()) return;
    const newNote = {
      id: Date.now(),
      text: note,
      date: new Date().toISOString()
    };
    setLead({ ...lead, notes: [...lead.notes, newNote] });
    setNote('');
    toast.success('Note added successfully');
  };

  if (loading) return <LoadingSpinner />;
  if (!lead) return <div className="empty-state">Lead not found</div>;

  return (
    <div className="lead-detail-container animate-fade-in">
      {/* Header */}
      <div className="lead-detail-header">
        <button
          onClick={() => navigate('/admin/leads')}
          className="btn-back"
        >
          <FaArrowLeft /> Back to Leads
        </button>
        <div className="lead-detail-actions">
          <button 
            className="btn btn-secondary"
            onClick={() => setEditing(!editing)}
          >
            <FaEdit /> Update Status
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="lead-detail-grid">
        {/* Left Column */}
        <div className="lead-detail-main">
          {/* Customer Info */}
          <div className="detail-card">
            <div className="card-title">
              <FaUser className="card-icon" /> Customer Information
            </div>
            <div className="detail-row">
              <div className="detail-label">Name</div>
              <div className="detail-value">{lead.name}</div>
            </div>
            <div className="detail-row">
              <div className="detail-label">Email</div>
              <div className="detail-value">
                <FaEnvelope className="detail-icon" /> {lead.email}
              </div>
            </div>
            <div className="detail-row">
              <div className="detail-label">Phone</div>
              <div className="detail-value">
                <FaPhone className="detail-icon" /> {lead.phone}
              </div>
            </div>
            <div className="detail-row">
              <div className="detail-label">Car Interest</div>
              <div className="detail-value">
                <FaCar className="detail-icon" /> {lead.carInterest}
              </div>
            </div>
            <div className="detail-row">
              <div className="detail-label">Status</div>
              <div className="detail-value">
                <LeadStatusBadge status={lead.status} />
              </div>
            </div>
            <div className="detail-row">
              <div className="detail-label">Received</div>
              <div className="detail-value">
                <FaCalendar className="detail-icon" /> 
                {new Date(lead.createdAt).toLocaleString('en-US', {
                  dateStyle: 'full',
                  timeStyle: 'short'
                })}
              </div>
            </div>
          </div>

          {/* Message */}
          <div className="detail-card">
            <div className="card-title">
              <FaComment className="card-icon" /> Message
            </div>
            <div className="message-content">
              {lead.message}
            </div>
          </div>

          {/* Notes */}
          <div className="detail-card">
            <div className="card-title">
              <FaClock className="card-icon" /> Notes & Activity
            </div>
            <div className="notes-list">
              {lead.notes.map((note) => (
                <div key={note.id} className="note-item">
                  <div className="note-text">{note.text}</div>
                  <div className="note-date">
                    <FaCalendar /> {new Date(note.date).toLocaleString('en-US', {
                      dateStyle: 'medium',
                      timeStyle: 'short'
                    })}
                  </div>
                </div>
              ))}
            </div>
            <div className="note-input">
              <input
                type="text"
                placeholder="Add a note..."
                value={note}
                onChange={(e) => setNote(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') handleAddNote();
                }}
              />
              <button onClick={handleAddNote} className="btn btn-primary btn-sm">
                Add Note
              </button>
            </div>
          </div>
        </div>

        {/* Right Column - Status Update */}
        <div className="lead-detail-sidebar">
          <div className="detail-card">
            <div className="card-title">
              <FaEdit className="card-icon" /> Update Status
            </div>
            {editing ? (
              <div className="status-update">
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="status-select"
                >
                  <option value="New">New</option>
                  <option value="Contacted">Contacted</option>
                  <option value="Test Drive">Test Drive</option>
                  <option value="Negotiation">Negotiation</option>
                  <option value="Sold">Sold</option>
                </select>
                <div className="status-actions">
                  <button 
                    className="btn btn-primary btn-sm"
                    onClick={handleStatusUpdate}
                  >
                    <FaSave /> Save
                  </button>
                  <button 
                    className="btn btn-secondary btn-sm"
                    onClick={() => {
                      setEditing(false);
                      setStatus(lead.status);
                    }}
                  >
                    <FaTimes /> Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="status-display">
                <LeadStatusBadge status={lead.status} size="large" />
                <button 
                  className="btn btn-secondary btn-sm"
                  onClick={() => setEditing(true)}
                >
                  <FaEdit /> Change Status
                </button>
              </div>
            )}
          </div>

          {/* Quick Stats */}
          <div className="detail-card">
            <div className="card-title">
              <FaClock className="card-icon" /> Quick Stats
            </div>
            <div className="quick-stats">
              <div className="stat-item">
                <span className="stat-label">Total Notes</span>
                <span className="stat-value">{lead.notes.length}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Lead Age</span>
                <span className="stat-value">
                  {Math.floor((Date.now() - new Date(lead.createdAt).getTime()) / (1000 * 60 * 60 * 24))} days
                </span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Last Activity</span>
                <span className="stat-value">
                  {lead.notes.length > 0 
                    ? new Date(lead.notes[lead.notes.length - 1].date).toLocaleDateString()
                    : 'No activity'
                  }
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeadDetails;
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaEye, 
  FaEnvelope, 
  FaPhone, 
  FaCalendar, 
  FaSearch,
  FaFilter,
  FaUsers,
  FaUserCheck,
  FaClock,
  FaTimes,
  FaUserPlus
} from 'react-icons/fa';
import LeadStatusBadge from './LeadStatusBadge';
import LoadingSpinner from '../../common/LoadingSpinner';

const LeadList = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ status: '', search: '' });
  const [selectedLead, setSelectedLead] = useState(null);

  useEffect(() => {
    // Simulate API call with sample data
    setTimeout(() => {
      setLeads([
        {
          id: 1,
          name: 'John Doe',
          email: 'john@example.com',
          phone: '+1 (555) 123-4567',
          carInterest: 'BMW X5',
          status: 'New',
          message: 'Interested in a test drive for the BMW X5. I saw it online and would love to see it in person.',
          createdAt: '2026-06-26T10:00:00',
          notes: [
            { id: 1, text: 'Initial inquiry received', date: '2026-06-26T10:00:00' }
          ]
        },
        {
          id: 2,
          name: 'Jane Smith',
          email: 'jane@example.com',
          phone: '+1 (555) 987-6543',
          carInterest: 'Toyota Camry',
          status: 'Contacted',
          message: 'Please send more details about the Camry. Interested in financing options as well.',
          createdAt: '2026-06-25T15:30:00',
          notes: [
            { id: 1, text: 'Called customer, left voicemail', date: '2026-06-25T16:00:00' },
            { id: 2, text: 'Sent email with car details', date: '2026-06-25T17:30:00' }
          ]
        },
        {
          id: 3,
          name: 'Robert Johnson',
          email: 'robert@example.com',
          phone: '+1 (555) 456-7890',
          carInterest: 'Mercedes E-Class',
          status: 'Test Drive',
          message: 'Ready to buy after test drive. Looking for premium package.',
          createdAt: '2026-06-24T09:15:00',
          notes: [
            { id: 1, text: 'Test drive scheduled for June 28th', date: '2026-06-24T10:00:00' }
          ]
        },
        {
          id: 4,
          name: 'Sarah Williams',
          email: 'sarah@example.com',
          phone: '+1 (555) 234-5678',
          carInterest: 'Audi Q7',
          status: 'Negotiation',
          message: 'Interested in the Q7. Looking for best price with trade-in.',
          createdAt: '2026-06-23T14:20:00',
          notes: [
            { id: 1, text: 'Discussed pricing and trade-in options', date: '2026-06-23T15:00:00' },
            { id: 2, text: 'Sent quote via email', date: '2026-06-23T16:30:00' }
          ]
        },
        {
          id: 5,
          name: 'Michael Brown',
          email: 'michael@example.com',
          phone: '+1 (555) 345-6789',
          carInterest: 'Honda Civic',
          status: 'Sold',
          message: 'Purchased the Civic. Very happy with the deal!',
          createdAt: '2026-06-22T11:45:00',
          notes: [
            { id: 1, text: 'Sale completed', date: '2026-06-22T14:00:00' }
          ]
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const getStatusCounts = () => {
    const counts = {
      total: leads.length,
      New: leads.filter(l => l.status === 'New').length,
      Contacted: leads.filter(l => l.status === 'Contacted').length,
      'Test Drive': leads.filter(l => l.status === 'Test Drive').length,
      Negotiation: leads.filter(l => l.status === 'Negotiation').length,
      Sold: leads.filter(l => l.status === 'Sold').length
    };
    return counts;
  };

  const statusCounts = getStatusCounts();

  const filteredLeads = leads.filter(lead => {
    // Search filter
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      const leadString = `${lead.name} ${lead.email} ${lead.carInterest} ${lead.message}`.toLowerCase();
      if (!leadString.includes(searchTerm)) return false;
    }
    // Status filter
    if (filters.status && lead.status !== filters.status) return false;
    return true;
  });

  const clearFilters = () => {
    setFilters({ status: '', search: '' });
  };

  const hasActiveFilters = filters.status || filters.search;

  if (loading) return <LoadingSpinner />;

  return (
    <div className="animate-fade-in">
      {/* Page Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Leads</h1>
          <p className="page-subtitle">Manage customer inquiries and track sales pipeline</p>
        </div>
        <div className="header-actions">
          <span className="form-status">
            <FaUserPlus />
            {statusCounts.total} Total Leads
          </span>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="leads-stats">
        <div className="stat-item">
          <FaUsers className="stat-icon" />
          <div>
            <span className="stat-label">Total</span>
            <span className="stat-value">{statusCounts.total}</span>
          </div>
        </div>
        <div className="stat-item">
          <FaUserPlus className="stat-icon" style={{ color: '#42A5F5' }} />
          <div>
            <span className="stat-label">New</span>
            <span className="stat-value" style={{ color: '#42A5F5' }}>{statusCounts.New}</span>
          </div>
        </div>
        <div className="stat-item">
          <FaClock className="stat-icon" style={{ color: '#FFA726' }} />
          <div>
            <span className="stat-label">Contacted</span>
            <span className="stat-value" style={{ color: '#FFA726' }}>{statusCounts.Contacted}</span>
          </div>
        </div>
        <div className="stat-item">
          <FaUserCheck className="stat-icon" style={{ color: '#AB47BC' }} />
          <div>
            <span className="stat-label">Test Drive</span>
            <span className="stat-value" style={{ color: '#AB47BC' }}>{statusCounts['Test Drive']}</span>
          </div>
        </div>
        <div className="stat-item">
          <FaUserCheck className="stat-icon" style={{ color: '#FF6B6B' }} />
          <div>
            <span className="stat-label">Negotiation</span>
            <span className="stat-value" style={{ color: '#FF6B6B' }}>{statusCounts.Negotiation}</span>
          </div>
        </div>
        <div className="stat-item">
          <FaUserCheck className="stat-icon" style={{ color: '#4CAF50' }} />
          <div>
            <span className="stat-label">Sold</span>
            <span className="stat-value" style={{ color: '#4CAF50' }}>{statusCounts.Sold}</span>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="filter-bar">
        <div className="filter-search">
          <FaSearch className="filter-icon" />
          <input
            type="text"
            placeholder="Search leads by name, email, or car interest..."
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
          />
          {filters.search && (
            <button 
              className="filter-clear-btn"
              onClick={() => setFilters({ ...filters, search: '' })}
            >
              <FaTimes />
            </button>
          )}
        </div>

        <div className="filter-select-wrapper">
          <select
            value={filters.status || 'All'}
            onChange={(e) => setFilters({ ...filters, status: e.target.value === 'All' ? '' : e.target.value })}
          >
            <option value="All">All Status</option>
            <option value="New">New</option>
            <option value="Contacted">Contacted</option>
            <option value="Test Drive">Test Drive</option>
            <option value="Negotiation">Negotiation</option>
            <option value="Sold">Sold</option>
          </select>
        </div>

        <button className="btn-filter-apply">
          <FaFilter /> Apply
        </button>
        
        {hasActiveFilters && (
          <button className="btn-filter-clear" onClick={clearFilters}>
            <FaTimes /> Clear
          </button>
        )}
      </div>

      {/* Leads Table */}
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Customer</th>
              <th>Car Interest</th>
              <th>Status</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredLeads.length > 0 ? (
              filteredLeads.map((lead) => (
                <tr key={lead.id} className="lead-row">
                  <td>
                    <div className="customer-info">
                      <div className="customer-avatar">
                        {lead.name.charAt(0)}
                      </div>
                      <div className="customer-details">
                        <div className="customer-name">{lead.name}</div>
                        <div className="customer-email">
                          <FaEnvelope /> {lead.email}
                        </div>
                        <div className="customer-phone">
                          <FaPhone /> {lead.phone}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="car-interest">
                      <div className="interest-car">{lead.carInterest}</div>
                      <div className="interest-message">{lead.message.substring(0, 60)}...</div>
                    </div>
                  </td>
                  <td>
                    <LeadStatusBadge status={lead.status} />
                  </td>
                  <td>
                    <div className="lead-date">
                      <div className="date-main">
                        {new Date(lead.createdAt).toLocaleDateString('en-US', { 
                          month: 'short', 
                          day: 'numeric', 
                          year: 'numeric' 
                        })}
                      </div>
                      <div className="date-time">
                        <FaCalendar /> {new Date(lead.createdAt).toLocaleTimeString('en-US', {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="action-btns">
                      <Link 
                        to={`/admin/leads/${lead.id}`}
                        className="action-btn view"
                        title="View lead details"
                      >
                        <FaEye />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="empty-state">
                  <FaUsers className="empty-icon" />
                  <div className="empty-title">No leads found</div>
                  <div className="empty-subtitle">Try adjusting your filters or wait for new inquiries</div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination (Optional) */}
      {filteredLeads.length > 0 && (
        <div className="table-pagination">
          <div className="pagination-info">
            Showing {filteredLeads.length} of {leads.length} leads
          </div>
          <div className="pagination-controls">
            <button className="pagination-btn" disabled>Previous</button>
            <span className="pagination-current">1</span>
            <button className="pagination-btn">Next</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeadList;
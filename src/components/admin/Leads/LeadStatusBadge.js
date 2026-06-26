import React from 'react';

const LeadStatusBadge = ({ status }) => {
  const getStatusStyles = () => {
    const styles = {
      'New': 'bg-blue-100 text-blue-800',
      'Contacted': 'bg-yellow-100 text-yellow-800',
      'Test Drive': 'bg-purple-100 text-purple-800',
      'Negotiation': 'bg-orange-100 text-orange-800',
      'Sold': 'bg-green-100 text-green-800',
      'Closed': 'bg-gray-100 text-gray-800'
    };
    return styles[status] || 'bg-gray-100 text-gray-800';
  };

  return (
    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusStyles()}`}>
      {status}
    </span>
  );
};

export default LeadStatusBadge;
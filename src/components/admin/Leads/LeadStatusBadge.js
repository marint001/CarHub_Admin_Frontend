import React from 'react';

const LeadStatusBadge = ({ status, size = 'normal' }) => {
  const getStatusStyles = () => {
    const styles = {
      'New': {
        class: 'badge-new',
        icon: '🆕'
      },
      'Contacted': {
        class: 'badge-contacted',
        icon: '📞'
      },
      'Test Drive': {
        class: 'badge-testdrive',
        icon: '🚗'
      },
      'Negotiation': {
        class: 'badge-negotiation',
        icon: '🤝'
      },
      'Sold': {
        class: 'badge-sold-lead',
        icon: '✅'
      }
    };
    return styles[status] || styles['New'];
  };

  const style = getStatusStyles();
  const sizeClass = size === 'large' ? 'badge-large' : '';

  return (
    <span className={`badge ${style.class} ${sizeClass}`}>
      <span className="badge-icon">{style.icon}</span>
      {status}
    </span>
  );
};

export default LeadStatusBadge;
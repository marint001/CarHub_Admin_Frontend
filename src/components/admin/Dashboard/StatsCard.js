import React from 'react';

const StatsCard = ({ title, value, icon, change }) => {
  return (
    <div className="stat-card">
      <div className="stat-header">
        <div>
          <div className="stat-label">{title}</div>
          <div className="stat-value">{value}</div>
          {change && (
            <div className="stat-change">
              <i className="fas fa-arrow-up"></i> {change}
            </div>
          )}
        </div>
        <div className="stat-icon">
          {icon}
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
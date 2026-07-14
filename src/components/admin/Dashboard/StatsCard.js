import React, { useState, useEffect } from 'react';

const StatsCard = ({ title, value, icon, change }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="stat-card stat-card-animated"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="stat-header">
        <div>
          <div className="stat-label">{title}</div>
          <div className="stat-value">{value}</div>
          {change && (
            <div className="stat-change">
              <span className="change-icon">↑</span> {change}
            </div>
          )}
        </div>
        <div className={`stat-icon-wrapper ${isHovered ? 'spin' : ''}`}>
          <div className="stat-icon">
            {icon}
          </div>
        </div>
      </div>
      {/* Progress bar animation */}
      <div className="stat-progress">
        <div 
          className="stat-progress-bar"
          style={{ 
            width: `${Math.random() * 40 + 60}%`
          }}
        ></div>
      </div>
    </div>
  );
};

export default StatsCard;
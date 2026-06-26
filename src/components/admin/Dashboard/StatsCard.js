import React from 'react';

const StatsCard = ({ title, value, icon, color, change }) => {
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <p className="text-2xl font-bold text-gray-800 mt-1">{value}</p>
        </div>
        <div className={`${color} p-3 rounded-lg`}>
          {icon}
        </div>
      </div>
      {change && (
        <div className="mt-3">
          <span className="text-green-500 text-sm font-semibold">{change}</span>
          <span className="text-gray-500 text-sm ml-1">vs last month</span>
        </div>
      )}
    </div>
  );
};

export default StatsCard;
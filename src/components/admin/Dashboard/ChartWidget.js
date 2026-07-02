import React from 'react';

const ChartWidget = ({ data }) => {
  const maxValue = Math.max(...data.values);
  
  return (
    <div className="chart-container">
      <div className="chart-bars">
        {data.labels.map((label, index) => {
          const height = (data.values[index] / maxValue) * 180;
          return (
            <div key={index} className="chart-bar-wrapper">
              <div 
                className="chart-bar" 
                style={{ height: `${Math.max(height, 8)}px` }}
              >
                <span className="bar-value">{data.values[index]}</span>
              </div>
              <span className="chart-label">{label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ChartWidget;
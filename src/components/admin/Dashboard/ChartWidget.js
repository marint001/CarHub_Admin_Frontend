import React, { useState, useEffect } from 'react';

const ChartWidget = ({ data }) => {
  const [animatedSales, setAnimatedSales] = useState(data.sales.map(() => 0));
  const [animatedRevenue, setAnimatedRevenue] = useState(data.revenue.map(() => 0));

  useEffect(() => {
    // Animate bars on mount
    const timeout = setTimeout(() => {
      setAnimatedSales(data.sales);
      setAnimatedRevenue(data.revenue);
    }, 300);
    return () => clearTimeout(timeout);
  }, [data.sales, data.revenue]);

  const maxSales = Math.max(...data.sales);
  const maxRevenue = Math.max(...data.revenue);
  
  return (
    <div className="chart-container">
      <div className="chart-bars">
        {data.labels.map((label, index) => {
          const salesHeight = (animatedSales[index] / maxSales) * 150;
          const revenueHeight = (animatedRevenue[index] / maxRevenue) * 150;
          return (
            <div key={index} className="chart-bar-wrapper">
              <div className="chart-bar-group">
                <div 
                  className="chart-bar chart-bar-sales chart-bar-animated" 
                  style={{ 
                    height: `${Math.max(salesHeight, 8)}px`,
                    animationDelay: `${index * 50}ms`
                  }}
                >
                  <span className="bar-value">{data.sales[index]}</span>
                </div>
                <div 
                  className="chart-bar chart-bar-revenue chart-bar-animated" 
                  style={{ 
                    height: `${Math.max(revenueHeight, 8)}px`,
                    animationDelay: `${index * 50 + 100}ms`
                  }}
                >
                  <span className="bar-value-revenue">${(data.revenue[index] / 1000).toFixed(0)}K</span>
                </div>
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
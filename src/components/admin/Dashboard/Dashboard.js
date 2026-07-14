import React, { useState, useEffect } from 'react';
import { FaCar, FaUsers, FaEnvelope, FaDollarSign, FaEye, FaClock, FaPhone, FaChartLine } from 'react-icons/fa';
import StatsCard from './StatsCard';
import ChartWidget from './ChartWidget';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalCars: 45,
    totalLeads: 128,
    totalSales: 32,
    revenue: 1245000
  });

  const [chartData, setChartData] = useState({
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    sales: [12, 19, 3, 5, 2, 3, 7, 8, 12, 15, 10, 14],
    revenue: [420000, 665000, 105000, 175000, 70000, 105000, 245000, 280000, 420000, 525000, 350000, 490000]
  });

  const statCards = [
    { 
      title: 'Total Cars', 
      value: stats.totalCars, 
      icon: <FaCar />, 
      change: '+12% vs last month',
      delay: 0
    },
    { 
      title: 'Total Leads', 
      value: stats.totalLeads, 
      icon: <FaEnvelope />, 
      change: '+8% vs last month',
      delay: 100
    },
    { 
      title: 'Sales', 
      value: stats.totalSales, 
      icon: <FaUsers />, 
      change: '+5% vs last month',
      delay: 200
    },
    { 
      title: 'Revenue', 
      value: `$${stats.revenue.toLocaleString()}`, 
      icon: <FaDollarSign />, 
      change: '+15% vs last month',
      delay: 300
    }
  ];

  const footerStats = [
    { label: "Today's Visitors", value: '142', change: '+18%', positive: true },
    { label: 'Active Listings', value: '38', change: '+5%', positive: true },
    { label: 'Test Drives Today', value: '6', change: 'Scheduled', positive: null },
    { label: 'Response Time', value: '2.4h', change: '-0.6h', positive: false }
  ];

  return (
    <div className="dashboard-page">
      {/* Page Title with animation */}
      <div className="dashboard-title animate-slide-down">
        <h1 className="page-title">Dashboard</h1>
        <p className="page-subtitle">Welcome back, here's what's happening with your showroom</p>
      </div>
      
      {/* Stats Grid with staggered animation */}
      <div className="stats-grid">
        {statCards.map((stat, index) => (
          <div 
            key={index}
            className="animate-fade-up"
            style={{ animationDelay: `${stat.delay}ms` }}
          >
            <StatsCard {...stat} />
          </div>
        ))}
      </div>

      {/* Chart with slide up animation */}
      <div className="dashboard-chart-full animate-slide-up">
        <div className="card">
          <div className="chart-header-section">
            <h3 className="card-title">
              <span className="card-icon">📊</span> Monthly Sales
            </h3>
            <div className="chart-legend">
              <span className="legend-item">
                <span className="legend-dot sales-dot"></span>
                Sales
              </span>
              <span className="legend-item">
                <span className="legend-dot revenue-dot"></span>
                Revenue
              </span>
            </div>
          </div>
          <ChartWidget data={chartData} />
        </div>
      </div>

      {/* Quick Stats Footer */}
      <div className="dashboard-footer animate-fade-in" style={{ animationDelay: '400ms' }}>
        {footerStats.map((stat, index) => (
          <div key={index} className="footer-stat">
            <span className="footer-label">{stat.label}</span>
            <span className="footer-value">{stat.value}</span>
            <span className={`footer-change ${stat.positive === true ? 'positive' : stat.positive === false ? 'negative' : ''}`}>
              {stat.change}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
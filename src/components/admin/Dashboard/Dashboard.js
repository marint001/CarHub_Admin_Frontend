import React, { useState, useEffect } from 'react';
import { FaCar, FaUsers, FaEnvelope, FaDollarSign } from 'react-icons/fa';
import StatsCard from './StatsCard';
import ChartWidget from './ChartWidget';
import RecentActivity from './RecentActivity';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalCars: 45,
    totalLeads: 128,
    totalSales: 32,
    revenue: 1245000
  });

  const statCards = [
    { 
      title: 'Total Cars', 
      value: stats.totalCars, 
      icon: <FaCar />, 
      change: '+12% vs last month' 
    },
    { 
      title: 'Total Leads', 
      value: stats.totalLeads, 
      icon: <FaEnvelope />, 
      change: '+8% vs last month' 
    },
    { 
      title: 'Sales', 
      value: stats.totalSales, 
      icon: <FaUsers />, 
      change: '+5% vs last month' 
    },
    { 
      title: 'Revenue', 
      value: `$${stats.revenue.toLocaleString()}`, 
      icon: <FaDollarSign />, 
      change: '+15% vs last month' 
    }
  ];

  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    values: [12, 19, 3, 5, 2, 3, 7, 8, 12, 15, 10, 14]
  };

  return (
    <div className="animate-fade-in">
      <h1 className="page-title">Dashboard</h1>
      
      {/* Stats Grid */}
      <div className="stats-grid">
        {statCards.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      {/* Charts & Activity */}
      <div className="dashboard-grid">
        <div className="card">
          <h3 className="card-title">
            <span className="card-icon">📊</span> Monthly Sales
          </h3>
          <ChartWidget data={chartData} />
        </div>
        
        <div className="card">
          <h3 className="card-title">
            <span className="card-icon">⚡</span> Recent Activity
          </h3>
          <RecentActivity />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
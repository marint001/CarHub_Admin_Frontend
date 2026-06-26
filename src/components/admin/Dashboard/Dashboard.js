import React, { useState, useEffect } from 'react';
import { FaCar, FaUsers, FaEnvelope, FaDollarSign } from 'react-icons/fa';
import StatsCard from './StatsCard';
import ChartWidget from './ChartWidget';
import RecentActivity from './RecentActivity';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalCars: 0,
    totalLeads: 0,
    totalSales: 0,
    revenue: 0
  });

  const [chartData, setChartData] = useState({
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Sales',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        borderColor: 'rgb(59, 130, 246)',
        borderWidth: 2
      }
    ]
  });

  useEffect(() => {
    // Simulate API call
    setStats({
      totalCars: 45,
      totalLeads: 128,
      totalSales: 32,
      revenue: 1245000
    });
  }, []);

  const statCards = [
    { 
      title: 'Total Cars', 
      value: stats.totalCars, 
      icon: <FaCar className="text-blue-500" />,
      color: 'bg-blue-100',
      change: '+12%'
    },
    { 
      title: 'Total Leads', 
      value: stats.totalLeads, 
      icon: <FaEnvelope className="text-green-500" />,
      color: 'bg-green-100',
      change: '+8%'
    },
    { 
      title: 'Sales', 
      value: stats.totalSales, 
      icon: <FaUsers className="text-purple-500" />,
      color: 'bg-purple-100',
      change: '+5%'
    },
    { 
      title: 'Revenue', 
      value: `$${(stats.revenue / 1000).toFixed(1)}K`, 
      icon: <FaDollarSign className="text-yellow-500" />,
      color: 'bg-yellow-100',
      change: '+15%'
    }
  ];

  return (
    <div>
      <h1 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-6">Dashboard</h1>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {statCards.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      {/* Charts & Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Monthly Sales</h3>
          <ChartWidget data={chartData} />
        </div>
        
        <div className="bg-white rounded-xl shadow p-6">
          <RecentActivity />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
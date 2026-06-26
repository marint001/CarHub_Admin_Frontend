import React from 'react';
import { FaCar, FaEnvelope, FaUser, FaClock } from 'react-icons/fa';

const RecentActivity = () => {
  const activities = [
    { 
      id: 1, 
      type: 'car', 
      message: 'New car added: Toyota Camry 2023',
      time: '5 minutes ago',
      icon: <FaCar className="text-blue-500" />
    },
    { 
      id: 2, 
      type: 'lead', 
      message: 'New lead from John Doe about BMW X5',
      time: '1 hour ago',
      icon: <FaEnvelope className="text-green-500" />
    },
    { 
      id: 3, 
      type: 'sale', 
      message: 'Car sold: Mercedes-Benz E-Class',
      time: '3 hours ago',
      icon: <FaUser className="text-purple-500" />
    },
    { 
      id: 4, 
      type: 'testdrive', 
      message: 'Test drive scheduled for Audi Q7',
      time: '5 hours ago',
      icon: <FaClock className="text-yellow-500" />
    }
  ];

  return (
    <>
      <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start space-x-3">
            <div className="flex-shrink-0 mt-1">
              {activity.icon}
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-800">{activity.message}</p>
              <p className="text-xs text-gray-500">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
      <button className="mt-4 text-blue-600 text-sm hover:underline">
        View all activity
      </button>
    </>
  );
};

export default RecentActivity;
import React from 'react';
import { FaCar, FaEnvelope, FaUser, FaClock } from 'react-icons/fa';

const RecentActivity = () => {
  const activities = [
    { 
      id: 1, 
      type: 'car', 
      message: 'New car added: Toyota Camry 2023',
      time: '5 minutes ago',
      icon: <FaCar />
    },
    { 
      id: 2, 
      type: 'lead', 
      message: 'New lead from John Doe about BMW X5',
      time: '1 hour ago',
      icon: <FaEnvelope />
    },
    { 
      id: 3, 
      type: 'sale', 
      message: 'Car sold: Mercedes-Benz E-Class',
      time: '3 hours ago',
      icon: <FaUser />
    },
    { 
      id: 4, 
      type: 'testdrive', 
      message: 'Test drive scheduled for Audi Q7',
      time: '5 hours ago',
      icon: <FaClock />
    }
  ];

  return (
    <div className="activity-list">
      {activities.map((activity) => (
        <div key={activity.id} className="activity-item">
          <div className="activity-icon">
            {activity.icon}
          </div>
          <div className="activity-content">
            <div className="message">{activity.message}</div>
            <div className="time">{activity.time}</div>
          </div>
        </div>
      ))}
      <button className="btn btn-secondary" style={{ width: '100%', justifyContent: 'center' }}>
        View all activity
      </button>
    </div>
  );
};

export default RecentActivity;
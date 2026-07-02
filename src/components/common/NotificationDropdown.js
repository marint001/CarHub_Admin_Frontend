import React, { useState, useEffect, useRef } from 'react';
import { 
  FaBell, 
  FaCar, 
  FaEnvelope, 
  FaUser, 
  FaClock,
  FaCheckCircle,
  FaExclamationCircle,
  FaTimes,
  FaArrowRight
} from 'react-icons/fa';
import { Link } from 'react-router-dom';

const NotificationDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const dropdownRef = useRef(null);

  useEffect(() => {
    // Simulate fetching notifications
    const fetchNotifications = () => {
      const mockNotifications = [
        {
          id: 1,
          type: 'lead',
          icon: <FaEnvelope />,
          title: 'New Lead',
          message: 'John Doe is interested in BMW X5',
          time: '5 minutes ago',
          read: false,
          link: '/admin/leads/1'
        },
        {
          id: 2,
          type: 'car',
          icon: <FaCar />,
          title: 'Car Added',
          message: 'New car added: Toyota Camry 2023',
          time: '1 hour ago',
          read: false,
          link: '/admin/cars'
        },
        {
          id: 3,
          type: 'sale',
          icon: <FaCheckCircle />,
          title: 'Car Sold',
          message: 'Mercedes E-Class sold to Robert Johnson',
          time: '3 hours ago',
          read: true,
          link: '/admin/cars'
        },
        {
          id: 4,
          type: 'testdrive',
          icon: <FaClock />,
          title: 'Test Drive Scheduled',
          message: 'Audi Q7 test drive scheduled for tomorrow',
          time: '5 hours ago',
          read: true,
          link: '/admin/leads'
        },
        {
          id: 5,
          type: 'alert',
          icon: <FaExclamationCircle />,
          title: 'Low Inventory',
          message: 'Only 2 BMW X5 remaining in stock',
          time: '1 day ago',
          read: true,
          link: '/admin/cars'
        }
      ];
      setNotifications(mockNotifications);
      setUnreadCount(mockNotifications.filter(n => !n.read).length);
    };

    fetchNotifications();

    // Click outside to close
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      // Mark all as read when opening
      setNotifications(notifications.map(n => ({ ...n, read: true })));
      setUnreadCount(0);
    }
  };

  const markAsRead = (id) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
    setUnreadCount(notifications.filter(n => n.id !== id && !n.read).length);
  };

  const clearAll = () => {
    setNotifications([]);
    setUnreadCount(0);
    setIsOpen(false);
  };

  const getNotificationColor = (type) => {
    const colors = {
      lead: '#42A5F5',
      car: '#FFD700',
      sale: '#4CAF50',
      testdrive: '#AB47BC',
      alert: '#EF5350'
    };
    return colors[type] || '#888888';
  };

  const getNotificationIcon = (type) => {
    const icons = {
      lead: <FaEnvelope />,
      car: <FaCar />,
      sale: <FaCheckCircle />,
      testdrive: <FaClock />,
      alert: <FaExclamationCircle />
    };
    return icons[type] || <FaBell />;
  };

  return (
    <div className="notification-wrapper" ref={dropdownRef}>
      <button 
        className="notification-btn" 
        onClick={toggleDropdown}
        aria-label="Notifications"
      >
        <FaBell />
        {unreadCount > 0 && (
          <span className="notif-badge">{unreadCount}</span>
        )}
      </button>

      {isOpen && (
        <div className="notification-dropdown">
          <div className="notification-header">
            <span className="notification-title">Notifications</span>
            {notifications.length > 0 && (
              <button className="notification-clear" onClick={clearAll}>
                <FaTimes /> Clear all
              </button>
            )}
          </div>

          <div className="notification-list">
            {notifications.length > 0 ? (
              notifications.map((notification) => (
                <Link 
                  key={notification.id} 
                  to={notification.link}
                  className={`notification-item ${!notification.read ? 'unread' : ''}`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div 
                    className="notification-icon"
                    style={{ background: `${getNotificationColor(notification.type)}20`, color: getNotificationColor(notification.type) }}
                  >
                    {getNotificationIcon(notification.type)}
                  </div>
                  <div className="notification-content">
                    <div className="notification-message">
                      <span className="notification-title-text">{notification.title}</span>
                      <span className="notification-text">{notification.message}</span>
                    </div>
                    <span className="notification-time">{notification.time}</span>
                  </div>
                  {!notification.read && <span className="notification-dot"></span>}
                </Link>
              ))
            ) : (
              <div className="notification-empty">
                <FaBell className="empty-icon" />
                <span className="empty-text">No notifications</span>
                <span className="empty-subtext">You're all caught up!</span>
              </div>
            )}
          </div>

          {notifications.length > 0 && (
            <div className="notification-footer">
              <Link to="/admin/notifications" className="view-all">
                View all notifications <FaArrowRight />
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationDropdown;
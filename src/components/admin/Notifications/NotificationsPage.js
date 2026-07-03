import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaBell, 
  FaCar, 
  FaEnvelope, 
  FaUser, 
  FaClock,
  FaCheckCircle,
  FaExclamationCircle,
  FaCheckDouble,
  FaTrash,
  FaArrowLeft,
  FaFilter
} from 'react-icons/fa';
import { toast } from 'react-toastify';
import LoadingSpinner from '../../common/LoadingSpinner';

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all, unread, read

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setNotifications([
        {
          id: 1,
          type: 'lead',
          icon: <FaEnvelope />,
          title: 'New Lead',
          message: 'John Doe is interested in BMW X5',
          time: '2026-06-26T10:00:00',
          read: false,
          link: '/admin/leads/1'
        },
        {
          id: 2,
          type: 'car',
          icon: <FaCar />,
          title: 'Car Added',
          message: 'New car added: Toyota Camry 2023',
          time: '2026-06-26T09:00:00',
          read: false,
          link: '/admin/cars'
        },
        {
          id: 3,
          type: 'sale',
          icon: <FaCheckCircle />,
          title: 'Car Sold',
          message: 'Mercedes E-Class sold to Robert Johnson',
          time: '2026-06-25T15:30:00',
          read: true,
          link: '/admin/cars'
        },
        {
          id: 4,
          type: 'testdrive',
          icon: <FaClock />,
          title: 'Test Drive Scheduled',
          message: 'Audi Q7 test drive scheduled for tomorrow',
          time: '2026-06-25T14:00:00',
          read: true,
          link: '/admin/leads'
        },
        {
          id: 5,
          type: 'alert',
          icon: <FaExclamationCircle />,
          title: 'Low Inventory',
          message: 'Only 2 BMW X5 remaining in stock',
          time: '2026-06-25T10:00:00',
          read: true,
          link: '/admin/cars'
        }
      ]);
      setLoading(false);
    }, 500);
  }, []);

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
    toast.success('All notifications marked as read ✅');
  };

  const deleteAll = () => {
    if (notifications.length === 0) {
      toast.info('No notifications to clear');
      return;
    }
    if (window.confirm('Are you sure you want to clear all notifications?')) {
      setNotifications([]);
      toast.success('All notifications cleared 🗑️');
    }
  };

  const markAsRead = (id) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const deleteNotification = (id) => {
    setNotifications(notifications.filter(n => n.id !== id));
    toast.success('Notification removed');
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

  const getTypeLabel = (type) => {
    const labels = {
      lead: 'Lead',
      car: 'Car',
      sale: 'Sale',
      testdrive: 'Test Drive',
      alert: 'Alert'
    };
    return labels[type] || type;
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const filteredNotifications = notifications.filter(n => {
    if (filter === 'unread') return !n.read;
    if (filter === 'read') return n.read;
    return true;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  if (loading) return <LoadingSpinner />;

  return (
    <div className="notifications-page animate-fade-in">
      {/* Page Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Notifications</h1>
          <p className="page-subtitle">View and manage all your notifications</p>
        </div>
        <div className="header-actions">
          {notifications.length > 0 && (
            <>
              <button className="btn btn-secondary" onClick={markAllAsRead}>
                <FaCheckDouble /> Mark all read
              </button>
              <button className="btn btn-danger" onClick={deleteAll}>
                <FaTrash /> Clear all
              </button>
            </>
          )}
        </div>
      </div>

      {/* Stats & Filters */}
      <div className="notifications-stats">
        <div className="stats-left">
          <div className="stat-item">
            <span className="stat-label">Total</span>
            <span className="stat-value">{notifications.length}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Unread</span>
            <span className="stat-value" style={{ color: '#FFD700' }}>{unreadCount}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Read</span>
            <span className="stat-value" style={{ color: '#4CAF50' }}>{notifications.length - unreadCount}</span>
          </div>
        </div>
        <div className="filter-controls">
          <FaFilter className="filter-icon" />
          <select 
            value={filter} 
            onChange={(e) => setFilter(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Notifications</option>
            <option value="unread">Unread</option>
            <option value="read">Read</option>
          </select>
        </div>
      </div>

      {/* Notifications List */}
      <div className="notifications-list-container">
        {filteredNotifications.length > 0 ? (
          filteredNotifications.map((notification) => (
            <div 
              key={notification.id} 
              className={`notification-card ${!notification.read ? 'unread' : ''}`}
            >
              <div className="notification-card-left">
                <div 
                  className="notification-card-icon"
                  style={{ 
                    background: `${getNotificationColor(notification.type)}20`, 
                    color: getNotificationColor(notification.type) 
                  }}
                >
                  {getNotificationIcon(notification.type)}
                </div>
                <div className="notification-card-content">
                  <div className="notification-card-header">
                    <div className="notification-card-title-group">
                      <span className="notification-card-title">{notification.title}</span>
                      <span 
                        className="notification-card-type"
                        style={{ 
                          background: `${getNotificationColor(notification.type)}20`,
                          color: getNotificationColor(notification.type)
                        }}
                      >
                        {getTypeLabel(notification.type)}
                      </span>
                    </div>
                    <span className="notification-card-time">
                      <FaClock className="time-icon" />
                      {formatTime(notification.time)}
                    </span>
                  </div>
                  <p className="notification-card-message">{notification.message}</p>
                </div>
              </div>
              <div className="notification-card-actions">
                {!notification.read && (
                  <button 
                    className="action-btn mark-read"
                    onClick={() => markAsRead(notification.id)}
                    title="Mark as read"
                  >
                    <FaCheckCircle />
                  </button>
                )}
                <Link 
                  to={notification.link} 
                  className="action-btn view"
                  title="View details"
                >
                  <FaArrowLeft className="view-icon" />
                </Link>
                <button 
                  className="action-btn delete"
                  onClick={() => deleteNotification(notification.id)}
                  title="Delete"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="notifications-empty">
            <FaBell className="empty-icon" />
            <div className="empty-title">No notifications</div>
            <div className="empty-subtitle">
              {notifications.length === 0 
                ? "You're all caught up! 🎉" 
                : "No notifications match your filter"
              }
            </div>
          </div>
        )}
      </div>

      {/* Footer Stats */}
      {notifications.length > 0 && (
        <div className="notifications-footer">
          <span>
            Showing {filteredNotifications.length} of {notifications.length} notifications
          </span>
          {unreadCount > 0 && (
            <span className="unread-badge">
              {unreadCount} unread
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationsPage;
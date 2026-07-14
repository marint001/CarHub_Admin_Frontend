import React, { forwardRef } from 'react';
import { NavLink } from 'react-router-dom';
import {
  FaCar,
  FaTachometerAlt,
  FaUsers,
  FaCog,
  FaSignOutAlt,
  FaEnvelope,
  FaChartLine,
  FaShieldAlt,
  FaBell
} from 'react-icons/fa';
import { useAuth } from '../../../context/AuthContext';

const Sidebar = forwardRef(({ sidebarOpen, setSidebarOpen }, ref) => {
  const { logout } = useAuth();

  const menuItems = [
    { path: '/admin/dashboard', icon: <FaTachometerAlt />, label: 'Dashboard' },
    { path: '/admin/cars', icon: <FaCar />, label: 'Cars' },
    { path: '/admin/leads', icon: <FaEnvelope />, label: 'Leads' },
    { path: '/admin/reports', icon: <FaChartLine />, label: 'Reports' },
    { path: '/admin/notifications', icon: <FaBell />, label: 'Notifications' },
    { path: '/admin/settings', icon: <FaCog />, label: 'Settings' },
  ];

  return (
    <aside 
      ref={ref}
      className={`sidebar ${sidebarOpen ? 'open' : ''}`}
    >
      {/* Sidebar Header */}
      <div className="sidebar-header">
        <div className="sidebar-brand">
          <FaCar className="brand-icon" />
          <span className="brand-text">AutoShow</span>
          <span className="brand-badge">Admin</span>
        </div>
      </div>

      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            onClick={() => {
              if (window.innerWidth <= 768) {
                setSidebarOpen(false);
              }
            }}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer">
        <button onClick={logout} className="logout-btn">
          <FaSignOutAlt />
          <span>Logout</span>
        </button>
        <div className="secure-badge">
          <FaShieldAlt />
          <span>Secure Session</span>
        </div>
      </div>
    </aside>
  );
});

Sidebar.displayName = 'Sidebar';

export default Sidebar;
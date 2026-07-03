import React from 'react';
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
  FaBell,
  FaTimes // Make sure FaTimes is imported
} from 'react-icons/fa';
import { useAuth } from '../../../context/AuthContext';

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
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
    <>
      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-20 lg:hidden sidebar-overlay"
          style={{ background: 'rgba(0,0,0,0.6)' }}
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        {/* Sidebar Header with Hamburger Icon */}
        <div className="sidebar-header">
          <div className="sidebar-brand">
            <FaCar className="brand-icon" />
            <span className="brand-text">AutoShow</span>
            <span className="brand-badge">Admin</span>
          </div>
          
          {/* X Icon inside sidebar to close */}
          <button 
            className="sidebar-toggle-btn"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close sidebar"
          >
            <FaTimes />
          </button>
        </div>

        <nav className="sidebar-nav">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              onClick={() => {
                // Close sidebar on mobile after navigation
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
    </>
  );
};

export default Sidebar;
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
  FaShieldAlt
} from 'react-icons/fa';
import { useAuth } from '../../../context/AuthContext';

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const { logout } = useAuth();

  const menuItems = [
    { path: '/admin/dashboard', icon: <FaTachometerAlt />, label: 'Dashboard', badge: 'Live' },
    { path: '/admin/cars', icon: <FaCar />, label: 'Cars' },
    { path: '/admin/leads', icon: <FaEnvelope />, label: 'Leads' },
    { path: '/admin/reports', icon: <FaChartLine />, label: 'Reports' },
    { path: '/admin/settings', icon: <FaCog />, label: 'Settings' },
  ];

  return (
    <>
      {!sidebarOpen && (
        <div 
          className="fixed inset-0 z-20 lg:hidden sidebar-overlay"
          style={{ background: 'rgba(0,0,0,0.8)' }}
          onClick={() => setSidebarOpen(true)}
        />
      )}

      <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-brand">
          <FaCar className="brand-icon" />
          <span className="brand-text">CAR HUB</span>
          <span className="brand-badge">Admin</span>
        </div>

        <nav className="sidebar-nav">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
              {item.badge && (
                <span className="nav-badge">{item.badge}</span>
              )}
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
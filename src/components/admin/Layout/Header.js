import React from 'react';
import { FaBars, FaSearch, FaShieldAlt } from 'react-icons/fa';
import { useAuth } from '../../../context/AuthContext';
import NotificationDropdown from '../../common/NotificationDropdown';

const Header = ({ sidebarOpen, setSidebarOpen }) => {
  const { user } = useAuth();

  // Get user initials
  const getInitials = (name) => {
    if (!name) return 'A';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <header className="header">
      <div className="header-left">
        <button 
          className="menu-toggle" 
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <FaBars />
        </button>
        
        <div className="search-box">
          <FaSearch className="search-icon" />
          <input type="text" placeholder="Search cars, leads..." />
        </div>
      </div>

      <div className="header-right">
        {/* Notification Dropdown */}
        <NotificationDropdown />
        
        <div className="user-profile">
          <div className="user-avatar">
            {getInitials(user?.name)}
          </div>
          <div className="user-info">
            <span className="user-name">{user?.name || 'John Admin'}</span>
            <span className="user-role">{user?.role || 'Super Admin'}</span>
          </div>
          <div className="secure-badge">
            <FaShieldAlt />
            <span>Secure</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
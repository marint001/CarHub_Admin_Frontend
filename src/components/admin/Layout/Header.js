import React from 'react';
import { FaBell, FaSearch, FaShieldAlt } from 'react-icons/fa';
import { useAuth } from '../../../context/AuthContext';
import NotificationDropdown from '../../common/NotificationDropdown';

const Header = () => {
  const { user } = useAuth();

  const getInitials = (name) => {
    if (!name) return 'A';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <header className="header">
      <div className="header-left">
        <div className="search-box">
          <FaSearch className="search-icon" />
          <input type="text" placeholder="Search cars, leads..." />
        </div>
      </div>

      <div className="header-right">
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
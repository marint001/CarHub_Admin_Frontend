import React from 'react';
import { FaBars, FaBell, FaUserCircle, FaSearch } from 'react-icons/fa';
import { useAuth } from '../../../context/AuthContext';

const Header = ({ sidebarOpen, setSidebarOpen }) => {
  const { user } = useAuth();

  return (
    <header className="bg-white shadow-sm px-4 lg:px-6 py-4 flex items-center justify-between">
      <div className="flex items-center">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="text-gray-600 hover:text-gray-900 lg:hidden"
        >
          <FaBars size={24} />
        </button>
        
        <div className="ml-4 flex-1 max-w-md hidden sm:block">
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search cars, leads..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <button className="relative text-gray-600 hover:text-gray-900">
          <FaBell size={20} />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
            3
          </span>
        </button>
        
        <div className="flex items-center space-x-3">
          {user?.avatar ? (
            <img 
              src={user.avatar} 
              alt={user.name}
              className="w-8 h-8 rounded-full"
            />
          ) : (
            <FaUserCircle className="text-gray-400 text-3xl" />
          )}
          <div className="hidden sm:block">
            <p className="text-sm font-medium text-gray-700">{user?.name || 'Admin'}</p>
            <p className="text-xs text-gray-500">{user?.role || 'Administrator'}</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
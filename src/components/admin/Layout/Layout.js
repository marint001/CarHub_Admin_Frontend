import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import Sidebar from './Sidebar';
import Header from './Header';

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex h-screen" style={{ background: '#0a0a0a' }}>
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      
      <div className="flex-1 flex flex-col overflow-hidden main-content">
        <Header />
        
        <main className="flex-1 overflow-y-auto">
          <div className="page-content">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Floating Hamburger Button - Only visible when sidebar is closed */}
      {!sidebarOpen && (
        <button 
          className="floating-hamburger"
          onClick={toggleSidebar}
          aria-label="Open sidebar"
        >
          <FaBars />
        </button>
      )}
    </div>
  );
};

export default Layout;
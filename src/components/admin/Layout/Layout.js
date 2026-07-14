import React, { useState, useEffect, useRef } from 'react';
import { Outlet } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import Sidebar from './Sidebar';
import Header from './Header';

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);

  // Toggle sidebar
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarOpen && sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        if (event.target.closest('.floating-hamburger')) {
          return;
        }
        setSidebarOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [sidebarOpen]);

  // Close sidebar on ESC key
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === 'Escape' && sidebarOpen) {
        setSidebarOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscKey);
    return () => document.removeEventListener('keydown', handleEscKey);
  }, [sidebarOpen]);

  return (
    <div className="layout-container">
      <Sidebar 
        ref={sidebarRef}
        sidebarOpen={sidebarOpen} 
        setSidebarOpen={setSidebarOpen} 
      />
      
      <div className={`main-content-wrapper ${sidebarOpen ? 'sidebar-open' : ''}`}>
        <div className="main-content-inner">
          <Header />
          
          <main className="main-content">
            <div className="page-content">
              <Outlet />
            </div>
          </main>
        </div>
      </div>

      {/* Floating Hamburger Button */}
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
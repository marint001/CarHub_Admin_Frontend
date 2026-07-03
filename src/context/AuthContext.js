import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('adminToken');
    const userData = localStorage.getItem('adminUser');
    
    if (token && userData) {
      setUser(JSON.parse(userData));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    // Simulate API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email === 'admin@autoshow.com' && password === 'admin123') {
          const userData = {
            id: 1,
            name: 'John Admin',
            email: 'admin@autoshow.com',
            phone: '+1 (555) 123-4567',
            role: 'super_admin',
            avatar: 'https://ui-avatars.com/api/?name=John+Admin&background=FFD700&color=000&size=36'
          };
          
          localStorage.setItem('adminToken', 'fake-jwt-token');
          localStorage.setItem('adminUser', JSON.stringify(userData));
          setUser(userData);
          resolve(userData);
        } else {
          reject(new Error('Invalid credentials'));
        }
      }, 1000);
    });
  };

  const logout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    setUser(null);
  };

  // Add updateUser function
  const updateUser = (updatedData) => {
    const currentUser = user || JSON.parse(localStorage.getItem('adminUser') || '{}');
    const newUserData = { ...currentUser, ...updatedData };
    setUser(newUserData);
    localStorage.setItem('adminUser', JSON.stringify(newUserData));
  };

  const value = {
    user,
    login,
    logout,
    updateUser, // Add this to the context value
    loading,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
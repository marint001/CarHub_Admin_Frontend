import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './styles/admin.css';

// Components
import AdminLogin from './components/admin/Login/AdminLogin';
import Layout from './components/admin/Layout/Layout';
import Dashboard from './components/admin/Dashboard/Dashboard';
import CarList from './components/admin/Cars/CarList';
import CarForm from './components/admin/Cars/CarForm';
import LeadList from './components/admin/Leads/LeadList';
import LeadDetails from './components/admin/Leads/LeadDetails';
import Reports from './components/admin/Reports/Reports'; // ADD THIS IMPORT
import AdminSettings from './components/admin/Settings/AdminSettings';
import ProtectedRoute from './components/common/ProtectedRoute';
import NotificationsPage from './components/admin/Notifications/NotificationsPage';


// Context
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="admin-app">
          <Routes>
            <Route path="/admin/login" element={<AdminLogin />} />
            
            <Route path="/admin" element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }>
              <Route index element={<Navigate to="/admin/dashboard" />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="cars" element={<CarList />} />
              <Route path="cars/new" element={<CarForm />} />
              <Route path="cars/edit/:id" element={<CarForm />} />
              <Route path="leads" element={<LeadList />} />
              <Route path="leads/:id" element={<LeadDetails />} />
              <Route path="reports" element={<Reports />} /> {/* ADD THIS ROUTE */}
              <Route path="settings" element={<AdminSettings />} />
              <Route path="notifications" element={<NotificationsPage />} />

            </Route>
            
            <Route path="*" element={<Navigate to="/admin" />} />
          </Routes>
          <ToastContainer position="top-right" autoClose={3000} />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
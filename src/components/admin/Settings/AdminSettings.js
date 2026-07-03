import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useAuth } from '../../../context/AuthContext';
import { 
  FaSave, 
  FaUser, 
  FaLock, 
  FaBell, 
  FaPalette,
  FaEnvelope,
  FaPhone,
  FaEye,
  FaEyeSlash,
  FaShieldAlt,
  FaCheckCircle,
  FaTimes,
  FaUserCircle
} from 'react-icons/fa';

const AdminSettings = () => {
  const { user, updateUser } = useAuth(); // Add updateUser from context
  
  const [profile, setProfile] = useState({
    name: user?.name || 'John Admin',
    email: user?.email || 'admin@autoshow.com',
    phone: user?.phone || '+1 (555) 123-4567'
  });

  const [password, setPassword] = useState({
    current: '',
    new: '',
    confirm: ''
  });

  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false
  });

  const [notifications, setNotifications] = useState({
    email: true,
    leads: true,
    inventory: false,
    testDrives: true,
    marketing: false
  });

  const [selectedTheme, setSelectedTheme] = useState('yellow');
  const [loading, setLoading] = useState({
    profile: false,
    password: false
  });

  const themes = [
    { id: 'yellow', color: '#FFD700', label: 'Gold' },
    { id: 'blue', color: '#3B82F6', label: 'Blue' },
    { id: 'red', color: '#EF4444', label: 'Red' },
    { id: 'green', color: '#10B981', label: 'Green' },
    { id: 'purple', color: '#8B5CF6', label: 'Purple' },
    { id: 'pink', color: '#EC4899', label: 'Pink' },
    { id: 'orange', color: '#F59E0B', label: 'Orange' },
    { id: 'teal', color: '#14B8A6', label: 'Teal' }
  ];

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    setLoading({ ...loading, profile: true });
    
    // Update user in context
    updateUser({
      name: profile.name,
      email: profile.email,
      phone: profile.phone
    });
    
    // Update localStorage
    const userData = JSON.parse(localStorage.getItem('adminUser') || '{}');
    localStorage.setItem('adminUser', JSON.stringify({
      ...userData,
      name: profile.name,
      email: profile.email,
      phone: profile.phone
    }));
    
    setTimeout(() => {
      toast.success('Profile updated successfully! ✅');
      setLoading({ ...loading, profile: false });
      // Refresh the page to update header
      setTimeout(() => {
        window.location.reload();
      }, 500);
    }, 1000);
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    
    if (password.new !== password.confirm) {
      toast.error('Passwords do not match ❌');
      return;
    }
    
    if (password.new.length < 8) {
      toast.error('Password must be at least 8 characters ❌');
      return;
    }

    setLoading({ ...loading, password: true });
    
    setTimeout(() => {
      toast.success('Password changed successfully! 🔒');
      setPassword({ current: '', new: '', confirm: '' });
      setLoading({ ...loading, password: false });
    }, 1500);
  };

  const handleNotificationToggle = (key) => {
    setNotifications({ ...notifications, [key]: !notifications[key] });
    toast.success(`${key.charAt(0).toUpperCase() + key.slice(1)} notifications ${!notifications[key] ? 'enabled' : 'disabled'}`);
  };

  const handleThemeChange = (themeId) => {
    setSelectedTheme(themeId);
    toast.success(`Theme changed to ${themes.find(t => t.id === themeId)?.label}`);
  };

  // Get user initials for avatar
  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="settings-page animate-fade-in">
      <div className="page-header">
        <div>
          <h1 className="page-title">Settings</h1>
          <p className="page-subtitle">Manage your account preferences and configuration</p>
        </div>
        <div className="header-actions">
          <span className="form-status">
            <FaShieldAlt /> Secure Settings
          </span>
        </div>
      </div>

      <div className="settings-grid">
        {/* Profile Settings */}
        <div className="settings-card">
          <div className="settings-card-header">
            <FaUser className="settings-icon" />
            <h3>Profile</h3>
          </div>
          <form onSubmit={handleProfileSubmit} className="settings-form">
            <div className="profile-avatar">
              <div className="avatar-circle">
                {getInitials(profile.name)}
              </div>
              <div className="avatar-info">
                <span className="avatar-name">{profile.name}</span>
                <span className="avatar-role">Administrator</span>
              </div>
              <button type="button" className="avatar-upload-btn">
                <FaUserCircle /> Change Photo
              </button>
            </div>

            <div className="form-group">
              <label>
                <FaUser className="label-icon" /> Full Name
              </label>
              <input
                type="text"
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                placeholder="Enter your full name"
              />
            </div>

            <div className="form-group">
              <label>
                <FaEnvelope className="label-icon" /> Email
              </label>
              <input
                type="email"
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                placeholder="Enter your email"
              />
            </div>

            <div className="form-group">
              <label>
                <FaPhone className="label-icon" /> Phone
              </label>
              <input
                type="tel"
                value={profile.phone}
                onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                placeholder="Enter your phone number"
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading.profile}
            >
              <FaSave />
              {loading.profile ? 'Updating...' : 'Update Profile'}
            </button>
          </form>
        </div>

        {/* Change Password */}
        <div className="settings-card">
          <div className="settings-card-header">
            <FaLock className="settings-icon" />
            <h3>Change Password</h3>
          </div>
          <form onSubmit={handlePasswordSubmit} className="settings-form">
            <div className="password-strength">
              <span>Password must be at least 8 characters</span>
            </div>

            <div className="form-group">
              <label>Current Password</label>
              <div className="password-input-wrapper">
                <input
                  type={showPassword.current ? 'text' : 'password'}
                  value={password.current}
                  onChange={(e) => setPassword({ ...password, current: e.target.value })}
                  placeholder="Enter current password"
                  required
                />
                <button
                  type="button"
                  className="toggle-password-btn"
                  onClick={() => setShowPassword({ ...showPassword, current: !showPassword.current })}
                >
                  {showPassword.current ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <div className="form-group">
              <label>New Password</label>
              <div className="password-input-wrapper">
                <input
                  type={showPassword.new ? 'text' : 'password'}
                  value={password.new}
                  onChange={(e) => setPassword({ ...password, new: e.target.value })}
                  placeholder="Enter new password"
                  required
                  minLength="8"
                />
                <button
                  type="button"
                  className="toggle-password-btn"
                  onClick={() => setShowPassword({ ...showPassword, new: !showPassword.new })}
                >
                  {showPassword.new ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <div className="form-group">
              <label>Confirm New Password</label>
              <div className="password-input-wrapper">
                <input
                  type={showPassword.confirm ? 'text' : 'password'}
                  value={password.confirm}
                  onChange={(e) => setPassword({ ...password, confirm: e.target.value })}
                  placeholder="Confirm new password"
                  required
                />
                <button
                  type="button"
                  className="toggle-password-btn"
                  onClick={() => setShowPassword({ ...showPassword, confirm: !showPassword.confirm })}
                >
                  {showPassword.confirm ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {password.new && password.confirm && password.new !== password.confirm && (
                <div className="password-error">
                  <FaTimes /> Passwords do not match
                </div>
              )}
              {password.new && password.new.length >= 8 && password.confirm && password.new === password.confirm && (
                <div className="password-success">
                  <FaCheckCircle /> Passwords match
                </div>
              )}
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading.password}
            >
              <FaLock />
              {loading.password ? 'Changing...' : 'Change Password'}
            </button>
          </form>
        </div>

        {/* Notifications */}
        <div className="settings-card">
          <div className="settings-card-header">
            <FaBell className="settings-icon" />
            <h3>Notifications</h3>
          </div>
          <div className="settings-form">
            <div className="notification-item">
              <div className="notification-info">
                <div className="notification-icon">
                  <FaEnvelope />
                </div>
                <div className="notification-details">
                  <span className="notification-title">Email notifications</span>
                  <span className="notification-desc">Receive updates via email</span>
                </div>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={notifications.email}
                  onChange={() => handleNotificationToggle('email')}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>

            <div className="notification-item">
              <div className="notification-info">
                <div className="notification-icon">
                  <FaUser />
                </div>
                <div className="notification-details">
                  <span className="notification-title">New lead alerts</span>
                  <span className="notification-desc">Get notified when a new lead arrives</span>
                </div>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={notifications.leads}
                  onChange={() => handleNotificationToggle('leads')}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>

            <div className="notification-item">
              <div className="notification-info">
                <div className="notification-icon">
                  <FaBell />
                </div>
                <div className="notification-details">
                  <span className="notification-title">Inventory updates</span>
                  <span className="notification-desc">Get notified about inventory changes</span>
                </div>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={notifications.inventory}
                  onChange={() => handleNotificationToggle('inventory')}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>

            <div className="notification-item">
              <div className="notification-info">
                <div className="notification-icon">
                  <FaShieldAlt />
                </div>
                <div className="notification-details">
                  <span className="notification-title">Test drive reminders</span>
                  <span className="notification-desc">Get reminded of upcoming test drives</span>
                </div>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={notifications.testDrives}
                  onChange={() => handleNotificationToggle('testDrives')}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>

            <div className="notification-item">
              <div className="notification-info">
                <div className="notification-icon">
                  <FaBell />
                </div>
                <div className="notification-details">
                  <span className="notification-title">Marketing updates</span>
                  <span className="notification-desc">Receive marketing and promotional emails</span>
                </div>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={notifications.marketing}
                  onChange={() => handleNotificationToggle('marketing')}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>
          </div>
        </div>

        {/* Theme Settings */}
        <div className="settings-card">
          <div className="settings-card-header">
            <FaPalette className="settings-icon" />
            <h3>Theme</h3>
          </div>
          <div className="settings-form">
            <div className="theme-info">
              <p>Choose your preferred color theme for the admin panel</p>
              <span className="active-theme">
                Active: <strong>{themes.find(t => t.id === selectedTheme)?.label}</strong>
              </span>
            </div>
            
            <div className="theme-grid">
              {themes.map((theme) => (
                <button
                  key={theme.id}
                  className={`theme-option ${selectedTheme === theme.id ? 'active' : ''}`}
                  onClick={() => handleThemeChange(theme.id)}
                  style={{ 
                    '--theme-color': theme.color,
                    background: theme.color
                  }}
                >
                  <div className="theme-preview" style={{ background: theme.color }}>
                    {selectedTheme === theme.id && <FaCheckCircle className="theme-check" />}
                  </div>
                  <span className="theme-label">{theme.label}</span>
                </button>
              ))}
            </div>

            <div className="theme-preview-card">
              <div className="preview-header" style={{ 
                background: selectedTheme === 'yellow' ? '#0a0a0a' : '#1a1a1a',
                borderColor: themes.find(t => t.id === selectedTheme)?.color 
              }}>
                <span>Preview</span>
                <span className="preview-badge" style={{ 
                  background: themes.find(t => t.id === selectedTheme)?.color,
                  color: selectedTheme === 'yellow' ? '#0a0a0a' : '#ffffff'
                }}>Theme</span>
              </div>
              <div className="preview-body">
                <div className="preview-card" style={{ borderColor: themes.find(t => t.id === selectedTheme)?.color }}>
                  <div className="preview-title" style={{ color: themes.find(t => t.id === selectedTheme)?.color }}>
                    Sample Card
                  </div>
                  <div className="preview-text">This is how your theme will look</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
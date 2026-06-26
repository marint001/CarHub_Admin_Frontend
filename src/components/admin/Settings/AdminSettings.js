import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { FaSave, FaUser, FaLock, FaBell, FaPalette } from 'react-icons/fa';

const AdminSettings = () => {
  const [profile, setProfile] = useState({
    name: 'John Admin',
    email: 'admin@autoshow.com',
    phone: '+1 (555) 123-4567'
  });

  const [password, setPassword] = useState({
    current: '',
    new: '',
    confirm: ''
  });

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    toast.success('Profile updated successfully!');
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (password.new !== password.confirm) {
      toast.error('Passwords do not match');
      return;
    }
    toast.success('Password changed successfully!');
    setPassword({ current: '', new: '', confirm: '' });
  };

  return (
    <div>
      <h1 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-6">Settings</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Profile Settings */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center">
            <FaUser className="mr-2 text-blue-600" /> Profile
          </h2>
          <form onSubmit={handleProfileSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone
              </label>
              <input
                type="tel"
                value={profile.phone}
                onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition flex items-center justify-center"
            >
              <FaSave className="mr-2" /> Update Profile
            </button>
          </form>
        </div>

        {/* Password Settings */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center">
            <FaLock className="mr-2 text-blue-600" /> Change Password
          </h2>
          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Current Password
              </label>
              <input
                type="password"
                value={password.current}
                onChange={(e) => setPassword({ ...password, current: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                New Password
              </label>
              <input
                type="password"
                value={password.new}
                onChange={(e) => setPassword({ ...password, new: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                minLength="8"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Confirm New Password
              </label>
              <input
                type="password"
                value={password.confirm}
                onChange={(e) => setPassword({ ...password, confirm: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition flex items-center justify-center"
            >
              <FaLock className="mr-2" /> Change Password
            </button>
          </form>
        </div>

        {/* Notification Settings */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center">
            <FaBell className="mr-2 text-blue-600" /> Notifications
          </h2>
          <div className="space-y-4">
            <label className="flex items-center justify-between">
              <span className="text-gray-700">Email notifications</span>
              <input type="checkbox" defaultChecked className="w-5 h-5 text-blue-600" />
            </label>
            <label className="flex items-center justify-between">
              <span className="text-gray-700">New lead alerts</span>
              <input type="checkbox" defaultChecked className="w-5 h-5 text-blue-600" />
            </label>
            <label className="flex items-center justify-between">
              <span className="text-gray-700">Inventory updates</span>
              <input type="checkbox" className="w-5 h-5 text-blue-600" />
            </label>
          </div>
        </div>

        {/* Theme Settings */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center">
            <FaPalette className="mr-2 text-blue-600" /> Theme
          </h2>
          <div className="space-y-4">
            <div className="grid grid-cols-4 gap-2">
              {['blue', 'red', 'green', 'purple', 'pink', 'orange', 'teal', 'indigo'].map((color) => (
                <button
                  key={color}
                  className={`w-full aspect-square rounded-lg border-2 border-transparent hover:border-blue-500`}
                  style={{ backgroundColor: `var(--color-${color})` }}
                  onClick={() => toast.info(`Theme changed to ${color}`)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
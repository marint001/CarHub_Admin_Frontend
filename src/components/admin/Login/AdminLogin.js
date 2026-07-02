import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { toast } from 'react-toastify';
import { FaCar, FaEnvelope, FaLock, FaEye, FaEyeSlash, FaShieldAlt, FaArrowRight } from 'react-icons/fa';

const AdminLogin = () => {
  const [email, setEmail] = useState('admin@autoshow.com');
  const [password, setPassword] = useState('admin123');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await login(email, password);
      toast.success('Welcome back! 🚗');
      navigate('/admin/dashboard');
    } catch (error) {
      toast.error('Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      {/* Animated Background Elements */}
      <div className="login-bg-effects">
        <div className="bg-glow-1"></div>
        <div className="bg-glow-2"></div>
        <div className="bg-glow-3"></div>
      </div>

      {/* Login Card */}
      <div className="login-card">
        {/* Logo Section */}
        <div className="login-logo">
          <div className="logo-icon">
            <FaCar />
            <div className="logo-ring"></div>
          </div>
          <h1>CAR HUB Admin</h1>
          <p>Sign in to manage your showroom</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="login-form">
          {/* Email Field */}
          <div className="form-group">
            <label>Email Address</label>
            <div className="input-wrapper">
              <FaEnvelope className="input-icon" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Exampls: admin@autoshow.com"
                required
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="form-group">
            <label>Password</label>
            <div className="input-wrapper">
              <FaLock className="input-icon" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="login-options">
            <label className="remember-me">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <span>Remember me</span>
            </label>
            <a href="#" className="forgot-password">
              Forgot password?
            </a>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="btn-login"
            disabled={loading}
          >
            <span className="btn-shimmer"></span>
            <span className="btn-content">
              {loading ? (
                <>
                  <span className="spinner-border"></span>
                  Signing in...
                </>
              ) : (
                <>
                  Sign In
                  <FaArrowRight />
                </>
              )}
            </span>
          </button>

        </form>

        {/* Footer */}
        <div className="login-footer">
          <p>© 2026 AutoShow. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
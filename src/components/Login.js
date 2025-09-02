import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Auth.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your authentication logic here
    console.log('Login attempt with:', { email, password });
    
    // For demo purposes, redirect to dashboard after login
    navigate('/dashboard');
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2>Log In to Your Account</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
            />
          </div>
          <button type="submit" className="auth-btn">
            Log In
          </button>
        </form>
        <p className="auth-link">
          Don't have an account? <span onClick={() => navigate('/register')}>Register now</span>
        </p>
      </div>
    </div>
  );
};

export default Login;
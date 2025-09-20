import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../lib/api'; // Import the loginUser function
import { supabase } from '../lib/supabaseClient'; // Import the Supabase client
import './Auth.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // State for error messages
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors
    try {
      // 1. Authenticate with Supabase
      const { data: supabaseAuthData, error: supabaseAuthError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (supabaseAuthError) {
        throw supabaseAuthError;
      }

      const supabaseToken = supabaseAuthData.session.access_token;

      // 2. Send Supabase JWT to your backend
      const backendResponse = await loginUser(supabaseToken);
      console.log('Backend Login successful:', backendResponse);

      // Store token or user info in localStorage/sessionStorage if needed
      localStorage.setItem('token', supabaseToken); // Store the Supabase token
      navigate('/dashboard');
    } catch (err) {
      console.error('Login failed:', err);
      setError(err.message || 'Login failed. Please check your credentials.');
    }
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
        {error && <p className="error-message">{error}</p>} {/* Display error message */}
        <p className="auth-link">
          Don't have an account? <span onClick={() => navigate('/register')}>Register now</span>
        </p>
      </div>
    </div>
  );
};

export default Login;

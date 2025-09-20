import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../lib/api'; // Import loginUser for backend registration via JWT
import { supabase } from '../lib/supabaseClient'; // Import the Supabase client
import './Auth.css';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState(''); // State for error messages
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      // 1. Sign up with Supabase
      const { data: supabaseAuthData, error: supabaseAuthError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.name, // Store full name in Supabase user metadata
          },
        },
      });

      if (supabaseAuthError) {
        throw supabaseAuthError;
      }

      // If user is created but not confirmed (e.g., email verification needed)
      if (!supabaseAuthData.session) {
        setError('Registration successful! Please check your email to verify your account.');
        // Optionally redirect to a verification message page
        // navigate('/verify-email');
        return;
      }

      const supabaseToken = supabaseAuthData.session.access_token;

      // 2. Send Supabase JWT to your backend for user creation/login
      const backendResponse = await loginUser(supabaseToken);
      console.log('Backend Registration/Login successful:', backendResponse);

      // Optionally, store token or user info in localStorage/sessionStorage
      // localStorage.setItem('token', supabaseToken); // Store the Supabase token if needed for immediate login
      navigate('/login'); // Redirect to login after successful registration
    } catch (err) {
      console.error('Registration failed:', err);
      setError(err.message || 'Registration failed. Please try again.');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2>Create Your Account</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Enter your full name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Create a password"
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              placeholder="Confirm your password"
            />
          </div>
          <button type="submit" className="auth-btn">
            Register Now
          </button>
        </form>
        {error && <p className="error-message">{error}</p>} {/* Display error message */}
        <p className="auth-link">
          Already have an account? <span onClick={() => navigate('/login')}>Log in</span>
        </p>
      </div>
    </div>
  );
};

export default Register;

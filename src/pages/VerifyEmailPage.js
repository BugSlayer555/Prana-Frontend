import React, { useEffect, useState } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import API_BASE_URL from '../config/api';

const VerifyEmailPage = () => {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState('pending');
  const [message, setMessage] = useState('Verifying your email...');
  const { setUserDirectly } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get('token');
    if (!token) {
      setStatus('error');
      setMessage('Invalid or missing verification token.');
      return;
    }
    axios.get(`${API_BASE_URL}/api/auth/verify-email?token=${token}`)
      .then(res => {
        // Check if user needs admin approval
        if (res.data.needsApproval) {
          setStatus('approval');
          setMessage('Email verified successfully! Please wait for admin approval.');
          return;
        }
        
        setStatus('success');
        setMessage('Your email has been verified! Logging you in...');
        
        // Automatically log in the user
        const { token: jwtToken, user } = res.data;
        localStorage.setItem('token', jwtToken);
        axios.defaults.headers.common['Authorization'] = `Bearer ${jwtToken}`;
        
        // Set user in context
        setUserDirectly(user);
        
        // Redirect to dashboard
        setTimeout(() => {
          navigate('/dashboard');
        }, 2000);
      })
      .catch(err => {
        setStatus('error');
        setMessage(err.response?.data?.message || 'Verification failed.');
      });
  }, [searchParams, navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-primary-50 to-accent-50 px-4">
      <div className="bg-white shadow-xl rounded-lg p-8 max-w-md w-full text-center">
        <h2 className="text-2xl font-bold mb-4">Email Verification</h2>
        <p className={
          status === 'success' ? 'text-green-600' : 
          status === 'approval' ? 'text-yellow-600' : 
          'text-red-600'
        }>{message}</p>
        {status === 'success' && (
          <div className="mt-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500 mx-auto"></div>
            <p className="text-sm text-gray-600 mt-2">Redirecting to dashboard...</p>
          </div>
        )}
        {status === 'approval' && (
          <div className="mt-4">
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="h-8 w-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <p className="text-sm text-gray-600 mb-4">Your account is pending admin approval.</p>
            <Link to="/waiting-approval" className="inline-block btn-primary px-6 py-2 rounded-full">Go to Waiting Page</Link>
          </div>
        )}
        {status === 'error' && (
          <Link to="/login" className="mt-6 inline-block btn-primary px-6 py-2 rounded-full">Go to Login</Link>
        )}
      </div>
    </div>
  );
};

export default VerifyEmailPage; 
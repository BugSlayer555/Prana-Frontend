import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import axios from 'axios';

const VerifyEmailPage = () => {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState('pending');
  const [message, setMessage] = useState('Verifying your email...');

  useEffect(() => {
    const token = searchParams.get('token');
    if (!token) {
      setStatus('error');
      setMessage('Invalid or missing verification token.');
      return;
    }
    axios.get('https://prana-backend.onrender.com/api/auth/verify-email?token=' + token)
      .then(res => {
        setStatus('success');
        setMessage('Your email has been verified! You can now log in.');
      })
      .catch(err => {
        setStatus('error');
        setMessage(err.response?.data?.message || 'Verification failed.');
      });
  }, [searchParams]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-primary-50 to-accent-50 px-4">
      <div className="bg-white shadow-xl rounded-lg p-8 max-w-md w-full text-center">
        <h2 className="text-2xl font-bold mb-4">Email Verification</h2>
        <p className={status === 'success' ? 'text-green-600' : 'text-red-600'}>{message}</p>
        {status === 'success' && (
          <Link to="/login" className="mt-6 inline-block btn-primary px-6 py-2 rounded-full">Go to Login</Link>
        )}
      </div>
    </div>
  );
};

export default VerifyEmailPage; 
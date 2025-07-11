import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Heart, CheckCircle, XCircle, Loader, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

const EmailVerificationPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { verifyEmail } = useAuth();
  const [status, setStatus] = useState('verifying'); // 'verifying', 'success', 'pending', 'error'
  const [message, setMessage] = useState('');
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    const token = searchParams.get('token');
    if (!token) {
      setStatus('error');
      setMessage('Invalid verification link. No token provided.');
      return;
    }
    const verifyUserEmail = async () => {
      try {
        const result = await verifyEmail(token);
        if (result.success && result.user) {
          setUserRole(result.user.role);
          if (result.user.role === 'patient') {
            // Patients are auto-approved, redirect to dashboard
            setStatus('success');
            setMessage(result.message || 'Email verified successfully! Welcome to your patient dashboard!');
            setTimeout(() => {
              navigate('/dashboard');
            }, 3000);
          } else if (!result.user.isApproved) {
            // Non-patients need admin approval
            setStatus('pending');
            setMessage('Your email is verified, but your account is pending admin approval. You will be redirected to the waiting page.');
            setTimeout(() => {
              navigate('/waiting-approval');
            }, 3000);
          } else {
            // Already approved, redirect to dashboard
            setStatus('success');
            setMessage(result.message || 'Email verified successfully!');
            setTimeout(() => {
              navigate('/dashboard');
            }, 3000);
          }
        } else if (result.success) {
          setStatus('success');
          setMessage(result.message || 'Email verified successfully!');
          setTimeout(() => {
            navigate('/dashboard');
          }, 3000);
        } else {
          setStatus('error');
          setMessage(result.error || 'Email verification failed.');
        }
      } catch (error) {
        setStatus('error');
        setMessage('An unexpected error occurred. Please try again.');
      }
    };
    verifyUserEmail();
  }, [searchParams, verifyEmail, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-accent-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <Link to="/" className="inline-flex items-center justify-center mb-6">
            <Heart className="h-12 w-12 text-primary-500 mr-2" />
            <span className="text-2xl font-bold font-righteous text-gray-900">
              Prana Hospital
            </span>
          </Link>
          <h2 className="text-3xl font-bold text-gray-900">
            Email Verification
          </h2>
        </div>

        {/* Verification Status */}
        <div className="bg-white shadow-xl rounded-lg p-8 text-center">
          {status === 'verifying' && (
            <div className="flex flex-col items-center">
              <Loader className="h-16 w-16 text-primary-500 animate-spin mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Verifying Your Email
              </h3>
              <p className="text-gray-600">
                Please wait while we verify your email address...
              </p>
            </div>
          )}

          {status === 'success' && (
            <div className="flex flex-col items-center">
              <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Email Verified Successfully!
              </h3>
              <p className="text-gray-600 mb-6">
                {message}
              </p>
              <div className="space-y-3">
                <p className="text-sm text-gray-500">
                  Redirecting to your dashboard...
                </p>
                <Link
                  to="/dashboard"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-200"
                >
                  Go to Dashboard
                </Link>
              </div>
            </div>
          )}

          {status === 'pending' && (
            <div className="flex flex-col items-center">
              <Shield className="h-16 w-16 text-yellow-500 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Account Pending Approval
              </h3>
              <p className="text-gray-600 mb-6">
                {message}
              </p>
              <div className="space-y-3">
                <Link
                  to="/login"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-200"
                >
                  Go to Login
                </Link>
              </div>
            </div>
          )}

          {status === 'error' && (
            <div className="flex flex-col items-center">
              <XCircle className="h-16 w-16 text-red-500 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Verification Failed
              </h3>
              <p className="text-gray-600 mb-6">
                {message}
              </p>
              <div className="space-y-3">
                <Link
                  to="/login"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-200"
                >
                  Go to Login
                </Link>
                <Link
                  to="/register"
                  className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-200"
                >
                  Register Again
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Back to Home */}
        <div className="text-center">
          <Link 
            to="/" 
            className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EmailVerificationPage; 
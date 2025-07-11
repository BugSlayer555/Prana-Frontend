import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Clock, Mail, Heart, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const WaitingApprovalPage = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-accent-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-200 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent-200 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-primary-100 to-accent-100 rounded-full opacity-10 blur-3xl"></div>
      </div>

      <div className="max-w-2xl w-full space-y-8 relative z-10">
        {/* Header */}
        <div className="text-center">
          <Link to="/" className="inline-flex items-center justify-center mb-6 group">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full blur-lg opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
              <Heart className="h-12 w-12 text-white relative z-10" />
            </div>
            <span className="text-3xl font-bold font-righteous text-gray-900 ml-3 group-hover:text-primary-600 transition-colors duration-300">
              Prana Hospital
            </span>
          </Link>
        </div>

        {/* Main Content */}
        <div className="bg-white shadow-2xl rounded-2xl p-8 border border-gray-100">
          <div className="text-center">
            {/* Icon */}
            <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Shield className="h-10 w-10 text-yellow-600" />
            </div>

            {/* Title */}
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Waiting for Admin Approval
            </h1>

            {/* Message */}
            <div className="space-y-4 mb-8">
              <p className="text-lg text-gray-700">
                Hello <span className="font-semibold text-primary-600">{user?.name}</span>! 
                Your email has been verified successfully.
              </p>
              
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Clock className="h-5 w-5 text-yellow-600" />
                  <span className="font-semibold text-yellow-800">Account Pending Approval</span>
                </div>
                <p className="text-yellow-700 text-sm">
                  Your account is currently under review by our administrative team. 
                  This process typically takes 24-48 hours during business days.
                </p>
              </div>

              <p className="text-gray-600">
                You will receive an email notification once your account has been approved 
                and you can access the full system.
              </p>
            </div>

            {/* Role Information */}
            <div className="bg-gray-50 rounded-lg p-4 mb-8">
              <h3 className="font-semibold text-gray-900 mb-2">Account Details</h3>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>Role:</span>
                  <span className="font-medium capitalize">{user?.role}</span>
                </div>
                <div className="flex justify-between">
                  <span>Email:</span>
                  <span className="font-medium">{user?.email}</span>
                </div>
                {user?.department && (
                  <div className="flex justify-between">
                    <span>Department:</span>
                    <span className="font-medium">{user?.department}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Unique ID:</span>
                  <span className="font-mono font-medium">{user?.uniqueId}</span>
                </div>
              </div>
            </div>

            {/* What happens next */}
            <div className="bg-primary-50 border border-primary-200 rounded-lg p-4 mb-8">
              <h3 className="font-semibold text-primary-900 mb-3">What happens next?</h3>
              <div className="space-y-2 text-sm text-primary-800">
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Our admin team will review your application and credentials</span>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>You'll receive an approval email with login instructions</span>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Once approved, you can access your role-specific dashboard</span>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-gray-50 rounded-lg p-4 mb-8">
              <h3 className="font-semibold text-gray-900 mb-2">Need Help?</h3>
              <p className="text-sm text-gray-600 mb-3">
                If you have any questions or need to expedite your approval, please contact us:
              </p>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4 text-gray-400" />
                  <span>admin@praanhospital.com</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-gray-400">📞</span>
                  <span>+1 (555) 123-4567</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                onClick={handleLogout}
                className="w-full bg-gray-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-700 transition-colors duration-200 flex items-center justify-center space-x-2"
              >
                <LogOut className="h-5 w-5" />
                <span>Logout</span>
              </button>
              
              <Link
                to="/login"
                className="block w-full bg-primary-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors duration-200 text-center"
              >
                Back to Login
              </Link>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center">
          <p className="text-sm text-gray-500">
            Thank you for choosing Prana Hospital Management System
          </p>
        </div>
      </div>
    </div>
  );
};

export default WaitingApprovalPage; 
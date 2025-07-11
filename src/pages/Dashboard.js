import React from 'react';
import { useAuth } from '../context/AuthContext';
import AdminDashboard from './dashboards/AdminDashboard';
import DoctorDashboard from './dashboards/DoctorDashboard';
import NurseDashboard from './dashboards/NurseDashboard';
import ReceptionistDashboard from './dashboards/ReceptionistDashboard';
import PharmacyDashboard from './dashboards/PharmacyDashboard';
import PatientDashboard from './dashboards/PatientDashboard';

const Dashboard = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  // Render role-specific dashboard
  switch (user.role) {
    case 'admin':
      return <AdminDashboard />;
    case 'doctor':
      return <DoctorDashboard />;
    case 'nurse':
      return <NurseDashboard />;
    case 'receptionist':
      return <ReceptionistDashboard />;
    case 'pharmacy':
      return <PharmacyDashboard />;
    case 'patient':
      return <PatientDashboard />;
    default:
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h2>
            <p className="text-gray-600">Your role does not have access to the dashboard.</p>
          </div>
        </div>
      );
  }
};

export default Dashboard;

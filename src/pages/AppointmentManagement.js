import React from 'react';
import DashboardLayout from '../components/DashboardLayout';

const AppointmentManagement = () => {
  return (
    <DashboardLayout title="Appointment Management">
      <div className="space-y-6">
        <div className="card">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Appointment Management</h2>
          <p className="text-gray-600">
            This page will contain appointment management features including:
          </p>
          <ul className="mt-4 space-y-2 text-gray-600">
            <li>• Schedule appointments</li>
            <li>• View appointment calendar</li>
            <li>• Manage appointment status</li>
            <li>• Send reminders</li>
          </ul>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AppointmentManagement;

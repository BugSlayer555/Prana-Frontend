import React from 'react';
import DashboardLayout from '../components/DashboardLayout';

const DoctorManagement = () => {
  return (
    <DashboardLayout title="Doctor Management">
      <div className="space-y-6">
        <div className="card">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Doctor Management</h2>
          <p className="text-gray-600">
            This page will contain doctor management features including:
          </p>
          <ul className="mt-4 space-y-2 text-gray-600">
            <li>• Doctor registration and profiles</li>
            <li>• Specialization management</li>
            <li>• Schedule management</li>
            <li>• Performance tracking</li>
          </ul>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DoctorManagement;

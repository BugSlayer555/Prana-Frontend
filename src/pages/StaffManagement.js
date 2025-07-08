import React from 'react';
import DashboardLayout from '../components/DashboardLayout';

const StaffManagement = () => {
  return (
    <DashboardLayout title="Staff Management">
      <div className="space-y-6">
        <div className="card">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Staff Management</h2>
          <p className="text-gray-600">
            This page will contain staff management features including:
          </p>
          <ul className="mt-4 space-y-2 text-gray-600">
            <li>• Employee records</li>
            <li>• Shift scheduling</li>
            <li>• Attendance tracking</li>
            <li>• Payroll management</li>
          </ul>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default StaffManagement;

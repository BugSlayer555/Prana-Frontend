import React from 'react';
import DashboardLayout from '../components/DashboardLayout';

const ReportsPage = () => {
  return (
    <DashboardLayout title="Reports & Analytics">
      <div className="space-y-6">
        <div className="card">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Reports & Analytics</h2>
          <p className="text-gray-600">
            This page will contain reporting features including:
          </p>
          <ul className="mt-4 space-y-2 text-gray-600">
            <li>• Financial reports</li>
            <li>• Patient statistics</li>
            <li>• Performance analytics</li>
            <li>• Custom report generation</li>
          </ul>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ReportsPage;

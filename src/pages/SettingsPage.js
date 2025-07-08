import React from 'react';
import DashboardLayout from '../components/DashboardLayout';

const SettingsPage = () => {
  return (
    <DashboardLayout title="Settings">
      <div className="space-y-6">
        <div className="card">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Settings</h2>
          <p className="text-gray-600">
            This page will contain system settings including:
          </p>
          <ul className="mt-4 space-y-2 text-gray-600">
            <li>• Hospital configuration</li>
            <li>• User management</li>
            <li>• System preferences</li>
            <li>• Security settings</li>
          </ul>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SettingsPage;

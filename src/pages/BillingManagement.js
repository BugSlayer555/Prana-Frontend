import React from 'react';
import DashboardLayout from '../components/DashboardLayout';

const BillingManagement = () => {
  return (
    <DashboardLayout title="Billing Management">
      <div className="space-y-6">
        <div className="card">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Billing Management</h2>
          <p className="text-gray-600">
            This page will contain billing management features including:
          </p>
          <ul className="mt-4 space-y-2 text-gray-600">
            <li>• Generate invoices</li>
            <li>• Track payments</li>
            <li>• Insurance claim processing</li>
            <li>• Financial reporting</li>
          </ul>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default BillingManagement;

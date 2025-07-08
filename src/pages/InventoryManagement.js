import React from 'react';
import DashboardLayout from '../components/DashboardLayout';

const InventoryManagement = () => {
  return (
    <DashboardLayout title="Inventory Management">
      <div className="space-y-6">
        <div className="card">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Inventory Management</h2>
          <p className="text-gray-600">
            This page will contain inventory management features including:
          </p>
          <ul className="mt-4 space-y-2 text-gray-600">
            <li>• Medical supplies tracking</li>
            <li>• Equipment management</li>
            <li>• Stock alerts</li>
            <li>• Purchase orders</li>
          </ul>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default InventoryManagement;

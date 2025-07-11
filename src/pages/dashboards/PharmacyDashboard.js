import React, { useState, useEffect } from 'react';
import { 
  Pill, 
  Package, 
  AlertTriangle,
  CheckCircle,
  Clock,
  TrendingUp,
  TrendingDown,
  Users,
  FileText,
  ShoppingCart,
  Truck,
  DollarSign,
  Activity,
  Calendar,
  Search,
  Filter
} from 'lucide-react';
import DashboardLayout from '../../components/DashboardLayout';
import { useAuth } from '../../context/AuthContext';

const PharmacyDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalMedications: 1250,
    prescriptionsFilled: 45,
    pendingPrescriptions: 12,
    lowStockItems: 8,
    expiredMedications: 3,
    monthlyRevenue: 85000
  });

  const [pendingPrescriptions] = useState([
    { id: 1, patient: 'John Doe', medication: 'Aspirin 100mg', quantity: 30, doctor: 'Dr. Sarah Johnson', time: '09:00 AM', priority: 'normal' },
    { id: 2, patient: 'Sarah Wilson', medication: 'Insulin 10 units', quantity: 15, doctor: 'Dr. Mike Brown', time: '09:30 AM', priority: 'high' },
    { id: 3, patient: 'Mike Johnson', medication: 'Antibiotic 500mg', quantity: 20, doctor: 'Dr. Emily Davis', time: '10:00 AM', priority: 'urgent' },
    { id: 4, patient: 'Emily Brown', medication: 'Blood Pressure Med', quantity: 25, doctor: 'Dr. John Smith', time: '10:30 AM', priority: 'normal' }
  ]);

  const [lowStockItems] = useState([
    { id: 1, medication: 'Paracetamol 500mg', currentStock: 15, reorderLevel: 50, supplier: 'MedSupply Co.', status: 'Critical' },
    { id: 2, medication: 'Amoxicillin 250mg', currentStock: 25, reorderLevel: 30, supplier: 'PharmaCorp', status: 'Low' },
    { id: 3, medication: 'Omeprazole 20mg', currentStock: 8, reorderLevel: 20, supplier: 'MedSupply Co.', status: 'Critical' }
  ]);

  const [recentDispenses] = useState([
    { id: 1, patient: 'John Doe', medication: 'Aspirin 100mg', quantity: 30, pharmacist: 'Pharm. Lisa', time: '08:30 AM', status: 'Dispensed' },
    { id: 2, patient: 'Sarah Wilson', medication: 'Insulin 10 units', quantity: 15, pharmacist: 'Pharm. Mike', time: '09:15 AM', status: 'Dispensed' },
    { id: 3, patient: 'Mike Johnson', medication: 'Antibiotic 500mg', quantity: 20, pharmacist: 'Pharm. Lisa', time: '09:45 AM', status: 'Pending' }
  ]);

  const StatCard = ({ title, value, icon: Icon, change, changeType = 'positive', color = 'primary' }) => {
    const colorClasses = {
      primary: 'bg-primary-500',
      green: 'bg-green-500',
      blue: 'bg-blue-500',
      orange: 'bg-orange-500',
      purple: 'bg-purple-500',
      red: 'bg-red-500'
    };

    return (
      <div className="stat-card">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
            <p className="text-2xl font-bold text-gray-900 mb-2">{value}</p>
            {change && (
              <div className={`flex items-center ${
                changeType === 'positive' ? 'text-green-600' : 'text-red-600'
              }`}>
                {changeType === 'positive' ? (
                  <TrendingUp className="h-4 w-4 mr-1" />
                ) : (
                  <TrendingDown className="h-4 w-4 mr-1" />
                )}
                <span className="text-sm font-medium">{change}</span>
              </div>
            )}
          </div>
          <div className={`stat-card-icon ${colorClasses[color]} ml-4`}>
            <Icon className="h-6 w-6 text-white" />
          </div>
        </div>
      </div>
    );
  };

  const QuickActionCard = ({ title, description, icon: Icon, color, onClick }) => {
    const colorClasses = {
      primary: 'bg-primary-50 border-primary-200 text-primary-700 hover:bg-primary-100',
      green: 'bg-green-50 border-green-200 text-green-700 hover:bg-green-100',
      blue: 'bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100',
      orange: 'bg-orange-50 border-orange-200 text-orange-700 hover:bg-orange-100',
      purple: 'bg-purple-50 border-purple-200 text-purple-700 hover:bg-purple-100',
      red: 'bg-red-50 border-red-200 text-red-700 hover:bg-red-100'
    };

    return (
      <button
        onClick={onClick}
        className={`w-full p-4 border-2 rounded-xl transition-all duration-200 ${colorClasses[color]} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500`}
      >
        <div className="flex items-center space-x-3">
          <Icon className="h-6 w-6 flex-shrink-0" />
          <div className="text-left">
            <h3 className="font-semibold text-sm">{title}</h3>
            <p className="text-xs opacity-80 mt-1">{description}</p>
          </div>
        </div>
      </button>
    );
  };

  return (
    <DashboardLayout title="Pharmacy Dashboard">
      <div className="section-spacing">
        {/* Welcome Section */}
        <div className="card gradient-error text-white">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="heading-responsive text-white">Welcome back, Pharm. {user?.name}!</h1>
              <p className="text-red-100 mt-2 text-responsive">Pharmacy Management System</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-red-100">Today's Status</p>
              <p className="text-lg font-semibold text-white">{stats.pendingPrescriptions} Pending</p>
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
          <StatCard
            title="Total Medications"
            value={stats.totalMedications.toLocaleString()}
            icon={Pill}
            change="+25"
            color="blue"
          />
          <StatCard
            title="Prescriptions Filled"
            value={stats.prescriptionsFilled}
            icon={CheckCircle}
            change="+8"
            color="green"
          />
          <StatCard
            title="Pending Prescriptions"
            value={stats.pendingPrescriptions}
            icon={Clock}
            change="+3"
            color="orange"
          />
          <StatCard
            title="Low Stock Items"
            value={stats.lowStockItems}
            icon={AlertTriangle}
            change="+2"
            color="red"
          />
          <StatCard
            title="Expired Medications"
            value={stats.expiredMedications}
            icon={Package}
            change="-1"
            changeType="negative"
            color="purple"
          />
          <StatCard
            title="Monthly Revenue"
            value={`$${(stats.monthlyRevenue / 1000).toFixed(0)}K`}
            icon={DollarSign}
            change="+12%"
            color="primary"
          />
        </div>

        {/* Quick Actions */}
        <div className="card">
          <h3 className="heading-responsive text-gray-900 mb-6">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <QuickActionCard
              title="Fill Prescription"
              description="Process new prescriptions"
              icon={Pill}
              color="blue"
              onClick={() => {/* Navigate to prescription filling */}}
            />
            <QuickActionCard
              title="Inventory Check"
              description="Check medication stock levels"
              icon={Package}
              color="green"
              onClick={() => {/* Navigate to inventory */}}
            />
            <QuickActionCard
              title="Order Supplies"
              description="Place medication orders"
              icon={ShoppingCart}
              color="orange"
              onClick={() => {/* Navigate to ordering */}}
            />
            <QuickActionCard
              title="Patient Records"
              description="Access patient medication history"
              icon={FileText}
              color="purple"
              onClick={() => {/* Navigate to records */}}
            />
            <QuickActionCard
              title="Drug Interactions"
              description="Check medication interactions"
              icon={Search}
              color="red"
              onClick={() => {/* Navigate to interactions */}}
            />
            <QuickActionCard
              title="Delivery Tracking"
              description="Track medication deliveries"
              icon={Truck}
              color="primary"
              onClick={() => {/* Navigate to tracking */}}
            />
          </div>
        </div>

        {/* Pending Prescriptions and Low Stock Items */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Pending Prescriptions */}
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <h3 className="heading-responsive text-gray-900">Pending Prescriptions</h3>
              <button className="text-primary-600 hover:text-primary-700 text-sm font-medium transition-colors duration-200">
                View All
              </button>
            </div>
            <div className="card-spacing">
              {pendingPrescriptions.map((prescription) => (
                <div key={prescription.id} className="flex items-center justify-between p-4 rounded-lg bg-gray-50 border border-gray-100">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${
                      prescription.priority === 'urgent' ? 'bg-red-500' :
                      prescription.priority === 'high' ? 'bg-orange-500' :
                      'bg-green-500'
                    }`} />
                    <div>
                      <p className="text-sm font-medium text-gray-900">{prescription.patient}</p>
                      <p className="text-xs text-gray-500">{prescription.medication} • Qty: {prescription.quantity}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">{prescription.time}</p>
                    <p className="text-xs text-gray-500">{prescription.doctor}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Low Stock Items */}
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <h3 className="heading-responsive text-gray-900">Low Stock Alerts</h3>
              <button className="text-primary-600 hover:text-primary-700 text-sm font-medium transition-colors duration-200">
                View All
              </button>
            </div>
            <div className="card-spacing">
              {lowStockItems.map((item) => (
                <div key={item.id} className="p-4 rounded-lg bg-gray-50 border border-gray-100">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{item.medication}</p>
                      <p className="text-xs text-gray-500">Supplier: {item.supplier}</p>
                    </div>
                    <span className={`badge ${
                      item.status === 'Critical' ? 'badge-error' :
                      'badge-warning'
                    }`}>
                      {item.status}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500">Current Stock</p>
                      <p className="font-medium text-gray-900">{item.currentStock}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Reorder Level</p>
                      <p className="font-medium text-gray-900">{item.reorderLevel}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Dispenses */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h3 className="heading-responsive text-gray-900">Recent Dispenses</h3>
            <button className="text-primary-600 hover:text-primary-700 text-sm font-medium transition-colors duration-200">
              View All
            </button>
          </div>
          <div className="table-container">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="table-header">
                <tr>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Patient
                  </th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Medication
                  </th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Quantity
                  </th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Pharmacist
                  </th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Time
                  </th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentDispenses.map((dispense) => (
                  <tr key={dispense.id} className="table-row">
                    <td className="table-cell">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <Users className="h-4 w-4 text-blue-600" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{dispense.patient}</div>
                        </div>
                      </div>
                    </td>
                    <td className="table-cell">
                      <div className="flex items-center">
                        <Pill className="h-4 w-4 text-blue-600 mr-2" />
                        {dispense.medication}
                      </div>
                    </td>
                    <td className="table-cell">
                      {dispense.quantity}
                    </td>
                    <td className="table-cell text-gray-500">
                      {dispense.pharmacist}
                    </td>
                    <td className="table-cell text-gray-500">
                      {dispense.time}
                    </td>
                    <td className="table-cell">
                      <span className={`badge ${
                        dispense.status === 'Dispensed' ? 'badge-success' :
                        'badge-warning'
                      }`}>
                        {dispense.status}
                      </span>
                    </td>
                    <td className="table-cell text-sm font-medium">
                      {dispense.status === 'Pending' && (
                        <>
                          <button className="text-green-600 hover:text-green-900 mr-3 transition-colors duration-200">Dispense</button>
                          <button className="text-primary-600 hover:text-primary-900 transition-colors duration-200">Review</button>
                        </>
                      )}
                      {dispense.status === 'Dispensed' && (
                        <button className="text-primary-600 hover:text-primary-900 transition-colors duration-200">View Details</button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default PharmacyDashboard; 
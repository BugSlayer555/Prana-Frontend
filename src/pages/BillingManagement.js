import React, { useState } from 'react';
import { Plus, Search, Edit, Trash2, Eye, Phone, Mail, Calendar, DollarSign, Receipt, CreditCard } from 'lucide-react';
import DashboardLayout from '../components/DashboardLayout';

const BillingManagement = () => {
  const [bills, setBills] = useState([
    {
      id: 1,
      patientName: 'John Doe',
      patientId: 'P001',
      amount: 250.00,
      date: '2024-01-25',
      dueDate: '2024-02-25',
      status: 'Paid',
      type: 'Consultation',
      insurance: 'Blue Cross',
      phone: '+1-555-0123',
      email: 'john.doe@email.com'
    },
    {
      id: 2,
      patientName: 'Jane Smith',
      patientId: 'P002',
      amount: 450.00,
      date: '2024-01-24',
      dueDate: '2024-02-24',
      status: 'Pending',
      type: 'Laboratory',
      insurance: 'Aetna',
      phone: '+1-555-0124',
      email: 'jane.smith@email.com'
    },
    {
      id: 3,
      patientName: 'Robert Wilson',
      patientId: 'P003',
      amount: 1200.00,
      date: '2024-01-23',
      dueDate: '2024-02-23',
      status: 'Overdue',
      type: 'Surgery',
      insurance: 'Cigna',
      phone: '+1-555-0125',
      email: 'robert.wilson@email.com'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedBill, setSelectedBill] = useState(null);

  const filteredBills = bills.filter(bill =>
    bill.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    bill.patientId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    bill.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status) => {
    switch (status) {
      case 'Paid': return 'badge-success';
      case 'Pending': return 'badge-warning';
      case 'Overdue': return 'badge-error';
      default: return 'badge-warning';
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'Consultation': return 'badge-primary';
      case 'Laboratory': return 'badge-secondary';
      case 'Surgery': return 'badge-error';
      case 'Medication': return 'badge-accent';
      default: return 'badge-primary';
    }
  };

  return (
    <DashboardLayout title="Billing Management">
      <div className="section-spacing">
        {/* Header and Search */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="heading-responsive text-gray-900">Billing</h2>
            <p className="text-gray-600 text-responsive">Manage patient billing and insurance claims</p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="btn-primary mt-4 sm:mt-0 inline-flex items-center gap-2"
          >
            <Plus className="h-5 w-5" />
            Create Bill
          </button>
        </div>

        {/* Search and Filters */}
        <div className="card">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search bills by patient name, ID, or type..."
                className="input-field pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select className="input-field">
              <option>All Types</option>
              <option>Consultation</option>
              <option>Laboratory</option>
              <option>Surgery</option>
              <option>Medication</option>
            </select>
            <select className="input-field">
              <option>All Status</option>
              <option>Paid</option>
              <option>Pending</option>
              <option>Overdue</option>
            </select>
          </div>
        </div>

        {/* Bills Table */}
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="table-header">
                <tr>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Patient
                  </th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Insurance
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
                {filteredBills.map((bill) => (
                  <tr key={bill.id} className="table-row">
                    <td className="table-cell">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{bill.patientName}</div>
                        <div className="text-sm text-gray-500">ID: {bill.patientId}</div>
                      </div>
                    </td>
                    <td className="table-cell">
                      <div className="flex items-center">
                        <DollarSign className="h-4 w-4 text-green-500 mr-1" />
                        <span className="text-sm font-medium text-gray-900">${bill.amount.toFixed(2)}</span>
                      </div>
                    </td>
                    <td className="table-cell">
                      <div className="flex flex-col">
                        <div className="flex items-center text-sm text-gray-900">
                          <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                          {new Date(bill.date).toLocaleDateString()}
                        </div>
                        <div className="text-sm text-gray-500">
                          Due: {new Date(bill.dueDate).toLocaleDateString()}
                        </div>
                      </div>
                    </td>
                    <td className="table-cell">
                      <span className={`badge ${getTypeColor(bill.type)}`}>
                        {bill.type}
                      </span>
                    </td>
                    <td className="table-cell text-sm text-gray-900">
                      {bill.insurance}
                    </td>
                    <td className="table-cell">
                      <span className={`badge ${getStatusColor(bill.status)}`}>
                        {bill.status}
                      </span>
                    </td>
                    <td className="table-cell text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => setSelectedBill(bill)}
                          className="text-primary-600 hover:text-primary-900 transition-colors duration-200"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button className="text-primary-600 hover:text-primary-900 transition-colors duration-200">
                          <Edit className="h-4 w-4" />
                        </button>
                        <button className="text-red-600 hover:text-red-900 transition-colors duration-200">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Bill Details Modal */}
        {selectedBill && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Bill Details</h3>
                  <button
                    onClick={() => setSelectedBill(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    ×
                  </button>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Patient Name</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedBill.patientName}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Patient ID</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedBill.patientId}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Amount</label>
                    <p className="mt-1 text-sm text-gray-900">${selectedBill.amount.toFixed(2)}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Type</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedBill.type}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Date</label>
                    <p className="mt-1 text-sm text-gray-900">{new Date(selectedBill.date).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Due Date</label>
                    <p className="mt-1 text-sm text-gray-900">{new Date(selectedBill.dueDate).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Insurance</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedBill.insurance}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Status</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedBill.status}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Phone</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedBill.phone}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedBill.email}</p>
                  </div>
                </div>
                
                <div className="mt-6 flex justify-end space-x-3">
                  <button
                    onClick={() => setSelectedBill(null)}
                    className="btn-outline"
                  >
                    Close
                  </button>
                  <button className="btn-primary">
                    Edit Bill
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default BillingManagement;

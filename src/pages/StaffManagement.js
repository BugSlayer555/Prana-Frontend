import React, { useState } from 'react';
import { Plus, Search, Edit, Trash2, Eye, Phone, Mail, Calendar, Users, Badge } from 'lucide-react';
import DashboardLayout from '../components/DashboardLayout';

const StaffManagement = () => {
  const [staff, setStaff] = useState([
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'Nurse',
      department: 'Emergency',
      phone: '+1-555-0123',
      email: 'sarah.johnson@hospital.com',
      hireDate: '2020-03-15',
      status: 'Active',
      experience: '4 years',
      salary: 45000
    },
    {
      id: 2,
      name: 'Mike Brown',
      role: 'Receptionist',
      department: 'Front Desk',
      phone: '+1-555-0124',
      email: 'mike.brown@hospital.com',
      hireDate: '2021-06-20',
      status: 'Active',
      experience: '3 years',
      salary: 35000
    },
    {
      id: 3,
      name: 'Emily Davis',
      role: 'Pharmacist',
      department: 'Pharmacy',
      phone: '+1-555-0125',
      email: 'emily.davis@hospital.com',
      hireDate: '2019-11-10',
      status: 'Active',
      experience: '5 years',
      salary: 55000
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState(null);

  const filteredStaff = staff.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getRoleColor = (role) => {
    switch (role) {
      case 'Nurse': return 'badge-primary';
      case 'Receptionist': return 'badge-secondary';
      case 'Pharmacist': return 'badge-accent';
      case 'Technician': return 'badge-warning';
      default: return 'badge-primary';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'badge-success';
      case 'On Leave': return 'badge-warning';
      case 'Terminated': return 'badge-error';
      default: return 'badge-success';
    }
  };

  return (
    <DashboardLayout title="Staff Management">
      <div className="section-spacing">
        {/* Header and Search */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="heading-responsive text-gray-900">Staff</h2>
            <p className="text-gray-600 text-responsive">Manage hospital staff and personnel</p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="btn-primary mt-4 sm:mt-0 inline-flex items-center gap-2"
          >
            <Plus className="h-5 w-5" />
            Add Staff
          </button>
        </div>

        {/* Search and Filters */}
        <div className="card">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search staff by name, role, or department..."
                className="input-field pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select className="input-field">
              <option>All Roles</option>
              <option>Nurse</option>
              <option>Receptionist</option>
              <option>Pharmacist</option>
              <option>Technician</option>
            </select>
            <select className="input-field">
              <option>All Departments</option>
              <option>Emergency</option>
              <option>Front Desk</option>
              <option>Pharmacy</option>
              <option>Laboratory</option>
            </select>
          </div>
        </div>

        {/* Staff Table */}
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="table-header">
                <tr>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Staff Member
                  </th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Department
                  </th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Hire Date
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
                {filteredStaff.map((member) => (
                  <tr key={member.id} className="table-row">
                    <td className="table-cell">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                          <Users className="h-5 w-5 text-primary-600" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{member.name}</div>
                          <div className="text-sm text-gray-500">{member.experience}</div>
                        </div>
                      </div>
                    </td>
                    <td className="table-cell">
                      <span className={`badge ${getRoleColor(member.role)}`}>
                        {member.role}
                      </span>
                    </td>
                    <td className="table-cell text-sm text-gray-900">
                      {member.department}
                    </td>
                    <td className="table-cell">
                      <div className="flex flex-col space-y-1">
                        <div className="flex items-center text-sm text-gray-900">
                          <Phone className="h-4 w-4 mr-2 text-gray-400" />
                          {member.phone}
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <Mail className="h-4 w-4 mr-2 text-gray-400" />
                          {member.email}
                        </div>
                      </div>
                    </td>
                    <td className="table-cell text-sm text-gray-900">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                        {new Date(member.hireDate).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="table-cell">
                      <span className={`badge ${getStatusColor(member.status)}`}>
                        {member.status}
                      </span>
                    </td>
                    <td className="table-cell text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => setSelectedStaff(member)}
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

        {/* Staff Details Modal */}
        {selectedStaff && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Staff Details</h3>
                  <button
                    onClick={() => setSelectedStaff(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    ×
                  </button>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Name</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedStaff.name}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Role</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedStaff.role}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Department</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedStaff.department}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Experience</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedStaff.experience}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Phone</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedStaff.phone}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedStaff.email}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Hire Date</label>
                    <p className="mt-1 text-sm text-gray-900">{new Date(selectedStaff.hireDate).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Status</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedStaff.status}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Salary</label>
                    <p className="mt-1 text-sm text-gray-900">${selectedStaff.salary.toLocaleString()}</p>
                  </div>
                </div>
                
                <div className="mt-6 flex justify-end space-x-3">
                  <button
                    onClick={() => setSelectedStaff(null)}
                    className="btn-outline"
                  >
                    Close
                  </button>
                  <button className="btn-primary">
                    Edit Staff
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

export default StaffManagement;

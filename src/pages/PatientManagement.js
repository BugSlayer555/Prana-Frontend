import React, { useState, useEffect } from 'react';
import { Plus, Search, Edit, Trash2, Eye, Phone, Mail, Calendar } from 'lucide-react';
import DashboardLayout from '../components/DashboardLayout';
import axios from 'axios';
import API_BASE_URL from '../config/api';
import toast from 'react-hot-toast';

const PatientManagement = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/auth/users?role=patient&approved=true`);
        setPatients(response.data);
      } catch (error) {
        toast.error('Failed to load patients');
      } finally {
        setLoading(false);
      }
    };
    fetchPatients();
  }, []);

  const filteredPatients = patients.filter(patient =>
    (patient.name && patient.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (patient.email && patient.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (patient.uniqueId && patient.uniqueId.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <DashboardLayout title="Patient Management">
      <div className="section-spacing">
        {/* Header and Search */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="heading-responsive text-gray-900">Patients</h2>
            <p className="text-gray-600 text-responsive">Manage patient records and information</p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="btn-primary mt-4 sm:mt-0 inline-flex items-center gap-2"
          >
            <Plus className="h-5 w-5" />
            Add Patient
          </button>
        </div>

        {/* Search and Filters */}
        <div className="card">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search patients by name, email, or unique ID..."
                className="input-field pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select className="input-field">
              <option>All Patients</option>
              <option>Active</option>
              <option>Inactive</option>
            </select>
            <select className="input-field">
              <option>All Blood Groups</option>
              <option>A+</option>
              <option>A-</option>
              <option>B+</option>
              <option>B-</option>
              <option>O+</option>
              <option>O-</option>
              <option>AB+</option>
              <option>AB-</option>
            </select>
          </div>
        </div>

        {/* Patients Table */}
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="table-header">
                <tr>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Patient
                  </th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Blood Group
                  </th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Visit
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
                {loading ? (
                  <tr>
                    <td colSpan="6" className="px-6 py-4 text-center">
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
                        <span className="ml-2 text-gray-600">Loading patients...</span>
                      </div>
                    </td>
                  </tr>
                ) : filteredPatients.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                      No patients found.
                    </td>
                  </tr>
                ) : (
                  filteredPatients.map((patient) => (
                    <tr key={patient._id} className="table-row">
                      <td className="table-cell">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{patient.name}</div>
                          <div className="text-sm text-gray-500">{patient.age ? `${patient.age} years, ` : ''}{patient.gender}</div>
                        </div>
                      </td>
                      <td className="table-cell">
                        <div className="flex flex-col space-y-1">
                          <div className="flex items-center text-sm text-gray-900">
                            <Phone className="h-4 w-4 mr-2 text-gray-400" />
                            {patient.phone}
                          </div>
                          <div className="flex items-center text-sm text-gray-500">
                            <Mail className="h-4 w-4 mr-2 text-gray-400" />
                            {patient.email}
                          </div>
                        </div>
                      </td>
                      <td className="table-cell">
                        <span className="badge badge-primary">
                          {patient.bloodGroup || '-'}
                        </span>
                      </td>
                      <td className="table-cell text-sm text-gray-900">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                          {patient.lastVisit ? new Date(patient.lastVisit).toLocaleDateString() : '-'}
                        </div>
                      </td>
                      <td className="table-cell">
                        <span className={`badge ${
                          patient.status === 'Active' 
                            ? 'badge-success' 
                            : 'badge-warning'
                        }`}>
                          {patient.status || 'Active'}
                        </span>
                      </td>
                      <td className="table-cell text-sm font-medium">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => setSelectedPatient(patient)}
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
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Patient Details Modal */}
        {selectedPatient && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Patient Details</h3>
                  <button
                    onClick={() => setSelectedPatient(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    ×
                  </button>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Name</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedPatient.name}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Age</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedPatient.age} years</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Gender</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedPatient.gender}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Blood Group</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedPatient.bloodGroup}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Phone</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedPatient.phone}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedPatient.email}</p>
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700">Address</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedPatient.address}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Emergency Contact</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedPatient.emergencyContact}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Last Visit</label>
                    <p className="mt-1 text-sm text-gray-900">{new Date(selectedPatient.lastVisit).toLocaleDateString()}</p>
                  </div>
                </div>
                
                <div className="mt-6 flex justify-end space-x-3">
                  <button
                    onClick={() => setSelectedPatient(null)}
                    className="btn-outline"
                  >
                    Close
                  </button>
                  <button className="btn-primary">
                    Edit Patient
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

export default PatientManagement;

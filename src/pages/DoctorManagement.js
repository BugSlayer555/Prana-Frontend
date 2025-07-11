import React, { useState } from 'react';
import { Plus, Search, Edit, Trash2, Eye, Phone, Mail, Calendar, Stethoscope, Award } from 'lucide-react';
import DashboardLayout from '../components/DashboardLayout';

const DoctorManagement = () => {
  const [doctors, setDoctors] = useState([
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      specialization: 'Cardiology',
      phone: '+1-555-0123',
      email: 'sarah.johnson@hospital.com',
      experience: '15 years',
      education: 'MD, Cardiology',
      status: 'Active',
      patients: 45,
      rating: 4.8
    },
    {
      id: 2,
      name: 'Dr. Mike Brown',
      specialization: 'Neurology',
      phone: '+1-555-0124',
      email: 'mike.brown@hospital.com',
      experience: '12 years',
      education: 'MD, Neurology',
      status: 'Active',
      patients: 38,
      rating: 4.9
    },
    {
      id: 3,
      name: 'Dr. Emily Davis',
      specialization: 'Pediatrics',
      phone: '+1-555-0125',
      email: 'emily.davis@hospital.com',
      experience: '8 years',
      education: 'MD, Pediatrics',
      status: 'Active',
      patients: 52,
      rating: 4.7
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  const filteredDoctors = doctors.filter(doctor =>
    doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doctor.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout title="Doctor Management">
      <div className="section-spacing">
        {/* Header and Search */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="heading-responsive text-gray-900">Doctors</h2>
            <p className="text-gray-600 text-responsive">Manage doctor profiles and specializations</p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="btn-primary mt-4 sm:mt-0 inline-flex items-center gap-2"
          >
            <Plus className="h-5 w-5" />
            Add Doctor
          </button>
        </div>

        {/* Search and Filters */}
        <div className="card">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search doctors by name, specialization, or email..."
                className="input-field pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select className="input-field">
              <option>All Specializations</option>
              <option>Cardiology</option>
              <option>Neurology</option>
              <option>Pediatrics</option>
              <option>Orthopedics</option>
              <option>Dermatology</option>
            </select>
            <select className="input-field">
              <option>All Status</option>
              <option>Active</option>
              <option>Inactive</option>
              <option>On Leave</option>
            </select>
          </div>
        </div>

        {/* Doctors Table */}
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="table-header">
                <tr>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Doctor
                  </th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Specialization
                  </th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Experience
                  </th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Patients
                  </th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Rating
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
                {filteredDoctors.map((doctor) => (
                  <tr key={doctor.id} className="table-row">
                    <td className="table-cell">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                          <Stethoscope className="h-5 w-5 text-primary-600" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{doctor.name}</div>
                          <div className="text-sm text-gray-500">{doctor.education}</div>
                        </div>
                      </div>
                    </td>
                    <td className="table-cell">
                      <span className="badge badge-primary">
                        {doctor.specialization}
                      </span>
                    </td>
                    <td className="table-cell">
                      <div className="flex flex-col space-y-1">
                        <div className="flex items-center text-sm text-gray-900">
                          <Phone className="h-4 w-4 mr-2 text-gray-400" />
                          {doctor.phone}
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <Mail className="h-4 w-4 mr-2 text-gray-400" />
                          {doctor.email}
                        </div>
                      </div>
                    </td>
                    <td className="table-cell text-sm text-gray-900">
                      {doctor.experience}
                    </td>
                    <td className="table-cell text-sm text-gray-900">
                      {doctor.patients} patients
                    </td>
                    <td className="table-cell">
                      <div className="flex items-center">
                        <Award className="h-4 w-4 text-yellow-500 mr-1" />
                        <span className="text-sm font-medium text-gray-900">{doctor.rating}</span>
                      </div>
                    </td>
                    <td className="table-cell">
                      <span className={`badge ${
                        doctor.status === 'Active' 
                          ? 'badge-success' 
                          : doctor.status === 'On Leave'
                          ? 'badge-warning'
                          : 'badge-error'
                      }`}>
                        {doctor.status}
                      </span>
                    </td>
                    <td className="table-cell text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => setSelectedDoctor(doctor)}
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

        {/* Doctor Details Modal */}
        {selectedDoctor && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Doctor Details</h3>
                  <button
                    onClick={() => setSelectedDoctor(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    ×
                  </button>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Name</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedDoctor.name}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Specialization</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedDoctor.specialization}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Education</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedDoctor.education}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Experience</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedDoctor.experience}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Phone</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedDoctor.phone}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedDoctor.email}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Current Patients</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedDoctor.patients}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Rating</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedDoctor.rating}/5.0</p>
                  </div>
                </div>
                
                <div className="mt-6 flex justify-end space-x-3">
                  <button
                    onClick={() => setSelectedDoctor(null)}
                    className="btn-outline"
                  >
                    Close
                  </button>
                  <button className="btn-primary">
                    Edit Doctor
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

export default DoctorManagement;

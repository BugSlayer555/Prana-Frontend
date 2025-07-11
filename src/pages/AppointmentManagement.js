import React, { useState } from 'react';
import { Plus, Search, Edit, Trash2, Eye, Phone, Mail, Calendar, Clock, User, Stethoscope } from 'lucide-react';
import DashboardLayout from '../components/DashboardLayout';

const AppointmentManagement = () => {
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      patientName: 'John Doe',
      doctorName: 'Dr. Sarah Johnson',
      date: '2024-01-25',
      time: '10:00 AM',
      type: 'Consultation',
      status: 'Scheduled',
      phone: '+1-555-0123',
      email: 'john.doe@email.com',
      notes: 'Follow-up appointment for heart condition'
    },
    {
      id: 2,
      patientName: 'Jane Smith',
      doctorName: 'Dr. Mike Brown',
      date: '2024-01-25',
      time: '2:30 PM',
      type: 'Check-up',
      status: 'Confirmed',
      phone: '+1-555-0124',
      email: 'jane.smith@email.com',
      notes: 'Annual physical examination'
    },
    {
      id: 3,
      patientName: 'Robert Wilson',
      doctorName: 'Dr. Emily Davis',
      date: '2024-01-26',
      time: '9:15 AM',
      type: 'Emergency',
      status: 'Completed',
      phone: '+1-555-0125',
      email: 'robert.wilson@email.com',
      notes: 'Emergency consultation for severe headache'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  const filteredAppointments = appointments.filter(appointment =>
    appointment.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    appointment.doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    appointment.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status) => {
    switch (status) {
      case 'Scheduled': return 'badge-warning';
      case 'Confirmed': return 'badge-primary';
      case 'Completed': return 'badge-success';
      case 'Cancelled': return 'badge-error';
      default: return 'badge-warning';
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'Consultation': return 'badge-primary';
      case 'Check-up': return 'badge-secondary';
      case 'Emergency': return 'badge-error';
      case 'Follow-up': return 'badge-accent';
      default: return 'badge-primary';
    }
  };

  return (
    <DashboardLayout title="Appointment Management">
      <div className="section-spacing">
        {/* Header and Search */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="heading-responsive text-gray-900">Appointments</h2>
            <p className="text-gray-600 text-responsive">Schedule and manage patient appointments</p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="btn-primary mt-4 sm:mt-0 inline-flex items-center gap-2"
          >
            <Plus className="h-5 w-5" />
            Schedule Appointment
          </button>
        </div>

        {/* Search and Filters */}
        <div className="card">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search appointments by patient, doctor, or type..."
                className="input-field pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select className="input-field">
              <option>All Types</option>
              <option>Consultation</option>
              <option>Check-up</option>
              <option>Emergency</option>
              <option>Follow-up</option>
            </select>
            <select className="input-field">
              <option>All Status</option>
              <option>Scheduled</option>
              <option>Confirmed</option>
              <option>Completed</option>
              <option>Cancelled</option>
            </select>
          </div>
        </div>

        {/* Appointments Table */}
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="table-header">
                <tr>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Patient
                  </th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Doctor
                  </th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date & Time
                  </th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredAppointments.map((appointment) => (
                  <tr key={appointment.id} className="table-row">
                    <td className="table-cell">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                          <User className="h-4 w-4 text-primary-600" />
                        </div>
                        <div className="ml-3">
                          <div className="text-sm font-medium text-gray-900">{appointment.patientName}</div>
                        </div>
                      </div>
                    </td>
                    <td className="table-cell">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-secondary-100 rounded-full flex items-center justify-center">
                          <Stethoscope className="h-4 w-4 text-secondary-600" />
                        </div>
                        <div className="ml-3">
                          <div className="text-sm font-medium text-gray-900">{appointment.doctorName}</div>
                        </div>
                      </div>
                    </td>
                    <td className="table-cell">
                      <div className="flex flex-col">
                        <div className="flex items-center text-sm text-gray-900">
                          <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                          {new Date(appointment.date).toLocaleDateString()}
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <Clock className="h-4 w-4 mr-2 text-gray-400" />
                          {appointment.time}
                        </div>
                      </div>
                    </td>
                    <td className="table-cell">
                      <span className={`badge ${getTypeColor(appointment.type)}`}>
                        {appointment.type}
                      </span>
                    </td>
                    <td className="table-cell">
                      <span className={`badge ${getStatusColor(appointment.status)}`}>
                        {appointment.status}
                      </span>
                    </td>
                    <td className="table-cell">
                      <div className="flex flex-col space-y-1">
                        <div className="flex items-center text-sm text-gray-900">
                          <Phone className="h-4 w-4 mr-2 text-gray-400" />
                          {appointment.phone}
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <Mail className="h-4 w-4 mr-2 text-gray-400" />
                          {appointment.email}
                        </div>
                      </div>
                    </td>
                    <td className="table-cell text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => setSelectedAppointment(appointment)}
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

        {/* Appointment Details Modal */}
        {selectedAppointment && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Appointment Details</h3>
                  <button
                    onClick={() => setSelectedAppointment(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    ×
                  </button>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Patient Name</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedAppointment.patientName}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Doctor Name</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedAppointment.doctorName}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Date</label>
                    <p className="mt-1 text-sm text-gray-900">{new Date(selectedAppointment.date).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Time</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedAppointment.time}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Type</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedAppointment.type}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Status</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedAppointment.status}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Phone</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedAppointment.phone}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedAppointment.email}</p>
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700">Notes</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedAppointment.notes}</p>
                  </div>
                </div>
                
                <div className="mt-6 flex justify-end space-x-3">
                  <button
                    onClick={() => setSelectedAppointment(null)}
                    className="btn-outline"
                  >
                    Close
                  </button>
                  <button className="btn-primary">
                    Edit Appointment
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

export default AppointmentManagement;

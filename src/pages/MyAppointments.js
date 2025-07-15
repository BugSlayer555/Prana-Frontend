import React, { useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { Calendar, UserCheck, Clock, CheckCircle, XCircle, X, RefreshCw } from 'lucide-react';

const mockAppointments = [
  { id: 1, doctor: 'Dr. Sarah Johnson', type: 'Follow-up', date: '2024-01-25', time: '10:00 AM', status: 'Confirmed' },
  { id: 2, doctor: 'Dr. Mike Brown', type: 'Annual Checkup', date: '2024-02-01', time: '02:30 PM', status: 'Confirmed' },
  { id: 3, doctor: 'Dr. Emily Davis', type: 'Consultation', date: '2023-12-15', time: '11:00 AM', status: 'Completed' }
];

const statusColors = {
  Confirmed: 'bg-green-100 text-green-700',
  Completed: 'bg-blue-100 text-blue-700',
  Cancelled: 'bg-red-100 text-red-700',
};

const statusIcons = {
  Confirmed: <CheckCircle className="h-5 w-5 text-green-500" />,
  Completed: <CheckCircle className="h-5 w-5 text-blue-500" />,
  Cancelled: <XCircle className="h-5 w-5 text-red-500" />,
};

const MyAppointments = () => {
  const [search, setSearch] = useState('');
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const filtered = mockAppointments.filter(a =>
    a.doctor.toLowerCase().includes(search.toLowerCase()) ||
    a.type.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <DashboardLayout title="My Appointments">
      <div className="section-spacing">
        <div className="flex justify-between items-center mb-6">
          <h2 className="heading-responsive">Appointments</h2>
          <input
            type="text"
            className="input-field w-64"
            placeholder="Search by doctor or type..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        {filtered.length === 0 ? (
          <div className="card flex flex-col items-center py-16">
            <Calendar className="h-16 w-16 text-gray-300 mb-4" />
            <p className="text-gray-500 text-lg">No appointments found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(a => (
              <div
                key={a.id}
                className="card p-6 flex flex-col gap-3 shadow-lg border border-primary-100 transition-transform hover:scale-[1.02] hover:shadow-2xl cursor-pointer hover:border-primary-400"
                onClick={() => { setSelectedAppointment(a); setShowModal(true); }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <UserCheck className="h-7 w-7 text-primary-500" />
                  <div>
                    <div className="text-lg font-semibold text-gray-900">{a.doctor}</div>
                    <div className="text-sm text-primary-600 font-medium">{a.type}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <Calendar className="h-4 w-4 text-gray-400" /> {a.date}
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <Clock className="h-4 w-4 text-gray-400" /> {a.time}
                </div>
                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium mt-2 w-max ${statusColors[a.status] || 'bg-gray-100 text-gray-700'}`}>{statusIcons[a.status]} {a.status}</div>
              </div>
            ))}
          </div>
        )}
      </div>
      {/* Appointment Modal */}
      {showModal && selectedAppointment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-8 relative">
            <button className="absolute top-4 right-4 text-gray-400 hover:text-gray-700" onClick={() => setShowModal(false)}>
              <X className="h-6 w-6" />
            </button>
            <div className="flex items-center gap-3 mb-4">
              <UserCheck className="h-10 w-10 text-primary-500" />
              <div>
                <div className="text-xl font-bold text-primary-700">{selectedAppointment.doctor}</div>
                <div className="text-sm text-primary-500">{selectedAppointment.type}</div>
              </div>
            </div>
            <div className="flex items-center gap-2 text-gray-700 mb-2">
              <Calendar className="h-4 w-4 text-gray-400" /> {selectedAppointment.date}
            </div>
            <div className="flex items-center gap-2 text-gray-700 mb-2">
              <Clock className="h-4 w-4 text-gray-400" /> {selectedAppointment.time}
            </div>
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium mt-2 w-max ${statusColors[selectedAppointment.status] || 'bg-gray-100 text-gray-700'}`}>{statusIcons[selectedAppointment.status]} {selectedAppointment.status}</div>
            <div className="flex gap-2 mt-6">
              <button className="btn-secondary flex-1 flex items-center gap-1" onClick={() => setShowModal(false)}>
                <RefreshCw className="h-4 w-4" /> Reschedule
              </button>
              <button className="btn-error flex-1 flex items-center gap-1" onClick={() => setShowModal(false)}>
                <XCircle className="h-4 w-4" /> Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};
export default MyAppointments; 
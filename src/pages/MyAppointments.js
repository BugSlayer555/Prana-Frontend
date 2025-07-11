import React, { useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';

const mockAppointments = [
  { id: 1, doctor: 'Dr. Sarah Johnson', type: 'Follow-up', date: '2024-01-25', time: '10:00 AM', status: 'Confirmed' },
  { id: 2, doctor: 'Dr. Mike Brown', type: 'Annual Checkup', date: '2024-02-01', time: '02:30 PM', status: 'Confirmed' },
  { id: 3, doctor: 'Dr. Emily Davis', type: 'Consultation', date: '2023-12-15', time: '11:00 AM', status: 'Completed' }
];

const MyAppointments = () => {
  const [search, setSearch] = useState('');
  const filtered = mockAppointments.filter(a =>
    a.doctor.toLowerCase().includes(search.toLowerCase()) ||
    a.type.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <DashboardLayout title="My Appointments">
      <div className="section-spacing">
        <div className="flex justify-between items-center mb-4">
          <h2 className="heading-responsive">Appointments</h2>
          <input
            type="text"
            className="input-field w-64"
            placeholder="Search by doctor or type..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <div className="card">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th>Doctor</th>
                <th>Type</th>
                <th>Date</th>
                <th>Time</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan="5" className="text-center py-8 text-gray-500">No appointments found.</td></tr>
              ) : (
                filtered.map(a => (
                  <tr key={a.id}>
                    <td>{a.doctor}</td>
                    <td>{a.type}</td>
                    <td>{a.date}</td>
                    <td>{a.time}</td>
                    <td>{a.status}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
};
export default MyAppointments; 
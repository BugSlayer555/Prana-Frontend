import React, { useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';

const mockPrescriptions = [
  { id: 1, medication: 'Aspirin 100mg', dosage: '1 tablet daily', doctor: 'Dr. Sarah Johnson', startDate: '2024-01-01', refills: 2, status: 'Active' },
  { id: 2, medication: 'Blood Pressure Med', dosage: '1 tablet twice daily', doctor: 'Dr. Mike Brown', startDate: '2024-01-05', refills: 1, status: 'Active' },
  { id: 3, medication: 'Vitamin D3', dosage: '1 capsule daily', doctor: 'Dr. Emily Davis', startDate: '2024-01-10', refills: 3, status: 'Active' }
];

const MyPrescriptions = () => {
  const [search, setSearch] = useState('');
  const filtered = mockPrescriptions.filter(p =>
    p.medication.toLowerCase().includes(search.toLowerCase()) ||
    p.doctor.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <DashboardLayout title="My Prescriptions">
      <div className="section-spacing">
        <div className="flex justify-between items-center mb-4">
          <h2 className="heading-responsive">Prescriptions</h2>
          <input
            type="text"
            className="input-field w-64"
            placeholder="Search by medication or doctor..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <div className="card">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th>Medication</th>
                <th>Dosage</th>
                <th>Doctor</th>
                <th>Start Date</th>
                <th>Refills</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan="6" className="text-center py-8 text-gray-500">No prescriptions found.</td></tr>
              ) : (
                filtered.map(p => (
                  <tr key={p.id}>
                    <td>{p.medication}</td>
                    <td>{p.dosage}</td>
                    <td>{p.doctor}</td>
                    <td>{p.startDate}</td>
                    <td>{p.refills}</td>
                    <td>{p.status}</td>
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
export default MyPrescriptions; 
import React, { useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';

const mockRecords = [
  { id: 1, test: 'Blood Pressure', result: '120/80 mmHg', date: '2024-01-15', doctor: 'Dr. Sarah Johnson' },
  { id: 2, test: 'Cholesterol Panel', result: 'Total: 180 mg/dL', date: '2024-01-10', doctor: 'Dr. Mike Brown' },
  { id: 3, test: 'Blood Sugar', result: '95 mg/dL', date: '2024-01-08', doctor: 'Dr. Emily Davis' }
];

const MyRecords = () => {
  const [search, setSearch] = useState('');
  const filtered = mockRecords.filter(r =>
    r.test.toLowerCase().includes(search.toLowerCase()) ||
    r.doctor.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <DashboardLayout title="My Medical Records">
      <div className="section-spacing">
        <div className="flex justify-between items-center mb-4">
          <h2 className="heading-responsive">Medical Records</h2>
          <input
            type="text"
            className="input-field w-64"
            placeholder="Search by test or doctor..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <div className="card">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th>Test</th>
                <th>Result</th>
                <th>Date</th>
                <th>Doctor</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan="4" className="text-center py-8 text-gray-500">No records found.</td></tr>
              ) : (
                filtered.map(r => (
                  <tr key={r.id}>
                    <td>{r.test}</td>
                    <td>{r.result}</td>
                    <td>{r.date}</td>
                    <td>{r.doctor}</td>
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
export default MyRecords; 
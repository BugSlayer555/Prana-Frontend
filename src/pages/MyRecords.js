import React, { useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { FileText, UserCheck, Calendar } from 'lucide-react';

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
        <div className="flex justify-between items-center mb-6">
          <h2 className="heading-responsive">Medical Records</h2>
          <input
            type="text"
            className="input-field w-64"
            placeholder="Search by test or doctor..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        {filtered.length === 0 ? (
          <div className="card flex flex-col items-center py-16">
            <FileText className="h-16 w-16 text-gray-300 mb-4" />
            <p className="text-gray-500 text-lg">No records found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(r => (
              <div key={r.id} className="card p-6 flex flex-col gap-3 shadow-lg border border-primary-100">
                <div className="flex items-center gap-3 mb-2">
                  <FileText className="h-7 w-7 text-primary-500" />
                  <div>
                    <div className="text-lg font-semibold text-gray-900">{r.test}</div>
                    <div className="text-sm text-primary-600 font-medium">{r.result}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <Calendar className="h-4 w-4 text-gray-400" /> {r.date}
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <UserCheck className="h-4 w-4 text-gray-400" /> {r.doctor}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};
export default MyRecords; 
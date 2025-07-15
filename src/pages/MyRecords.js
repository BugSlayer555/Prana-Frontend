import React, { useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { FileText, UserCheck, Calendar, X, Download } from 'lucide-react';

const mockRecords = [
  { id: 1, test: 'Blood Pressure', result: '120/80 mmHg', date: '2024-01-15', doctor: 'Dr. Sarah Johnson' },
  { id: 2, test: 'Cholesterol Panel', result: 'Total: 180 mg/dL', date: '2024-01-10', doctor: 'Dr. Mike Brown' },
  { id: 3, test: 'Blood Sugar', result: '95 mg/dL', date: '2024-01-08', doctor: 'Dr. Emily Davis' }
];

const MyRecords = () => {
  const [search, setSearch] = useState('');
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [showModal, setShowModal] = useState(false);
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
              <div
                key={r.id}
                className="bg-white rounded-2xl shadow-lg border border-primary-100 flex flex-col items-center p-6 hover:shadow-2xl transition-shadow relative"
              >
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-14 h-14 bg-primary-100 rounded-full flex items-center justify-center shadow-md border-2 border-white">
                  <FileText className="h-8 w-8 text-primary-500" />
                </div>
                <div className="mt-10 w-full flex flex-col items-center">
                  <div className="text-lg font-bold text-primary-700 mb-1 text-center">{r.test}</div>
                  <span className="inline-block bg-primary-50 text-primary-700 text-xs font-semibold px-3 py-1 rounded-full mb-2">{r.result}</span>
                  <div className="flex items-center gap-2 text-gray-500 text-sm mb-1">
                    <Calendar className="h-4 w-4" /> {r.date}
                  </div>
                  <div className="flex items-center gap-2 text-gray-700 text-sm mb-2">
                    <UserCheck className="h-4 w-4 text-primary-400" /> {r.doctor}
                  </div>
                  <button
                    className="btn-secondary mt-2 w-full"
                    onClick={() => { setSelectedRecord(r); setShowModal(true); }}
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {/* Record Modal */}
      {showModal && selectedRecord && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-8 relative">
            <button className="absolute top-4 right-4 text-gray-400 hover:text-gray-700" onClick={() => setShowModal(false)}>
              <X className="h-6 w-6" />
            </button>
            <div className="flex items-center gap-3 mb-4">
              <FileText className="h-10 w-10 text-primary-500" />
              <div>
                <div className="text-xl font-bold text-primary-700">{selectedRecord.test}</div>
                <div className="text-sm text-primary-500">{selectedRecord.result}</div>
              </div>
            </div>
            <div className="flex items-center gap-2 text-gray-700 mb-2">
              <Calendar className="h-4 w-4 text-gray-400" /> {selectedRecord.date}
            </div>
            <div className="flex items-center gap-2 text-gray-700 mb-2">
              <UserCheck className="h-4 w-4 text-gray-400" /> {selectedRecord.doctor}
            </div>
            <div className="flex gap-2 mt-6">
              <button className="btn-primary flex-1 flex items-center gap-1" onClick={() => setShowModal(false)}>
                <Download className="h-4 w-4" /> Download
              </button>
              <button className="btn-outline flex-1 flex items-center gap-1" onClick={() => setShowModal(false)}>
                <X className="h-4 w-4" /> Close
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};
export default MyRecords; 
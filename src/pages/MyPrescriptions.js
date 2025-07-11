import React, { useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { Pill, CheckCircle, XCircle, UserCheck, Calendar, Info } from 'lucide-react';

const mockPrescriptions = [
  {
    id: 1,
    medication: 'Aspirin 100mg',
    dosage: '1 tablet daily',
    doctor: 'Dr. Sarah Johnson',
    startDate: '2024-01-01',
    refills: 2,
    status: 'Active',
    instructions: 'After breakfast with water (Morning), Take with food'
  },
  {
    id: 2,
    medication: 'Blood Pressure Med',
    dosage: '1 tablet twice daily',
    doctor: 'Dr. Mike Brown',
    startDate: '2024-01-05',
    refills: 1,
    status: 'Active',
    instructions: 'Before meals (Morning & Evening), Take on empty stomach'
  },
  {
    id: 3,
    medication: 'Vitamin D3',
    dosage: '1 capsule daily',
    doctor: 'Dr. Emily Davis',
    startDate: '2024-01-10',
    refills: 3,
    status: 'Active',
    instructions: 'With milk (Night), Take with food'
  }
];

const statusColors = {
  Active: 'bg-green-100 text-green-700',
  Expired: 'bg-red-100 text-red-700',
  Cancelled: 'bg-gray-100 text-gray-700',
};

const statusIcons = {
  Active: <CheckCircle className="h-5 w-5 text-green-500" />,
  Expired: <XCircle className="h-5 w-5 text-red-500" />,
  Cancelled: <XCircle className="h-5 w-5 text-gray-500" />,
};

const MyPrescriptions = () => {
  const [search, setSearch] = useState('');
  const filtered = mockPrescriptions.filter(p =>
    p.medication.toLowerCase().includes(search.toLowerCase()) ||
    p.doctor.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <DashboardLayout title="My Prescriptions">
      <div className="section-spacing">
        <div className="flex justify-between items-center mb-6">
          <h2 className="heading-responsive">Prescriptions</h2>
          <input
            type="text"
            className="input-field w-64"
            placeholder="Search by medication or doctor..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        {filtered.length === 0 ? (
          <div className="card flex flex-col items-center py-16">
            <Pill className="h-16 w-16 text-gray-300 mb-4" />
            <p className="text-gray-500 text-lg">No prescriptions found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(p => (
              <div key={p.id} className="rounded-xl shadow-lg border border-primary-100 overflow-hidden bg-white flex flex-col">
                <div className="flex items-center gap-3 bg-primary-500 px-6 py-4">
                  <Pill className="h-7 w-7 text-white" />
                  <span className="text-lg font-bold text-white tracking-wide">{p.medication}</span>
                  <span className={`ml-auto px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 ${statusColors[p.status]}`}>{statusIcons[p.status]} {p.status}</span>
                </div>
                <div className="flex-1 flex flex-col gap-2 p-6">
                  <div className="flex flex-wrap gap-4 text-sm text-gray-700 mb-2">
                    <span className="flex items-center gap-1"><UserCheck className="h-4 w-4 text-primary-400" /> {p.doctor}</span>
                    <span className="flex items-center gap-1"><Calendar className="h-4 w-4 text-primary-400" /> Start: {p.startDate}</span>
                    <span className="flex items-center gap-1"><Info className="h-4 w-4 text-primary-400" /> Refills: {p.refills}</span>
                  </div>
                  <div className="flex flex-col gap-1 mt-2">
                    <span className="font-semibold text-primary-700">Dosage:</span>
                    <span className="text-gray-900 mb-2">{p.dosage}</span>
                    <span className="font-semibold text-primary-700">Instructions:</span>
                    <span className="text-gray-900 whitespace-pre-line">{p.instructions}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};
export default MyPrescriptions; 
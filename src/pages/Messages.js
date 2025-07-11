import React, { useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { Mail, UserCheck } from 'lucide-react';

const mockMessages = [
  { id: 1, from: 'Dr. Sarah Johnson', subject: 'Lab Results', date: '2024-01-15', snippet: 'Your recent blood test results are normal.' },
  { id: 2, from: 'Reception', subject: 'Appointment Reminder', date: '2024-01-20', snippet: 'Reminder: You have an appointment on Jan 25.' }
];

const getAvatar = (name) => name.startsWith('Dr.') ? <UserCheck className="h-8 w-8 text-primary-500" /> : <Mail className="h-8 w-8 text-blue-500" />;

const Messages = () => {
  const [search, setSearch] = useState('');
  const filtered = mockMessages.filter(m =>
    m.from.toLowerCase().includes(search.toLowerCase()) ||
    m.subject.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <DashboardLayout title="Messages">
      <div className="section-spacing">
        <div className="flex justify-between items-center mb-6">
          <h2 className="heading-responsive">Messages</h2>
          <input
            type="text"
            className="input-field w-64"
            placeholder="Search by sender or subject..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        {filtered.length === 0 ? (
          <div className="card flex flex-col items-center py-16">
            <Mail className="h-16 w-16 text-gray-300 mb-4" />
            <p className="text-gray-500 text-lg">No messages found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(m => (
              <div key={m.id} className="card p-6 flex flex-col gap-2 shadow-lg border border-primary-100">
                <div className="flex items-center gap-3 mb-2">
                  {getAvatar(m.from)}
                  <div>
                    <div className="text-lg font-semibold text-gray-900">{m.from}</div>
                    <div className="text-sm text-primary-600 font-medium">{m.subject}</div>
                  </div>
                </div>
                <div className="text-xs text-gray-500 mb-2">{m.date}</div>
                <div className="bg-primary-50 rounded-lg p-3 text-gray-700 text-sm shadow-inner">{m.snippet}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};
export default Messages; 
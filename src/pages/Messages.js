import React, { useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';

const mockMessages = [
  { id: 1, from: 'Dr. Sarah Johnson', subject: 'Lab Results', date: '2024-01-15', snippet: 'Your recent blood test results are normal.' },
  { id: 2, from: 'Reception', subject: 'Appointment Reminder', date: '2024-01-20', snippet: 'Reminder: You have an appointment on Jan 25.' }
];

const Messages = () => {
  const [search, setSearch] = useState('');
  const filtered = mockMessages.filter(m =>
    m.from.toLowerCase().includes(search.toLowerCase()) ||
    m.subject.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <DashboardLayout title="Messages">
      <div className="section-spacing">
        <div className="flex justify-between items-center mb-4">
          <h2 className="heading-responsive">Messages</h2>
          <input
            type="text"
            className="input-field w-64"
            placeholder="Search by sender or subject..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <div className="card">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th>From</th>
                <th>Subject</th>
                <th>Date</th>
                <th>Snippet</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan="4" className="text-center py-8 text-gray-500">No messages found.</td></tr>
              ) : (
                filtered.map(m => (
                  <tr key={m.id}>
                    <td>{m.from}</td>
                    <td>{m.subject}</td>
                    <td>{m.date}</td>
                    <td>{m.snippet}</td>
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
export default Messages; 
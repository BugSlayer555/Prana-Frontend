import React, { useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { Mail, UserCheck, Plus, XCircle, Send } from 'lucide-react';

const mockMessages = [
  { id: 1, from: 'Dr. Sarah Johnson', subject: 'Lab Results', date: '2024-01-15', snippet: 'Your recent blood test results are normal.', body: 'Dear Patient,\n\nYour recent blood test results are normal. No further action is required.\n\nBest regards,\nDr. Sarah Johnson' },
  { id: 2, from: 'Reception', subject: 'Appointment Reminder', date: '2024-01-20', snippet: 'Reminder: You have an appointment on Jan 25.', body: 'Hello,\n\nThis is a reminder that you have an appointment scheduled on Jan 25 at 10:00 AM.\n\nThank you,\nReception' }
];

const getAvatar = (name) => name.startsWith('Dr.') ? <UserCheck className="h-8 w-8 text-primary-500" /> : <Mail className="h-8 w-8 text-blue-500" />;

const Messages = () => {
  const [search, setSearch] = useState('');
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [showNewMessageModal, setShowNewMessageModal] = useState(false);
  const [reply, setReply] = useState('');
  const [compose, setCompose] = useState({ to: '', subject: '', body: '' });
  const filtered = mockMessages.filter(m =>
    m.from.toLowerCase().includes(search.toLowerCase()) ||
    m.subject.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <DashboardLayout title="Messages">
      <div className="section-spacing">
        <div className="flex justify-end items-center mb-6">
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
              <div
                key={m.id}
                className="card p-6 flex flex-col gap-2 shadow-lg border border-primary-100 transition-transform hover:scale-[1.02] hover:shadow-2xl cursor-pointer hover:border-primary-400"
                onClick={() => { setSelectedMessage(m); setShowMessageModal(true); }}
              >
                <div className="flex items-center gap-3 mb-2">
                  {getAvatar(m.from)}
                  <div>
                    <div className="text-lg font-semibold text-gray-900">{m.from}</div>
                    <div className="text-sm text-primary-600 font-medium">{m.subject}</div>
                  </div>
                </div>
                <div className="text-xs text-gray-500 mb-2">{m.date}</div>
                <div className="bg-primary-50 rounded-lg p-3 text-gray-700 text-sm shadow-inner line-clamp-2">{m.snippet}</div>
              </div>
            ))}
          </div>
        )}
      </div>
      {/* Message Modal */}
      {showMessageModal && selectedMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg p-8 relative">
            <button className="absolute top-4 right-4 text-gray-400 hover:text-gray-700" onClick={() => setShowMessageModal(false)}>
              <XCircle className="h-6 w-6" />
            </button>
            <div className="flex items-center gap-3 mb-4">
              {getAvatar(selectedMessage.from)}
              <div>
                <div className="text-lg font-bold text-primary-700">{selectedMessage.from}</div>
                <div className="text-sm text-primary-500">{selectedMessage.subject}</div>
              </div>
            </div>
            <div className="text-xs text-gray-500 mb-2">{selectedMessage.date}</div>
            <div className="whitespace-pre-line text-gray-800 mb-6">{selectedMessage.body}</div>
            <div className="border-t pt-4 mt-4">
              <div className="font-semibold text-primary-700 mb-2">Reply</div>
              <textarea
                className="input-field w-full mb-2"
                rows={3}
                placeholder="Type your reply... (mocked)"
                value={reply}
                onChange={e => setReply(e.target.value)}
              />
              <button className="btn-primary flex items-center gap-1" onClick={() => setReply('')}>
                <Send className="h-4 w-4" /> Send
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};
export default Messages; 
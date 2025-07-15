import React, { useState } from 'react';
import { 
  Users, 
  Calendar, 
  Phone, 
  Clock,
  CheckCircle,
  UserPlus,
  FileText,
  CreditCard,
  TrendingUp,
  TrendingDown,
  PhoneCall
} from 'lucide-react';
import DashboardLayout from '../../components/DashboardLayout';
import { useAuth } from '../../context/AuthContext';

const ReceptionistDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    todayAppointments: 45,
    pendingRegistrations: 8,
    completedCheckins: 32,
    phoneCalls: 15,
    walkInPatients: 12,
    averageWaitTime: 18
  });

  const [appointments] = useState([
    { id: 1, patient: 'John Doe', doctor: 'Dr. Sarah Johnson', time: '09:00 AM', status: 'Checked In', priority: 'normal' },
    { id: 2, patient: 'Sarah Wilson', doctor: 'Dr. Mike Brown', time: '09:30 AM', status: 'Waiting', priority: 'high' },
    { id: 3, patient: 'Mike Johnson', doctor: 'Dr. Emily Davis', time: '10:00 AM', status: 'Confirmed', priority: 'normal' },
    { id: 4, patient: 'Emily Brown', doctor: 'Dr. John Smith', time: '10:30 AM', status: 'No Show', priority: 'low' }
  ]);

  const [pendingRegistrations] = useState([
    { id: 1, name: 'Alex Turner', phone: '+1-555-0123', type: 'New Patient', time: '08:45 AM', status: 'Waiting' },
    { id: 2, name: 'Lisa Garcia', phone: '+1-555-0124', type: 'Returning Patient', time: '09:15 AM', status: 'In Progress' },
    { id: 3, name: 'David Lee', phone: '+1-555-0125', type: 'Emergency', time: '09:30 AM', status: 'Urgent' }
  ]);

  const [recentCalls] = useState([
    { id: 1, caller: 'Mrs. Johnson', phone: '+1-555-0101', purpose: 'Appointment Reschedule', duration: '3:45', status: 'Resolved' },
    { id: 2, caller: 'Mr. Williams', phone: '+1-555-0102', purpose: 'General Inquiry', duration: '2:30', status: 'Resolved' },
    { id: 3, caller: 'Dr. Anderson', phone: '+1-555-0103', purpose: 'Patient Referral', duration: '5:15', status: 'Pending' }
  ]);

  const StatCard = ({ title, value, icon: Icon, change, changeType = 'positive', color = 'primary' }) => {
    const colorClasses = {
      primary: 'bg-primary-500',
      green: 'bg-green-500',
      blue: 'bg-blue-500',
      orange: 'bg-orange-500',
      purple: 'bg-purple-500',
      red: 'bg-red-500'
    };

    return (
      <div className="stat-card">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
            <p className="text-2xl font-bold text-gray-900 mb-2">{value}</p>
            {change && (
              <div className={`flex items-center ${
                changeType === 'positive' ? 'text-green-600' : 'text-red-600'
              }`}>
                {changeType === 'positive' ? (
                  <TrendingUp className="h-4 w-4 mr-1" />
                ) : (
                  <TrendingDown className="h-4 w-4 mr-1" />
                )}
                <span className="text-sm font-medium">{change}</span>
              </div>
            )}
          </div>
          <div className={`stat-card-icon ${colorClasses[color]} ml-4`}>
            <Icon className="h-6 w-6 text-white" />
          </div>
        </div>
      </div>
    );
  };

  const QuickActionCard = ({ title, description, icon: Icon, color, onClick }) => {
    const colorClasses = {
      primary: 'bg-primary-50 border-primary-200 text-primary-700 hover:bg-primary-100',
      green: 'bg-green-50 border-green-200 text-green-700 hover:bg-green-100',
      blue: 'bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100',
      orange: 'bg-orange-50 border-orange-200 text-orange-700 hover:bg-orange-100',
      purple: 'bg-purple-50 border-purple-200 text-purple-700 hover:bg-purple-100',
      red: 'bg-red-50 border-red-200 text-red-700 hover:bg-red-100'
    };

    return (
      <button
        onClick={onClick}
        className={`w-full p-4 border-2 rounded-xl transition-all duration-200 ${colorClasses[color]} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500`}
      >
        <div className="flex items-center space-x-3">
          <Icon className="h-6 w-6 flex-shrink-0" />
          <div className="text-left">
            <h3 className="font-semibold text-sm">{title}</h3>
            <p className="text-xs opacity-80 mt-1">{description}</p>
          </div>
        </div>
      </button>
    );
  };

  return (
    <DashboardLayout title="Receptionist Dashboard">
      <div className="section-spacing">
        {/* Welcome Section */}
        <div className="card gradient-warning text-white">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="heading-responsive text-white">Welcome back, {user?.name}!</h1>
              <p className="text-orange-100 mt-2 text-responsive">Front Desk Management</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-orange-100">Current Status</p>
              <p className="text-lg font-semibold text-white">Front Desk Active</p>
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
          <StatCard
            title="Today's Appointments"
            value={stats.todayAppointments}
            icon={Calendar}
            change="+5"
            color="blue"
          />
          <StatCard
            title="Pending Registrations"
            value={stats.pendingRegistrations}
            icon={UserPlus}
            change="+2"
            color="orange"
          />
          <StatCard
            title="Completed Check-ins"
            value={stats.completedCheckins}
            icon={CheckCircle}
            change="+8"
            color="green"
          />
          <StatCard
            title="Phone Calls"
            value={stats.phoneCalls}
            icon={Phone}
            change="+3"
            color="purple"
          />
          <StatCard
            title="Walk-in Patients"
            value={stats.walkInPatients}
            icon={Users}
            change="+1"
            color="primary"
          />
          <StatCard
            title="Avg Wait Time"
            value={`${stats.averageWaitTime}m`}
            icon={Clock}
            change="-2m"
            changeType="negative"
            color="red"
          />
        </div>

        {/* Quick Actions */}
        <div className="card">
          <h3 className="heading-responsive text-gray-900 mb-6">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <QuickActionCard
              title="Patient Registration"
              description="Register new patients"
              icon={UserPlus}
              color="blue"
              onClick={() => {/* Navigate to registration */}}
            />
            <QuickActionCard
              title="Appointment Booking"
              description="Schedule appointments"
              icon={Calendar}
              color="green"
              onClick={() => {/* Navigate to booking */}}
            />
            <QuickActionCard
              title="Patient Check-in"
              description="Check in arriving patients"
              icon={CheckCircle}
              color="primary"
              onClick={() => {/* Navigate to check-in */}}
            />
            <QuickActionCard
              title="Phone Management"
              description="Handle incoming calls"
              icon={PhoneCall}
              color="purple"
              onClick={() => {/* Navigate to phone */}}
            />
            <QuickActionCard
              title="Patient Records"
              description="Access patient information"
              icon={FileText}
              color="orange"
              onClick={() => {/* Navigate to records */}}
            />
            <QuickActionCard
              title="Billing Support"
              description="Assist with billing queries"
              icon={CreditCard}
              color="red"
              onClick={() => {/* Navigate to billing */}}
            />
          </div>
        </div>

        {/* Appointments and Pending Registrations */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Today's Appointments */}
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <h3 className="heading-responsive text-gray-900">Today's Appointments</h3>
              <button className="text-primary-600 hover:text-primary-700 text-sm font-medium transition-colors duration-200">
                View All
              </button>
            </div>
            <div className="card-spacing">
              {appointments.map((appointment) => (
                <div key={appointment.id} className="flex items-center justify-between p-4 rounded-lg bg-gray-50 border border-gray-100">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${
                      appointment.priority === 'high' ? 'bg-orange-500' :
                      appointment.priority === 'low' ? 'bg-gray-400' :
                      'bg-green-500'
                    }`} />
                    <div>
                      <p className="text-sm font-medium text-gray-900">{appointment.patient}</p>
                      <p className="text-xs text-gray-500">{appointment.doctor} • {appointment.time}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`badge ${
                      appointment.status === 'Checked In' ? 'badge-success' :
                      appointment.status === 'Waiting' ? 'badge-warning' :
                      appointment.status === 'Confirmed' ? 'badge-info' :
                      'badge-error'
                    }`}>
                      {appointment.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pending Registrations */}
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <h3 className="heading-responsive text-gray-900">Pending Registrations</h3>
              <button className="text-primary-600 hover:text-primary-700 text-sm font-medium transition-colors duration-200">
                View All
              </button>
            </div>
            <div className="card-spacing">
              {pendingRegistrations.map((registration) => (
                <div key={registration.id} className="flex items-start space-x-3 p-4 rounded-lg bg-gray-50 border border-gray-100">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    registration.status === 'Urgent' ? 'bg-red-100' :
                    registration.status === 'In Progress' ? 'bg-orange-100' :
                    'bg-blue-100'
                  }`}>
                    <UserPlus className="h-4 w-4 text-blue-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900 font-medium">{registration.name}</p>
                    <p className="text-xs text-gray-500 flex items-center mt-1">
                      <Phone className="h-3 w-3 mr-1" />
                      {registration.phone} • {registration.type}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">Arrived: {registration.time}</p>
                  </div>
                  <span className={`badge ${
                    registration.status === 'Urgent' ? 'badge-error' :
                    registration.status === 'In Progress' ? 'badge-warning' :
                    'badge-info'
                  }`}>
                    {registration.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Phone Calls */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h3 className="heading-responsive text-gray-900">Recent Phone Calls</h3>
            <button className="text-primary-600 hover:text-primary-700 text-sm font-medium transition-colors duration-200">
              View All Calls
            </button>
          </div>
          <div className="table-container">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="table-header">
                <tr>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Caller
                  </th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Phone Number
                  </th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Purpose
                  </th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Duration
                  </th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentCalls.map((call) => (
                  <tr key={call.id} className="table-row">
                    <td className="table-cell">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <Phone className="h-4 w-4 text-blue-600" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{call.caller}</div>
                        </div>
                      </div>
                    </td>
                    <td className="table-cell text-gray-500">
                      {call.phone}
                    </td>
                    <td className="table-cell">
                      {call.purpose}
                    </td>
                    <td className="table-cell text-gray-500">
                      {call.duration}
                    </td>
                    <td className="table-cell">
                      <span className={`badge ${
                        call.status === 'Resolved' ? 'badge-success' :
                        'badge-warning'
                      }`}>
                        {call.status}
                      </span>
                    </td>
                    <td className="table-cell text-sm font-medium">
                      <button className="text-primary-600 hover:text-primary-900 mr-3 transition-colors duration-200">View</button>
                      <button className="text-primary-600 hover:text-primary-900 transition-colors duration-200">Follow Up</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ReceptionistDashboard; 
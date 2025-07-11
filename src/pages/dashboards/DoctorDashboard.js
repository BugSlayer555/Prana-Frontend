import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Calendar, 
  FileText, 
  Stethoscope, 
  Clock,
  AlertCircle,
  CheckCircle,
  UserCheck,
  Activity,
  TrendingUp,
  Phone,
  Mail,
  MapPin,
  Heart,
  Pill
} from 'lucide-react';
import DashboardLayout from '../../components/DashboardLayout';
import { useAuth } from '../../context/AuthContext';

const DoctorDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    todayAppointments: 8,
    totalPatients: 156,
    pendingReports: 3,
    completedAppointments: 5,
    emergencyCases: 2,
    averageRating: 4.8
  });

  const [todayAppointments] = useState([
    { id: 1, patient: 'John Doe', time: '09:00 AM', type: 'Consultation', status: 'Confirmed', priority: 'normal' },
    { id: 2, patient: 'Sarah Wilson', time: '10:30 AM', type: 'Follow-up', status: 'Confirmed', priority: 'high' },
    { id: 3, patient: 'Mike Johnson', time: '02:00 PM', type: 'Surgery', status: 'Confirmed', priority: 'urgent' },
    { id: 4, patient: 'Emily Brown', time: '03:30 PM', type: 'Check-up', status: 'Pending', priority: 'normal' }
  ]);

  const [recentPatients] = useState([
    { id: 1, name: 'John Doe', age: 45, lastVisit: '2024-01-15', diagnosis: 'Hypertension', status: 'Under Treatment' },
    { id: 2, name: 'Sarah Wilson', age: 32, lastVisit: '2024-01-14', diagnosis: 'Diabetes Type 2', status: 'Stable' },
    { id: 3, name: 'Mike Johnson', age: 28, lastVisit: '2024-01-13', diagnosis: 'Appendicitis', status: 'Post-Surgery' }
  ]);

  const [pendingTasks] = useState([
    { id: 1, type: 'report', title: 'Complete patient report for John Doe', priority: 'high', dueDate: 'Today' },
    { id: 2, type: 'review', title: 'Review lab results for Sarah Wilson', priority: 'medium', dueDate: 'Tomorrow' },
    { id: 3, type: 'consultation', title: 'Follow-up call with Mike Johnson', priority: 'low', dueDate: 'Next Week' }
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
                <TrendingUp className="h-4 w-4 mr-1" />
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
    <DashboardLayout title="Doctor Dashboard">
      <div className="section-spacing">
        {/* Welcome Section */}
        <div className="card gradient-primary text-white">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="heading-responsive text-white">Welcome back, Dr. {user?.name}!</h1>
              <p className="text-primary-100 mt-2 text-responsive">Specialization: {user?.specialization || 'General Medicine'}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-primary-100">Today's Schedule</p>
              <p className="text-lg font-semibold text-white">{stats.todayAppointments} Appointments</p>
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
          <StatCard
            title="Today's Appointments"
            value={stats.todayAppointments}
            icon={Calendar}
            change="+2"
            color="primary"
          />
          <StatCard
            title="Total Patients"
            value={stats.totalPatients}
            icon={Users}
            change="+5"
            color="green"
          />
          <StatCard
            title="Pending Reports"
            value={stats.pendingReports}
            icon={FileText}
            change="-1"
            changeType="negative"
            color="orange"
          />
          <StatCard
            title="Completed Today"
            value={stats.completedAppointments}
            icon={CheckCircle}
            change="+3"
            color="green"
          />
          <StatCard
            title="Emergency Cases"
            value={stats.emergencyCases}
            icon={AlertCircle}
            change="+1"
            color="red"
          />
          <StatCard
            title="Patient Rating"
            value={stats.averageRating}
            icon={Heart}
            change="+0.2"
            color="purple"
          />
        </div>

        {/* Quick Actions */}
        <div className="card">
          <h3 className="heading-responsive text-gray-900 mb-6">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <QuickActionCard
              title="Schedule Appointment"
              description="Book new patient appointments"
              icon={Calendar}
              color="blue"
              onClick={() => {/* Navigate to appointment scheduling */}}
            />
            <QuickActionCard
              title="Patient Records"
              description="Access patient medical history"
              icon={FileText}
              color="green"
              onClick={() => {/* Navigate to patient records */}}
            />
            <QuickActionCard
              title="Write Prescription"
              description="Create new prescriptions"
              icon={Pill}
              color="purple"
              onClick={() => {/* Navigate to prescription */}}
            />
            <QuickActionCard
              title="Lab Results"
              description="Review patient test results"
              icon={Activity}
              color="orange"
              onClick={() => {/* Navigate to lab results */}}
            />
            <QuickActionCard
              title="Emergency Cases"
              description="Handle urgent patient cases"
              icon={AlertCircle}
              color="red"
              onClick={() => {/* Navigate to emergency */}}
            />
            <QuickActionCard
              title="Patient Communication"
              description="Send messages to patients"
              icon={Mail}
              color="primary"
              onClick={() => {/* Navigate to communication */}}
            />
          </div>
        </div>

        {/* Today's Appointments and Pending Tasks */}
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
              {todayAppointments.map((appointment) => (
                <div key={appointment.id} className="flex items-center justify-between p-4 rounded-lg bg-gray-50 border border-gray-100">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${
                      appointment.priority === 'urgent' ? 'bg-red-500' :
                      appointment.priority === 'high' ? 'bg-orange-500' :
                      'bg-green-500'
                    }`} />
                    <div>
                      <p className="text-sm font-medium text-gray-900">{appointment.patient}</p>
                      <p className="text-xs text-gray-500">{appointment.type}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">{appointment.time}</p>
                    <span className={`badge ${
                      appointment.status === 'Confirmed' ? 'badge-success' :
                      'badge-warning'
                    }`}>
                      {appointment.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pending Tasks */}
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <h3 className="heading-responsive text-gray-900">Pending Tasks</h3>
              <button className="text-primary-600 hover:text-primary-700 text-sm font-medium transition-colors duration-200">
                View All
              </button>
            </div>
            <div className="card-spacing">
              {pendingTasks.map((task) => (
                <div key={task.id} className="flex items-start space-x-3 p-4 rounded-lg bg-gray-50 border border-gray-100">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    task.priority === 'high' ? 'bg-red-100' :
                    task.priority === 'medium' ? 'bg-orange-100' :
                    'bg-blue-100'
                  }`}>
                    {task.type === 'report' && <FileText className="h-4 w-4 text-red-600" />}
                    {task.type === 'review' && <Activity className="h-4 w-4 text-orange-600" />}
                    {task.type === 'consultation' && <Phone className="h-4 w-4 text-blue-600" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900 font-medium">{task.title}</p>
                    <p className="text-xs text-gray-500 flex items-center mt-1">
                      <Clock className="h-3 w-3 mr-1" />
                      Due: {task.dueDate}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Patients */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h3 className="heading-responsive text-gray-900">Recent Patients</h3>
            <button className="text-primary-600 hover:text-primary-700 text-sm font-medium transition-colors duration-200">
              View All Patients
            </button>
          </div>
          <div className="table-container">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="table-header">
                <tr>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Patient
                  </th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Age
                  </th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Visit
                  </th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Diagnosis
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
                {recentPatients.map((patient) => (
                  <tr key={patient.id} className="table-row">
                    <td className="table-cell">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <Users className="h-4 w-4 text-blue-600" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{patient.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="table-cell">
                      {patient.age} years
                    </td>
                    <td className="table-cell text-gray-500">
                      {patient.lastVisit}
                    </td>
                    <td className="table-cell">
                      {patient.diagnosis}
                    </td>
                    <td className="table-cell">
                      <span className={`badge ${
                        patient.status === 'Under Treatment' ? 'badge-warning' :
                        patient.status === 'Stable' ? 'badge-success' :
                        'badge-info'
                      }`}>
                        {patient.status}
                      </span>
                    </td>
                    <td className="table-cell text-sm font-medium">
                      <button className="text-primary-600 hover:text-primary-900 mr-3 transition-colors duration-200">View</button>
                      <button className="text-primary-600 hover:text-primary-900 transition-colors duration-200">Edit</button>
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

export default DoctorDashboard; 
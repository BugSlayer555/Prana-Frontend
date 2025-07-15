import React, { useState } from 'react';
import { 
  Users, 
  Calendar, 
  Activity, 
  Clock,
  AlertCircle,
  CheckCircle,
  Heart,
  Pill,
  Thermometer,
  Bed,
  Phone,
  TrendingUp,
  TrendingDown,
} from 'lucide-react';
import DashboardLayout from '../../components/DashboardLayout';
import { useAuth } from '../../context/AuthContext';

const NurseDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    assignedPatients: 12,
    completedTasks: 8,
    pendingTasks: 4,
    vitalChecks: 15,
    medicationDoses: 6,
    emergencyAlerts: 1
  });

  const [patientTasks] = useState([
    { id: 1, patient: 'John Doe', room: '201', task: 'Vital Signs Check', time: '09:00 AM', priority: 'high', status: 'pending' },
    { id: 2, patient: 'Sarah Wilson', room: '205', task: 'Medication Administration', time: '09:30 AM', priority: 'urgent', status: 'pending' },
    { id: 3, patient: 'Mike Johnson', room: '203', task: 'Blood Pressure Check', time: '10:00 AM', priority: 'normal', status: 'completed' },
    { id: 4, patient: 'Emily Brown', room: '207', task: 'Temperature Check', time: '10:30 AM', priority: 'normal', status: 'pending' }
  ]);

  const [vitalSigns] = useState([
    { id: 1, patient: 'John Doe', room: '201', bp: '120/80', temp: '98.6°F', pulse: '72', status: 'normal' },
    { id: 2, patient: 'Sarah Wilson', room: '205', bp: '140/90', temp: '99.2°F', pulse: '85', status: 'elevated' },
    { id: 3, patient: 'Mike Johnson', room: '203', bp: '110/70', temp: '97.8°F', pulse: '68', status: 'normal' }
  ]);

  const [medicationSchedule] = useState([
    { id: 1, patient: 'John Doe', medication: 'Aspirin 100mg', time: '08:00 AM', status: 'administered' },
    { id: 2, patient: 'Sarah Wilson', medication: 'Insulin 10 units', time: '08:30 AM', status: 'pending' },
    { id: 3, patient: 'Mike Johnson', medication: 'Antibiotic 500mg', time: '09:00 AM', status: 'pending' }
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
    <DashboardLayout title="Nurse Dashboard">
      <div className="section-spacing">
        {/* Welcome Section */}
        <div className="card gradient-success text-white">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="heading-responsive text-white">Welcome back, Nurse {user?.name}!</h1>
              <p className="text-green-100 mt-2 text-responsive">Department: {user?.department || 'General Nursing'}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-green-100">Today's Tasks</p>
              <p className="text-lg font-semibold text-white">{stats.pendingTasks} Pending</p>
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
          <StatCard
            title="Assigned Patients"
            value={stats.assignedPatients}
            icon={Users}
            change="+2"
            color="blue"
          />
          <StatCard
            title="Completed Tasks"
            value={stats.completedTasks}
            icon={CheckCircle}
            change="+3"
            color="green"
          />
          <StatCard
            title="Pending Tasks"
            value={stats.pendingTasks}
            icon={Clock}
            change="-1"
            changeType="negative"
            color="orange"
          />
          <StatCard
            title="Vital Checks"
            value={stats.vitalChecks}
            icon={Activity}
            change="+5"
            color="purple"
          />
          <StatCard
            title="Medication Doses"
            value={stats.medicationDoses}
            icon={Pill}
            change="+2"
            color="primary"
          />
          <StatCard
            title="Emergency Alerts"
            value={stats.emergencyAlerts}
            icon={AlertCircle}
            change="+1"
            color="red"
          />
        </div>

        {/* Quick Actions */}
        <div className="card">
          <h3 className="heading-responsive text-gray-900 mb-6">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <QuickActionCard
              title="Vital Signs"
              description="Record patient vital signs"
              icon={Thermometer}
              color="blue"
              onClick={() => {/* Navigate to vital signs */}}
            />
            <QuickActionCard
              title="Medication"
              description="Administer medications"
              icon={Pill}
              color="green"
              onClick={() => {/* Navigate to medication */}}
            />
            <QuickActionCard
              title="Patient Care"
              description="Update patient care plans"
              icon={Heart}
              color="purple"
              onClick={() => {/* Navigate to patient care */}}
            />
            <QuickActionCard
              title="Room Management"
              description="Manage patient rooms"
              icon={Bed}
              color="orange"
              onClick={() => {/* Navigate to room management */}}
            />
            <QuickActionCard
              title="Emergency Response"
              description="Handle emergency cases"
              icon={AlertCircle}
              color="red"
              onClick={() => {/* Navigate to emergency */}}
            />
            <QuickActionCard
              title="Patient Communication"
              description="Contact patients/families"
              icon={Phone}
              color="primary"
              onClick={() => {/* Navigate to communication */}}
            />
          </div>
        </div>

        {/* Patient Tasks and Vital Signs */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Patient Tasks */}
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <h3 className="heading-responsive text-gray-900">Patient Tasks</h3>
              <button className="text-primary-600 hover:text-primary-700 text-sm font-medium transition-colors duration-200">
                View All
              </button>
            </div>
            <div className="card-spacing">
              {patientTasks.map((task) => (
                <div key={task.id} className="flex items-center justify-between p-4 rounded-lg bg-gray-50 border border-gray-100">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${
                      task.priority === 'urgent' ? 'bg-red-500' :
                      task.priority === 'high' ? 'bg-orange-500' :
                      'bg-green-500'
                    }`} />
                    <div>
                      <p className="text-sm font-medium text-gray-900">{task.patient}</p>
                      <p className="text-xs text-gray-500">Room {task.room} • {task.task}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">{task.time}</p>
                    <span className={`badge ${
                      task.status === 'completed' ? 'badge-success' :
                      'badge-warning'
                    }`}>
                      {task.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Vital Signs */}
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <h3 className="heading-responsive text-gray-900">Recent Vital Signs</h3>
              <button className="text-primary-600 hover:text-primary-700 text-sm font-medium transition-colors duration-200">
                View All
              </button>
            </div>
            <div className="card-spacing">
              {vitalSigns.map((vital) => (
                <div key={vital.id} className="p-4 rounded-lg bg-gray-50 border border-gray-100">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{vital.patient}</p>
                      <p className="text-xs text-gray-500">Room {vital.room}</p>
                    </div>
                    <span className={`badge ${
                      vital.status === 'normal' ? 'badge-success' :
                      'badge-warning'
                    }`}>
                      {vital.status}
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500">BP</p>
                      <p className="font-medium text-gray-900">{vital.bp}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Temp</p>
                      <p className="font-medium text-gray-900">{vital.temp}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Pulse</p>
                      <p className="font-medium text-gray-900">{vital.pulse}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Medication Schedule */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h3 className="heading-responsive text-gray-900">Medication Schedule</h3>
            <button className="text-primary-600 hover:text-primary-700 text-sm font-medium transition-colors duration-200">
              View All
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
                    Medication
                  </th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Time
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
                {medicationSchedule.map((med) => (
                  <tr key={med.id} className="table-row">
                    <td className="table-cell">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                          <Users className="h-4 w-4 text-green-600" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{med.patient}</div>
                        </div>
                      </div>
                    </td>
                    <td className="table-cell">
                      <div className="flex items-center">
                        <Pill className="h-4 w-4 text-blue-600 mr-2" />
                        {med.medication}
                      </div>
                    </td>
                    <td className="table-cell text-gray-500">
                      {med.time}
                    </td>
                    <td className="table-cell">
                      <span className={`badge ${
                        med.status === 'administered' ? 'badge-success' :
                        'badge-warning'
                      }`}>
                        {med.status}
                      </span>
                    </td>
                    <td className="table-cell text-sm font-medium">
                      {med.status === 'pending' && (
                        <>
                          <button className="text-green-600 hover:text-green-900 mr-3 transition-colors duration-200">Administer</button>
                          <button className="text-primary-600 hover:text-primary-900 transition-colors duration-200">Reschedule</button>
                        </>
                      )}
                      {med.status === 'administered' && (
                        <button className="text-primary-600 hover:text-primary-900 transition-colors duration-200">View Details</button>
                      )}
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

export default NurseDashboard; 
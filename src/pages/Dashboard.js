import React, { useState, useEffect } from 'react';
import { 
  Users, 
  UserCheck, 
  Calendar, 
  CreditCard, 
  TrendingUp, 
  TrendingDown,
  Activity,
  Clock,
  AlertCircle,
  CheckCircle
} from 'lucide-react';
import DashboardLayout from '../components/DashboardLayout';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalPatients: 1234,
    totalDoctors: 45,
    todayAppointments: 28,
    pendingBills: 15,
    revenue: 125000,
    occupancyRate: 85
  });

  const [recentActivities] = useState([
    { id: 1, type: 'appointment', message: 'New appointment scheduled with Dr. Smith', time: '2 hours ago' },
    { id: 2, type: 'patient', message: 'Patient John Doe admitted to ICU', time: '3 hours ago' },
    { id: 3, type: 'billing', message: 'Payment received for Invoice #12345', time: '4 hours ago' },
    { id: 4, type: 'inventory', message: 'Low stock alert: Paracetamol tablets', time: '5 hours ago' },
    { id: 5, type: 'staff', message: 'Dr. Johnson updated availability', time: '6 hours ago' }
  ]);

  const [upcomingAppointments] = useState([
    { id: 1, patient: 'John Doe', doctor: 'Dr. Smith', time: '10:00 AM', type: 'Consultation' },
    { id: 2, patient: 'Jane Smith', doctor: 'Dr. Johnson', time: '11:30 AM', type: 'Follow-up' },
    { id: 3, patient: 'Mike Wilson', doctor: 'Dr. Brown', time: '2:00 PM', type: 'Surgery' },
    { id: 4, patient: 'Sarah Davis', doctor: 'Dr. Taylor', time: '3:30 PM', type: 'Check-up' }
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
      <div className="card">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <p className="text-2xl font-bold text-gray-900">{value}</p>
            {change && (
              <div className={`flex items-center mt-1 ${
                changeType === 'positive' ? 'text-green-600' : 'text-red-600'
              }`}>
                {changeType === 'positive' ? (
                  <TrendingUp className="h-4 w-4 mr-1" />
                ) : (
                  <TrendingDown className="h-4 w-4 mr-1" />
                )}
                <span className="text-sm">{change}</span>
              </div>
            )}
          </div>
          <div className={`p-3 rounded-lg ${colorClasses[color]}`}>
            <Icon className="h-6 w-6 text-white" />
          </div>
        </div>
      </div>
    );
  };

  return (
    <DashboardLayout title="Dashboard">
      <div className="space-y-6">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
          <StatCard
            title="Total Patients"
            value={stats.totalPatients.toLocaleString()}
            icon={Users}
            change="+12%"
            color="blue"
          />
          <StatCard
            title="Total Doctors"
            value={stats.totalDoctors}
            icon={UserCheck}
            change="+5%"
            color="green"
          />
          <StatCard
            title="Today's Appointments"
            value={stats.todayAppointments}
            icon={Calendar}
            change="+8%"
            color="purple"
          />
          <StatCard
            title="Pending Bills"
            value={stats.pendingBills}
            icon={CreditCard}
            change="-3%"
            changeType="negative"
            color="orange"
          />
          <StatCard
            title="Monthly Revenue"
            value={`$${(stats.revenue / 1000).toFixed(0)}K`}
            icon={TrendingUp}
            change="+15%"
            color="primary"
          />
          <StatCard
            title="Occupancy Rate"
            value={`${stats.occupancyRate}%`}
            icon={Activity}
            change="+2%"
            color="red"
          />
        </div>

        {/* Charts and Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Activities */}
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Recent Activities</h3>
              <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                View All
              </button>
            </div>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    {activity.type === 'appointment' && (
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <Calendar className="h-4 w-4 text-blue-600" />
                      </div>
                    )}
                    {activity.type === 'patient' && (
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <Users className="h-4 w-4 text-green-600" />
                      </div>
                    )}
                    {activity.type === 'billing' && (
                      <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                        <CreditCard className="h-4 w-4 text-yellow-600" />
                      </div>
                    )}
                    {activity.type === 'inventory' && (
                      <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                        <AlertCircle className="h-4 w-4 text-red-600" />
                      </div>
                    )}
                    {activity.type === 'staff' && (
                      <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                        <UserCheck className="h-4 w-4 text-purple-600" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900">{activity.message}</p>
                    <p className="text-xs text-gray-500 flex items-center mt-1">
                      <Clock className="h-3 w-3 mr-1" />
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Appointments */}
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Today's Appointments</h3>
              <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                View Schedule
              </button>
            </div>
            <div className="space-y-4">
              {upcomingAppointments.map((appointment) => (
                <div key={appointment.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{appointment.patient}</p>
                    <p className="text-xs text-gray-500">{appointment.doctor}</p>
                    <p className="text-xs text-gray-500">{appointment.type}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">{appointment.time}</p>
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Scheduled
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Department Status */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Department Status</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { name: 'Emergency', status: 'Active', patients: 12, capacity: 20, color: 'red' },
              { name: 'ICU', status: 'Full', patients: 15, capacity: 15, color: 'orange' },
              { name: 'Surgery', status: 'Available', patients: 3, capacity: 8, color: 'green' },
              { name: 'Cardiology', status: 'Active', patients: 7, capacity: 10, color: 'blue' }
            ].map((dept, index) => (
              <div key={index} className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-medium text-gray-900">{dept.name}</h4>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                    dept.status === 'Active' ? 'bg-green-100 text-green-800' :
                    dept.status === 'Full' ? 'bg-red-100 text-red-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {dept.status}
                  </span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Patients:</span>
                    <span className="font-medium">{dept.patients}/{dept.capacity}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        dept.color === 'red' ? 'bg-red-500' :
                        dept.color === 'orange' ? 'bg-orange-500' :
                        dept.color === 'green' ? 'bg-green-500' :
                        'bg-blue-500'
                      }`}
                      style={{ width: `${(dept.patients / dept.capacity) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200">
              <Users className="h-8 w-8 text-primary-500 mb-2" />
              <span className="text-sm font-medium text-gray-900">Add Patient</span>
            </button>
            <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200">
              <Calendar className="h-8 w-8 text-primary-500 mb-2" />
              <span className="text-sm font-medium text-gray-900">Schedule Appointment</span>
            </button>
            <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200">
              <CreditCard className="h-8 w-8 text-primary-500 mb-2" />
              <span className="text-sm font-medium text-gray-900">Generate Bill</span>
            </button>
            <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200">
              <UserCheck className="h-8 w-8 text-primary-500 mb-2" />
              <span className="text-sm font-medium text-gray-900">Add Staff</span>
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;

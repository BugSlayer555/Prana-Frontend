import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  FileText, 
  Pill, 
  Heart,
  Clock,
  TrendingUp,
  TrendingDown,
  Users,
  Activity,
  Phone,
  Mail,
  MapPin,
  CreditCard,
  Download,
  Eye,
  MessageSquare,
  Bell,
  CheckCircle,
  UserPlus,
  Copy,
  QrCode
} from 'lucide-react';
import DashboardLayout from '../../components/DashboardLayout';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const PatientDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  // Debug: Log user and role
  React.useEffect(() => {
    console.log('PatientDashboard user:', user);
    if (user) {
      console.log('User role:', user.role);
    } else {
      console.log('No user found in AuthContext');
    }
  }, [user]);

  const [stats, setStats] = useState({
    upcomingAppointments: 2,
    completedAppointments: 15,
    activePrescriptions: 3,
    healthScore: 85,
    lastCheckup: '2024-01-10',
    nextAppointment: '2024-01-25'
  });

  const [upcomingAppointments] = useState([
    { id: 1, doctor: 'Dr. Sarah Johnson', specialty: 'Cardiology', date: '2024-01-25', time: '10:00 AM', type: 'Follow-up', status: 'Confirmed' },
    { id: 2, doctor: 'Dr. Mike Brown', specialty: 'General Medicine', date: '2024-02-01', time: '02:30 PM', type: 'Annual Checkup', status: 'Confirmed' }
  ]);

  const [activePrescriptions] = useState([
    { id: 1, medication: 'Aspirin 100mg', dosage: '1 tablet daily', doctor: 'Dr. Sarah Johnson', startDate: '2024-01-01', refills: 2, status: 'Active' },
    { id: 2, medication: 'Blood Pressure Med', dosage: '1 tablet twice daily', doctor: 'Dr. Mike Brown', startDate: '2024-01-05', refills: 1, status: 'Active' },
    { id: 3, medication: 'Vitamin D3', dosage: '1 capsule daily', doctor: 'Dr. Emily Davis', startDate: '2024-01-10', refills: 3, status: 'Active' }
  ]);

  const [recentTestResults] = useState([
    { id: 1, test: 'Blood Pressure', result: '120/80 mmHg', date: '2024-01-15', status: 'Normal', doctor: 'Dr. Sarah Johnson' },
    { id: 2, test: 'Cholesterol Panel', result: 'Total: 180 mg/dL', date: '2024-01-10', status: 'Normal', doctor: 'Dr. Mike Brown' },
    { id: 3, test: 'Blood Sugar', result: '95 mg/dL', date: '2024-01-08', status: 'Normal', doctor: 'Dr. Emily Davis' }
  ]);

  const [familyMembers] = useState([
    { id: 1, name: 'John Doe', relationship: 'Spouse', phone: '+1-555-0123', dateOfBirth: '1985-03-15', bloodGroup: 'A+' },
    { id: 2, name: 'Jane Doe', relationship: 'Daughter', phone: '+1-555-0124', dateOfBirth: '2010-07-22', bloodGroup: 'O+' }
  ]);

  const copyUniqueId = () => {
    if (user?.uniqueId) {
      navigator.clipboard.writeText(user.uniqueId);
      toast.success('Unique ID copied to clipboard!');
    }
  };

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
    <DashboardLayout title="Patient Dashboard">
      <div className="section-spacing">
        {/* Welcome Section */}
        <div className="card gradient-secondary text-white">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="heading-responsive text-white">Welcome back, {user?.name}!</h1>
              <p className="text-secondary-100 mt-2 text-responsive">Your Health Dashboard</p>
              {user?.uniqueId && (
                <div className="mt-3 flex items-center space-x-2">
                  <span className="text-sm text-secondary-100">Your Unique ID:</span>
                  <div className="flex items-center space-x-2 bg-white bg-opacity-20 rounded-lg px-3 py-1">
                    <span className="text-white font-mono text-sm">{user.uniqueId}</span>
                    <button
                      onClick={copyUniqueId}
                      className="text-white hover:text-secondary-200 transition-colors"
                      title="Copy Unique ID"
                    >
                      <Copy className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
            <div className="text-right">
              <p className="text-sm text-secondary-100">Health Status</p>
              <p className="text-lg font-semibold text-white">Good Health</p>
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4 md:gap-6">
          <StatCard
            title="Upcoming Appointments"
            value={stats.upcomingAppointments}
            icon={Calendar}
            change="+1"
            color="blue"
          />
          <StatCard
            title="Completed Appointments"
            value={stats.completedAppointments}
            icon={CheckCircle}
            change="+3"
            color="green"
          />
          <StatCard
            title="Active Prescriptions"
            value={stats.activePrescriptions}
            icon={Pill}
            change="+1"
            color="purple"
          />
          <StatCard
            title="Health Score"
            value={`${stats.healthScore}%`}
            icon={Heart}
            change="+5%"
            color="red"
          />
          <StatCard
            title="Last Checkup"
            value="10 days ago"
            icon={Activity}
            change="On track"
            color="orange"
          />
          <StatCard
            title="Next Appointment"
            value="5 days"
            icon={Clock}
            change="Soon"
            color="primary"
          />
        </div>

        {/* Quick Actions */}
        <div className="card">
          <h3 className="heading-responsive text-gray-900 mb-4 text-center sm:text-left">Quick Actions</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            <QuickActionCard
              title="Book Appointment"
              description="Schedule new appointments"
              icon={Calendar}
              color="blue"
              onClick={() => {/* Navigate to booking */}}
            />
            <QuickActionCard
              title="View Medical Records"
              description="Access your health records"
              icon={FileText}
              color="green"
              onClick={() => {/* Navigate to records */}}
            />
            <QuickActionCard
              title="Prescription Refills"
              description="Request medication refills"
              icon={Pill}
              color="purple"
              onClick={() => {/* Navigate to prescriptions */}}
            />
            <QuickActionCard
              title="Add Family Member"
              description="Register family members"
              icon={UserPlus}
              color="orange"
              onClick={() => {
                console.log('Navigating to /family');
                navigate('/family');
              }}
            />
            <QuickActionCard
              title="Download Reports"
              description="Get your medical reports"
              icon={Download}
              color="red"
              onClick={() => {/* Navigate to reports */}}
            />
            <QuickActionCard
              title="Contact Support"
              description="Get help and support"
              icon={MessageSquare}
              color="primary"
              onClick={() => {/* Navigate to support */}}
            />
          </div>
        </div>

        {/* Family Members Section */}
        <div className="card">
          <div className="flex items-center justify-between mb-6 flex-col sm:flex-row gap-4 sm:gap-0">
            <h3 className="heading-responsive text-gray-900 text-center sm:text-left">Family Members</h3>
            <button className="btn-primary text-sm w-full sm:w-auto">
              <UserPlus className="h-4 w-4 mr-1" />
              Add Member
            </button>
          </div>
          
          {familyMembers.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {familyMembers.map((member) => (
                <div key={member.id} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow flex flex-col gap-2">
                  <div className="flex flex-col xs:flex-row items-start xs:items-center justify-between mb-3 gap-2 xs:gap-0">
                    <div className="flex items-center space-x-3 w-full">
                      <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                        <Users className="h-5 w-5 text-primary-600" />
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-semibold text-gray-900 text-base truncate">{member.name}</h4>
                        <p className="text-sm text-gray-600 truncate">{member.relationship}</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2 w-full">
                    <div className="flex flex-col xs:flex-row justify-between text-sm w-full">
                      <span className="text-gray-500">Phone:</span>
                      <span className="font-medium text-gray-900 break-all">{member.phone}</span>
                    </div>
                    <div className="flex flex-col xs:flex-row justify-between text-sm w-full">
                      <span className="text-gray-500">Blood Group:</span>
                      <span className="font-medium text-gray-900">{member.bloodGroup}</span>
                    </div>
                    <div className="flex flex-col xs:flex-row justify-between text-sm w-full">
                      <span className="text-gray-500">DOB:</span>
                      <span className="font-medium text-gray-900">{new Date(member.dateOfBirth).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Family Members Added</h3>
              <p className="text-gray-600 mb-4">Add your family members to manage their health records together.</p>
              <button className="btn-primary">
                <UserPlus className="h-4 w-4 mr-1" />
                Add First Member
              </button>
            </div>
          )}
        </div>

        {/* Upcoming Appointments and Recent Test Results */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
          {/* Upcoming Appointments */}
          <div className="card">
            <div className="flex items-center justify-between mb-6 flex-col sm:flex-row gap-4 sm:gap-0">
              <h3 className="heading-responsive text-gray-900 text-center sm:text-left">Upcoming Appointments</h3>
              <button className="text-primary-600 hover:text-primary-700 text-sm font-medium transition-colors duration-200 w-full sm:w-auto">
                View All
              </button>
            </div>
            <div className="space-y-4">
              {upcomingAppointments.map((appointment) => (
                <div key={appointment.id} className="flex flex-col xs:flex-row xs:items-center xs:space-x-4 space-y-2 xs:space-y-0 p-4 rounded-lg bg-gray-50 border border-gray-100">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                      <Calendar className="h-5 w-5 text-primary-600" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{appointment.doctor}</p>
                    <p className="text-xs text-gray-500 truncate">{appointment.specialty} • {appointment.type}</p>
                    <p className="text-xs text-gray-500 flex items-center mt-1">
                      <Clock className="h-3 w-3 mr-1" />
                      {appointment.date} at {appointment.time}
                    </p>
                  </div>
                  <div className="flex-shrink-0 mt-2 xs:mt-0">
                    <span className="badge badge-success">{appointment.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Test Results */}
          <div className="card">
            <div className="flex items-center justify-between mb-6 flex-col sm:flex-row gap-4 sm:gap-0">
              <h3 className="heading-responsive text-gray-900 text-center sm:text-left">Recent Test Results</h3>
              <button className="text-primary-600 hover:text-primary-700 text-sm font-medium transition-colors duration-200 w-full sm:w-auto">
                View All
              </button>
            </div>
            <div className="space-y-4">
              {recentTestResults.map((test) => (
                <div key={test.id} className="flex flex-col xs:flex-row xs:items-center xs:space-x-4 space-y-2 xs:space-y-0 p-4 rounded-lg bg-gray-50 border border-gray-100">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <FileText className="h-5 w-5 text-green-600" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{test.test}</p>
                    <p className="text-xs text-gray-500 truncate">{test.result}</p>
                    <p className="text-xs text-gray-500 flex items-center mt-1">
                      <Calendar className="h-3 w-3 mr-1" />
                      {test.date} • {test.doctor}
                    </p>
                  </div>
                  <div className="flex-shrink-0 mt-2 xs:mt-0">
                    <span className="badge badge-success">{test.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Active Prescriptions */}
        <div className="card">
          <div className="flex items-center justify-between mb-6 flex-col sm:flex-row gap-4 sm:gap-0">
            <h3 className="heading-responsive text-gray-900 text-center sm:text-left">Active Prescriptions</h3>
            <button className="text-primary-600 hover:text-primary-700 text-sm font-medium transition-colors duration-200 w-full sm:w-auto">
              View All
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            {activePrescriptions.map((prescription) => (
              <div key={prescription.id} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow flex flex-col gap-2">
                <div className="flex flex-col xs:flex-row xs:items-center xs:justify-between mb-3 gap-2 xs:gap-0">
                  <div className="flex items-center space-x-3 w-full">
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                      <Pill className="h-5 w-5 text-purple-600" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-semibold text-gray-900 text-base truncate">{prescription.medication}</h4>
                      <p className="text-sm text-gray-600 truncate">{prescription.doctor}</p>
                    </div>
                  </div>
                  <span className="badge badge-success mt-2 xs:mt-0">{prescription.status}</span>
                </div>
                <div className="space-y-2 w-full">
                  <div className="flex flex-col xs:flex-row justify-between text-sm w-full">
                    <span className="text-gray-500">Dosage:</span>
                    <span className="font-medium text-gray-900 break-all">{prescription.dosage}</span>
                  </div>
                  <div className="flex flex-col xs:flex-row justify-between text-sm w-full">
                    <span className="text-gray-500">Start Date:</span>
                    <span className="font-medium text-gray-900">{new Date(prescription.startDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex flex-col xs:flex-row justify-between text-sm w-full">
                    <span className="text-gray-500">Refills:</span>
                    <span className="font-medium text-gray-900">{prescription.refills} remaining</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default PatientDashboard; 
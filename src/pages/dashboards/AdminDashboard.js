import React, { useState } from 'react';
import { 
  Users, 
  UserCheck, 
  Calendar, 
  TrendingUp, 
  TrendingDown,
  Activity,
  AlertCircle,
  CheckCircle,
  Settings,
  Shield,
  BarChart3,
  DollarSign,
  FileText,
  UserPlus,
  UserX,
  Mail
} from 'lucide-react';
import DashboardLayout from '../../components/DashboardLayout';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';

const AdminDashboard = () => {
  const { user, getPendingApprovals, approveUser } = useAuth();
  const [stats, setStats] = useState({
    totalPatients: 1234,
    totalDoctors: 45,
    totalNurses: 78,
    totalStaff: 156,
    todayAppointments: 28,
    pendingBills: 15,
    monthlyRevenue: 125000,
    occupancyRate: 85,
    activeUsers: 89,
    systemHealth: 98
  });

  const [pendingApprovals, setPendingApprovals] = useState([]);
  const [loadingApprovals, setLoadingApprovals] = useState(false);

  const [recentActivities] = useState([
    { id: 1, type: 'user', message: 'New doctor registered: Dr. Sarah Johnson', time: '2 hours ago', priority: 'high' },
    { id: 2, type: 'system', message: 'System backup completed successfully', time: '3 hours ago', priority: 'low' },
    { id: 3, type: 'billing', message: 'Monthly revenue report generated', time: '4 hours ago', priority: 'medium' },
    { id: 4, type: 'alert', message: 'Low inventory alert: Medical supplies', time: '5 hours ago', priority: 'high' },
    { id: 5, type: 'user', message: 'Staff member updated profile', time: '6 hours ago', priority: 'low' }
  ]);

  const [systemAlerts] = useState([
    { id: 1, type: 'warning', message: 'Database backup due in 2 hours', icon: AlertCircle },
    { id: 2, type: 'info', message: 'System maintenance scheduled for tonight', icon: Settings },
    { id: 3, type: 'success', message: 'All systems operational', icon: CheckCircle }
  ]);

  // Fetch pending approvals on component mount
  // useEffect(() => {
  //   fetchPendingApprovals();
  // }, []);

  const fetchPendingApprovals = async () => {
    setLoadingApprovals(true);
    try {
      const result = await getPendingApprovals();
      if (result.success) {
        setPendingApprovals(result.data);
      }
    } catch (error) {
      console.error('Failed to fetch pending approvals:', error);
    } finally {
      setLoadingApprovals(false);
    }
  };

  const handleApproveUser = async (userId, approved) => {
    try {
      const result = await approveUser(userId, approved);
      if (result.success) {
        // Refresh the pending approvals list
        fetchPendingApprovals();
      }
    } catch (error) {
      console.error('Failed to approve user:', error);
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

  const PendingApprovalCard = ({ user }) => (
    <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
            <UserPlus className="h-5 w-5 text-primary-600" />
          </div>
          <div>
            <h4 className="font-semibold text-gray-900">{user.name}</h4>
            <p className="text-sm text-gray-600">{user.email}</p>
          </div>
        </div>
        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
          user.role === 'doctor' ? 'bg-blue-100 text-blue-800' :
          user.role === 'nurse' ? 'bg-green-100 text-green-800' :
          user.role === 'receptionist' ? 'bg-purple-100 text-purple-800' :
          'bg-gray-100 text-gray-800'
        }`}>
          {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
        </span>
      </div>
      
      <div className="space-y-2 mb-4">
        <p className="text-sm text-gray-600">
          <span className="font-medium">Department:</span> {user.department || 'N/A'}
        </p>
        <p className="text-sm text-gray-600">
          <span className="font-medium">Phone:</span> {user.phone}
        </p>
        <p className="text-sm text-gray-600">
          <span className="font-medium">Registered:</span> {new Date(user.createdAt).toLocaleDateString()}
        </p>
      </div>

      <div className="flex space-x-2">
        <button
          onClick={() => handleApproveUser(user._id, true)}
          className="flex-1 bg-green-600 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-green-700 transition-colors duration-200"
        >
          <CheckCircle className="h-4 w-4 inline mr-1" />
          Approve
        </button>
        <button
          onClick={() => handleApproveUser(user._id, false)}
          className="flex-1 bg-red-600 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-red-700 transition-colors duration-200"
        >
          <UserX className="h-4 w-4 inline mr-1" />
          Reject
        </button>
      </div>
    </div>
  );

  return (
    <DashboardLayout title="Admin Dashboard">
      <div className="section-spacing">
        {/* Welcome Section */}
        <div className="card gradient-primary text-white">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="heading-responsive text-white">Welcome back, {user?.name}!</h1>
              <p className="text-primary-100 mt-2 text-responsive">System Administrator Dashboard</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-primary-100">System Status</p>
              <p className="text-lg font-semibold text-white">All Systems Operational</p>
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          <StatCard
            title="Total Patients"
            value={stats.totalPatients.toLocaleString()}
            icon={Users}
            change="+12%"
            color="blue"
          />
          <StatCard
            title="Total Staff"
            value={stats.totalStaff}
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
            title="Monthly Revenue"
            value={`$${(stats.monthlyRevenue / 1000).toFixed(0)}K`}
            icon={DollarSign}
            change="+15%"
            color="primary"
          />
          <StatCard
            title="System Health"
            value={`${stats.systemHealth}%`}
            icon={Activity}
            change="+2%"
            color="green"
          />
        </div>

        {/* Pending Approvals Section */}
        {pendingApprovals.length > 0 && (
          <div className="card border-2 border-orange-200 bg-orange-50">
            <div className="flex items-center justify-between mb-6">
              <h3 className="heading-responsive text-orange-900 flex items-center">
                <UserPlus className="h-6 w-6 mr-2 text-orange-600" />
                ⚠️ Pending Approvals ({pendingApprovals.length})
              </h3>
              <button
                onClick={fetchPendingApprovals}
                disabled={loadingApprovals}
                className="btn-secondary"
              >
                {loadingApprovals ? 'Refreshing...' : 'Refresh'}
              </button>
            </div>
            
            <div className="bg-orange-100 p-4 rounded-lg mb-4">
              <p className="text-orange-800 text-sm">
                <strong>Action Required:</strong> These users have verified their emails and are waiting for admin approval to access the system.
              </p>
            </div>
            
            {loadingApprovals ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600"></div>
                <span className="ml-2 text-orange-600">Loading pending approvals...</span>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {pendingApprovals.map((user) => (
                  <PendingApprovalCard key={user._id} user={user} />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Quick Actions */}
        <div className="card">
          <h3 className="heading-responsive text-gray-900 mb-6">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <QuickActionCard
              title="User Management"
              description="Manage staff accounts and permissions"
              icon={Users}
              color="blue"
              onClick={() => {/* Navigate to user management */}}
            />
            <QuickActionCard
              title="System Settings"
              description="Configure hospital settings"
              icon={Settings}
              color="primary"
              onClick={() => {/* Navigate to settings */}}
            />
            <QuickActionCard
              title="Generate Reports"
              description="Create system reports and analytics"
              icon={BarChart3}
              color="green"
              onClick={() => {/* Navigate to reports */}}
            />
            <QuickActionCard
              title="Security Audit"
              description="Review system security logs"
              icon={Shield}
              color="red"
              onClick={() => {/* Navigate to security audit */}}
            />
            <QuickActionCard
              title="Send Notifications"
              description="Send system-wide announcements"
              icon={Mail}
              color="purple"
              onClick={() => {/* Navigate to notifications */}}
            />
            <QuickActionCard
              title="Backup System"
              description="Create system backup"
              icon={FileText}
              color="orange"
              onClick={() => {/* Navigate to backup */}}
            />
          </div>
        </div>

        {/* Recent Activities and System Alerts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Activities */}
          <div className="card">
            <h3 className="heading-responsive text-gray-900 mb-6">Recent Activities</h3>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    activity.priority === 'high' ? 'bg-red-500' :
                    activity.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                  }`}></div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">{activity.message}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* System Alerts */}
          <div className="card">
            <h3 className="heading-responsive text-gray-900 mb-6">System Alerts</h3>
            <div className="space-y-4">
              {systemAlerts.map((alert) => (
                <div key={alert.id} className="flex items-start space-x-3">
                  <alert.icon className={`w-5 h-5 mt-0.5 ${
                    alert.type === 'warning' ? 'text-yellow-500' :
                    alert.type === 'info' ? 'text-blue-500' : 'text-green-500'
                  }`} />
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">{alert.message}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard; 
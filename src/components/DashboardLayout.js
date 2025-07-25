import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Menu, 
  X, 
  Home, 
  Users, 
  UserCheck, 
  Calendar, 
  CreditCard, 
  Package, 
  UserCog, 
  BarChart3, 
  Settings, 
  LogOut,
  Heart,
  Bell,
  Search,
  User,
  Pill,
  Activity,
  FileText,
  Phone,
  MessageSquare
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const DashboardLayout = ({ children, title }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // Role-based menu items
  const getMenuItems = () => {
    const baseItems = [
      { name: 'Dashboard', icon: Home, path: '/dashboard' }
    ];

    switch (user?.role) {
      case 'admin':
        return [
          ...baseItems,
          { name: 'Patients', icon: Users, path: '/patients' },
          { name: 'Doctors', icon: UserCheck, path: '/doctors' },
          { name: 'Staff', icon: UserCog, path: '/staff' },
          { name: 'Appointments', icon: Calendar, path: '/appointments' },
          { name: 'Billing', icon: CreditCard, path: '/billing' },
          { name: 'Inventory', icon: Package, path: '/inventory' },
          { name: 'Reports', icon: BarChart3, path: '/reports' },
          { name: 'Settings', icon: Settings, path: '/settings' }
        ];
      
      case 'doctor':
        return [
          ...baseItems,
          { name: 'Patients', icon: Users, path: '/patients' },
          { name: 'Appointments', icon: Calendar, path: '/appointments' },
          { name: 'Medical Records', icon: FileText, path: '/medical-records' },
          { name: 'Prescriptions', icon: Pill, path: '/prescriptions' },
          { name: 'Reports', icon: BarChart3, path: '/reports' }
        ];
      
      case 'nurse':
        return [
          ...baseItems,
          { name: 'Patients', icon: Users, path: '/patients' },
          { name: 'Appointments', icon: Calendar, path: '/appointments' },
          { name: 'Vital Signs', icon: Activity, path: '/vitals' },
          { name: 'Patient Care', icon: Heart, path: '/patient-care' },
          { name: 'Medication', icon: Pill, path: '/medication' }
        ];
      
      case 'receptionist':
        return [
          ...baseItems,
          { name: 'Patients', icon: Users, path: '/patients' },
          { name: 'Appointments', icon: Calendar, path: '/appointments' },
          { name: 'Billing', icon: CreditCard, path: '/billing' },
          { name: 'Patient Registration', icon: UserCog, path: '/registration' },
          { name: 'Communications', icon: Phone, path: '/communications' }
        ];
      
      case 'pharmacy':
        return [
          ...baseItems,
          { name: 'Prescriptions', icon: Pill, path: '/prescriptions' },
          { name: 'Inventory', icon: Package, path: '/inventory' },
          { name: 'Patient Records', icon: FileText, path: '/patient-records' },
          { name: 'Orders', icon: Activity, path: '/orders' },
          { name: 'Reports', icon: BarChart3, path: '/reports' }
        ];
      
      case 'patient':
        return [
          ...baseItems,
          { name: 'My Appointments', icon: Calendar, path: '/my-appointments' },
          { name: 'Medical Records', icon: FileText, path: '/my-records' },
          { name: 'Family Health', icon: Users, path: '/family' },
          { name: 'Prescriptions', icon: Pill, path: '/my-prescriptions' },
          { name: 'Messages', icon: MessageSquare, path: '/messages' }
        ];
      
      default:
        return baseItems;
    }
  };

  // Debug: Log user, role, and menu items
  React.useEffect(() => {
    console.log('DashboardLayout user:', user);
    if (user) {
      console.log('User role:', user.role);
    } else {
      console.log('No user found in AuthContext');
    }
    console.log('Sidebar menu items:', getMenuItems());
  }, [user, getMenuItems]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const menuItems = getMenuItems();

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const toggleUserMenu = () => setIsUserMenuOpen(!isUserMenuOpen);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
          <Link to="/dashboard" className="flex items-center space-x-2">
            <Heart className="h-8 w-8 text-primary-500" />
            <span className="text-xl font-bold font-righteous text-gray-900">
              Prana
            </span>
          </Link>
          <button
            onClick={toggleSidebar}
            className="lg:hidden text-gray-500 hover:text-gray-700"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* User Profile Section */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center">
              <User className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">{user?.name}</p>
              <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="mt-6">
          <div className="px-3">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`${
                    isActive 
                      ? 'sidebar-item active' 
                      : 'sidebar-item'
                  } mb-1`}
                  onClick={() => {
                    setIsSidebarOpen(false);
                    if (item.path === '/family' || item.path === '/family-health') {
                      console.log('Sidebar navigating to', item.path);
                    }
                  }}
                >
                  <Icon className="h-5 w-5 mr-3" />
                  {item.name}
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Logout Button */}
        <div className="absolute bottom-6 left-3 right-3">
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-4 py-3 text-gray-700 rounded-lg hover:bg-red-50 hover:text-red-700 transition-colors duration-200"
          >
            <LogOut className="h-5 w-5 mr-3" />
            Logout
          </button>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 lg:ml-0">
        {/* Top Navigation */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="flex items-center justify-between h-16 px-6">
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleSidebar}
                className="lg:hidden text-gray-500 hover:text-gray-700"
              >
                <Menu className="h-6 w-6" />
              </button>
              <h1 className="text-xl font-semibold text-gray-900">
                {title || 'Dashboard'}
              </h1>
            </div>

            <div className="flex items-center space-x-4">
              {/* Search Bar */}
              <div className="hidden md:block relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search..."
                  className="block w-64 pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>

              {/* Notifications */}
              <button className="relative text-gray-500 hover:text-gray-700">
                <Bell className="h-6 w-6" />
                <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></span>
              </button>

              {/* User Menu */}
              <div className="relative">
                <button
                  onClick={toggleUserMenu}
                  className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 focus:outline-none"
                >
                  <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center">
                    <User className="h-5 w-5 text-white" />
                  </div>
                  <span className="hidden md:block text-sm font-medium">
                    {user?.name}
                  </span>
                </button>

                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                    <div className="px-4 py-2 border-b border-gray-200">
                      <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                      <p className="text-xs text-gray-500">{user?.email}</p>
                    </div>
                    {user?.role === 'admin' && (
                      <Link
                        to="/settings"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <Settings className="h-4 w-4 inline mr-2" />
                        Settings
                      </Link>
                    )}
                    <button
                      onClick={handleLogout}
                      className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <LogOut className="h-4 w-4 inline mr-2" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;

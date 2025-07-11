import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// Import pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Dashboard from './pages/Dashboard';
import PatientManagement from './pages/PatientManagement';
import DoctorManagement from './pages/DoctorManagement';
import AppointmentManagement from './pages/AppointmentManagement';
import BillingManagement from './pages/BillingManagement';
import InventoryManagement from './pages/InventoryManagement';
import StaffManagement from './pages/StaffManagement';
import ReportsPage from './pages/ReportsPage';
import SettingsPage from './pages/SettingsPage';
import EmailVerificationPage from './pages/EmailVerificationPage';
import FamilyManagement from './pages/FamilyManagement';
import WaitingApprovalPage from './pages/WaitingApprovalPage';
import CreateAdminPage from './pages/CreateAdminPage';
import AboutUsPage from './pages/AboutUsPage';
import ContactUsPage from './pages/ContactUsPage';
import ServicesPage from './pages/ServicesPage';
import MyAppointments from './pages/MyAppointments';
import MyRecords from './pages/MyRecords';
import MyPrescriptions from './pages/MyPrescriptions';
import Messages from './pages/Messages';

// Import context providers and components
import { AuthProvider, useAuth } from './context/AuthContext';
import RoleBasedRoute from './components/RoleBasedRoute';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
};

// Public Route Component (redirect if logged in)
const PublicRoute = ({ children }) => {
  const { user } = useAuth();
  return !user ? children : <Navigate to="/dashboard" />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Toaster position="top-right" />
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutUsPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/contact" element={<ContactUsPage />} />
            <Route 
              path="/login" 
              element={
                <PublicRoute>
                  <LoginPage />
                </PublicRoute>
              } 
            />
            <Route 
              path="/register" 
              element={
                <PublicRoute>
                  <RegisterPage />
                </PublicRoute>
              } 
            />
            <Route path="/verify-email" element={<EmailVerificationPage />} />
            <Route path="/waiting-approval" element={<WaitingApprovalPage />} />
            <Route path="/create-admin" element={<CreateAdminPage />} />

            {/* Dashboard - Accessible to all authenticated users */}
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            {/* Family Management - Patient only */}
            <Route 
              path="/family" 
              element={
                <RoleBasedRoute allowedRoles={['patient']}>
                  <FamilyManagement />
                </RoleBasedRoute>
              }
            />

            {/* Patient Dashboard Pages */}
            <Route 
              path="/my-appointments" 
              element={
                <RoleBasedRoute allowedRoles={['patient']}>
                  <MyAppointments />
                </RoleBasedRoute>
              }
            />
            <Route 
              path="/my-records" 
              element={
                <RoleBasedRoute allowedRoles={['patient']}>
                  <MyRecords />
                </RoleBasedRoute>
              }
            />
            <Route 
              path="/my-prescriptions" 
              element={
                <RoleBasedRoute allowedRoles={['patient']}>
                  <MyPrescriptions />
                </RoleBasedRoute>
              }
            />
            <Route 
              path="/messages" 
              element={
                <RoleBasedRoute allowedRoles={['patient']}>
                  <Messages />
                </RoleBasedRoute>
              }
            />

            {/* Admin Routes */}
            <Route 
              path="/patients" 
              element={
                <RoleBasedRoute allowedRoles={['admin', 'doctor', 'nurse', 'receptionist']}>
                  <PatientManagement />
                </RoleBasedRoute>
              }
            />
            <Route 
              path="/doctors" 
              element={
                <RoleBasedRoute allowedRoles={['admin']}>
                  <DoctorManagement />
                </RoleBasedRoute>
              }
            />
            <Route 
              path="/staff" 
              element={
                <RoleBasedRoute allowedRoles={['admin']}>
                  <StaffManagement />
                </RoleBasedRoute>
              }
            />
            <Route 
              path="/reports" 
              element={
                <RoleBasedRoute allowedRoles={['admin', 'doctor']}>
                  <ReportsPage />
                </RoleBasedRoute>
              }
            />
            <Route 
              path="/settings" 
              element={
                <RoleBasedRoute allowedRoles={['admin']}>
                  <SettingsPage />
                </RoleBasedRoute>
              }
            />

            {/* Doctor Routes */}
            <Route 
              path="/appointments" 
              element={
                <RoleBasedRoute allowedRoles={['admin', 'doctor', 'nurse', 'receptionist']}>
                  <AppointmentManagement />
                </RoleBasedRoute>
              }
            />

            {/* Receptionist Routes */}
            <Route 
              path="/billing" 
              element={
                <RoleBasedRoute allowedRoles={['admin', 'receptionist']}>
                  <BillingManagement />
                </RoleBasedRoute>
              }
            />

            {/* Pharmacy Routes */}
            <Route 
              path="/inventory" 
              element={
                <RoleBasedRoute allowedRoles={['admin', 'pharmacy']}>
                  <InventoryManagement />
                </RoleBasedRoute>
              }
            />

            {/* Fallback route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;

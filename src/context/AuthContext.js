import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import API_BASE_URL from '../config/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Configure axios defaults
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      // Validate token by fetching user data
      fetchUser();
    } else {
      setLoading(false);
    }
  }, []);

  const fetchUser = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/auth/user`);
      setUser(response.data);
    } catch (error) {
      console.error('Failed to fetch user:', error);
      if (error.response?.status === 403 && error.response?.data?.needsApproval) {
        // Handle pending approval
        toast.error('Your account is pending approval. Please contact the administrator.');
      }
      logout();
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/auth/login`, {
        email,
        password,
      });

      const { token, user } = response.data;
      
      localStorage.setItem('token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setUser(user);
      
      toast.success('Logged in successfully!');
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || 'Login failed';
      
      if (error.response?.status === 403 && error.response?.data?.needsApproval) {
        toast.error('Your account is pending approval. Please contact the administrator.');
        return { success: false, error: message, needsApproval: true };
      }
      
      toast.error(message);
      return { success: false, error: message };
    }
  };

  const register = async (userData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/auth/register`, userData);
      const { message, emailSent } = response.data;
      // Do NOT set user or token here!
      return { success: true, message, emailSent };
    } catch (error) {
      const message = error.response?.data?.message || 'Registration failed';
      return { success: false, error: message };
    }
  };

  const verifyEmail = async (token) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/auth/verify-email`, { token });
      const { token: newToken, user, message } = response.data;
      
      localStorage.setItem('token', newToken);
      axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
      setUser(user);
      
      toast.success(message || 'Email verified successfully!');
      return { success: true, message };
    } catch (error) {
      const message = error.response?.data?.message || 'Email verification failed';
      toast.error(message);
      return { success: false, error: message };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
    setUser(null);
    toast.success('Logged out successfully');
  };

  const setUserDirectly = (userData) => {
    setUser(userData);
  };

  // Admin functions
  const getPendingApprovals = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/auth/pending-approvals`);
      return { success: true, data: response.data };
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to fetch pending approvals';
      toast.error(message);
      return { success: false, error: message };
    }
  };

  const approveUser = async (userId, approved) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/auth/approve-user`, {
        userId,
        approved
      });
      
      toast.success(response.data.message);
      return { success: true, data: response.data };
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to approve user';
      toast.error(message);
      return { success: false, error: message };
    }
  };

  // Family member functions
  const searchUsers = async (searchTerm) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/family/search`, {
        searchTerm
      });
      return { success: true, data: response.data };
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to search users';
      toast.error(message);
      return { success: false, error: message };
    }
  };

  const sendFamilyRequest = async (requestedId, relationship, notes) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/family/request`, {
        requestedId,
        relationship,
        notes
      });
      
      toast.success(response.data.message);
      return { success: true, data: response.data };
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to send family request';
      toast.error(message);
      return { success: false, error: message };
    }
  };

  const getFamilyRequests = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/family/requests`);
      return { success: true, data: response.data };
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to fetch family requests';
      toast.error(message);
      return { success: false, error: message };
    }
  };

  const respondToFamilyRequest = async (requestId, status) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/family/respond`, {
        requestId,
        status
      });
      
      toast.success(response.data.message);
      return { success: true, data: response.data };
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to respond to family request';
      toast.error(message);
      return { success: false, error: message };
    }
  };

  const removeFamilyMember = async (requestId) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/api/family/remove`, {
        data: { requestId }
      });
      
      toast.success(response.data.message);
      return { success: true, data: response.data };
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to remove family member';
      toast.error(message);
      return { success: false, error: message };
    }
  };

  const value = {
    user,
    login,
    register,
    verifyEmail,
    logout,
    setUserDirectly,
    loading,
    getPendingApprovals,
    approveUser,
    searchUsers,
    sendFamilyRequest,
    getFamilyRequests,
    respondToFamilyRequest,
    removeFamilyMember,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

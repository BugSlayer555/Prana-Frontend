import React, { useState, useEffect } from 'react';
import { 
  Users, 
  UserPlus, 
  Search, 
  CheckCircle, 
  XCircle, 
  Clock, 
  UserX,
  Mail,
  Phone,
  Copy,
  AlertCircle,
  Heart
} from 'lucide-react';
import DashboardLayout from '../components/DashboardLayout';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const FamilyManagement = () => {
  const { user, searchUsers, sendFamilyRequest, getFamilyRequests, respondToFamilyRequest, removeFamilyMember } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [familyRequests, setFamilyRequests] = useState({
    incoming: [],
    outgoing: [],
    accepted: []
  });
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [relationship, setRelationship] = useState('');
  const [notes, setNotes] = useState('');

  const relationships = [
    { value: 'spouse', label: 'Spouse' },
    { value: 'parent', label: 'Parent' },
    { value: 'child', label: 'Child' },
    { value: 'sibling', label: 'Sibling' },
    { value: 'grandparent', label: 'Grandparent' },
    { value: 'grandchild', label: 'Grandchild' },
    { value: 'other', label: 'Other' }
  ];

  useEffect(() => {
    fetchFamilyRequests();
  }, []);

  const fetchFamilyRequests = async () => {
    try {
      const result = await getFamilyRequests();
      if (result.success) {
        setFamilyRequests(result.data);
      }
    } catch (error) {
      console.error('Failed to fetch family requests:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      toast.error('Please enter a search term');
      return;
    }

    setIsSearching(true);
    try {
      const result = await searchUsers(searchTerm);
      if (result.success) {
        setSearchResults(result.data);
      }
    } catch (error) {
      console.error('Failed to search users:', error);
    } finally {
      setIsSearching(false);
    }
  };

  const handleSendRequest = async () => {
    if (!selectedUser || !relationship) {
      toast.error('Please select a user and relationship');
      return;
    }

    try {
      const result = await sendFamilyRequest(selectedUser._id, relationship, notes);
      if (result.success) {
        setShowAddForm(false);
        setSelectedUser(null);
        setRelationship('');
        setNotes('');
        setSearchResults([]);
        setSearchTerm('');
        fetchFamilyRequests();
      }
    } catch (error) {
      console.error('Failed to send family request:', error);
    }
  };

  const handleRespondToRequest = async (requestId, status) => {
    try {
      const result = await respondToFamilyRequest(requestId, status);
      if (result.success) {
        fetchFamilyRequests();
      }
    } catch (error) {
      console.error('Failed to respond to request:', error);
    }
  };

  const handleRemoveFamilyMember = async (requestId) => {
    if (window.confirm('Are you sure you want to remove this family member?')) {
      try {
        const result = await removeFamilyMember(requestId);
        if (result.success) {
          fetchFamilyRequests();
        }
      } catch (error) {
        console.error('Failed to remove family member:', error);
      }
    }
  };

  const copyUniqueId = (uniqueId) => {
    navigator.clipboard.writeText(uniqueId);
    toast.success('Unique ID copied to clipboard!');
  };

  const getFamilyMemberName = (request) => {
    if (request.requesterId._id === user._id) {
      return request.requestedId.name;
    }
    return request.requesterId.name;
  };

  const getFamilyMemberEmail = (request) => {
    if (request.requesterId._id === user._id) {
      return request.requestedId.email;
    }
    return request.requesterId.email;
  };

  const getFamilyMemberUniqueId = (request) => {
    if (request.requesterId._id === user._id) {
      return request.requestedId.uniqueId;
    }
    return request.requesterId.uniqueId;
  };

  if (loading) {
    return (
      <DashboardLayout title="Family Management">
        <div className="flex items-center justify-center min-h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="Family Management">
      <div className="section-spacing">
        {/* Welcome Section */}
        <div className="card gradient-secondary text-white">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="heading-responsive text-white">Family Management</h1>
              <p className="text-secondary-100 mt-2 text-responsive">Manage your family connections and health coordination</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-secondary-100">Your Unique ID</p>
              <div className="flex items-center space-x-2 bg-white bg-opacity-20 rounded-lg px-3 py-1">
                <span className="text-white font-mono text-sm">{user?.uniqueId}</span>
                <button
                  onClick={() => copyUniqueId(user?.uniqueId)}
                  className="text-white hover:text-secondary-200 transition-colors"
                  title="Copy Unique ID"
                >
                  <Copy className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Add Family Member Section */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h3 className="heading-responsive text-gray-900">Add Family Member</h3>
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="btn-primary"
            >
              <UserPlus className="h-5 w-5 mr-2" />
              {showAddForm ? 'Cancel' : 'Add Family Member'}
            </button>
          </div>

          {showAddForm && (
            <div className="space-y-6 p-6 bg-gray-50 rounded-lg">
              {/* Search Section */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Search by Email or Unique ID
                </label>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Enter email or unique ID"
                    className="flex-1 input-field"
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  />
                  <button
                    onClick={handleSearch}
                    disabled={isSearching}
                    className="btn-secondary"
                  >
                    {isSearching ? (
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    ) : (
                      <Search className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Search Results */}
              {searchResults.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-3">Search Results</h4>
                  <div className="space-y-2">
                    {searchResults.map((user) => (
                      <div
                        key={user._id}
                        className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                          selectedUser?._id === user._id
                            ? 'border-primary-500 bg-primary-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => setSelectedUser(user)}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-gray-900">{user.name}</p>
                            <p className="text-sm text-gray-600">{user.email}</p>
                            <p className="text-sm text-gray-500">ID: {user.uniqueId}</p>
                          </div>
                          <div className="text-right">
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                              user.role === 'patient' ? 'bg-blue-100 text-blue-800' :
                              user.role === 'doctor' ? 'bg-green-100 text-green-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                            </span>
                            {!user.isVerified && (
                              <p className="text-xs text-red-600 mt-1">Email not verified</p>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Relationship Selection */}
              {selectedUser && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Relationship
                    </label>
                    <select
                      value={relationship}
                      onChange={(e) => setRelationship(e.target.value)}
                      className="input-field"
                    >
                      <option value="">Select relationship</option>
                      {relationships.map((rel) => (
                        <option key={rel.value} value={rel.value}>
                          {rel.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Notes (Optional)
                    </label>
                    <textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Add any additional notes..."
                      className="input-field"
                      rows="3"
                    />
                  </div>

                  <button
                    onClick={handleSendRequest}
                    disabled={!relationship}
                    className="btn-primary w-full"
                  >
                    Send Family Request
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Incoming Requests */}
        {familyRequests.incoming.length > 0 && (
          <div className="card">
            <h3 className="heading-responsive text-gray-900 mb-6 flex items-center">
              <Clock className="h-6 w-6 mr-2 text-orange-500" />
              Pending Requests ({familyRequests.incoming.length})
            </h3>
            <div className="space-y-4">
              {familyRequests.incoming.map((request) => (
                <div key={request._id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="font-semibold text-gray-900">{request.requesterId.name}</h4>
                      <p className="text-sm text-gray-600">{request.requesterId.email}</p>
                      <p className="text-sm text-gray-500">ID: {request.requesterId.uniqueId}</p>
                    </div>
                    <span className="text-sm text-gray-500">
                      {new Date(request.requestedAt).toLocaleDateString()}
                    </span>
                  </div>
                  
                  <div className="mb-4">
                    <p className="text-sm text-gray-700">
                      <span className="font-medium">Relationship:</span> {request.relationship.charAt(0).toUpperCase() + request.relationship.slice(1)}
                    </p>
                    {request.notes && (
                      <p className="text-sm text-gray-600 mt-1">
                        <span className="font-medium">Notes:</span> {request.notes}
                      </p>
                    )}
                  </div>

                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleRespondToRequest(request._id, 'accepted')}
                      className="flex-1 bg-green-600 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-green-700 transition-colors duration-200"
                    >
                      <CheckCircle className="h-4 w-4 inline mr-1" />
                      Accept
                    </button>
                    <button
                      onClick={() => handleRespondToRequest(request._id, 'declined')}
                      className="flex-1 bg-red-600 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-red-700 transition-colors duration-200"
                    >
                      <XCircle className="h-4 w-4 inline mr-1" />
                      Decline
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Outgoing Requests */}
        {familyRequests.outgoing.length > 0 && (
          <div className="card">
            <h3 className="heading-responsive text-gray-900 mb-6 flex items-center">
              <Clock className="h-6 w-6 mr-2 text-blue-500" />
              Sent Requests ({familyRequests.outgoing.length})
            </h3>
            <div className="space-y-4">
              {familyRequests.outgoing.map((request) => (
                <div key={request._id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="font-semibold text-gray-900">{request.requestedId.name}</h4>
                      <p className="text-sm text-gray-600">{request.requestedId.email}</p>
                      <p className="text-sm text-gray-500">ID: {request.requestedId.uniqueId}</p>
                    </div>
                    <span className="text-sm text-gray-500">
                      {new Date(request.requestedAt).toLocaleDateString()}
                    </span>
                  </div>
                  
                  <div className="mb-4">
                    <p className="text-sm text-gray-700">
                      <span className="font-medium">Relationship:</span> {request.relationship.charAt(0).toUpperCase() + request.relationship.slice(1)}
                    </p>
                    {request.notes && (
                      <p className="text-sm text-gray-600 mt-1">
                        <span className="font-medium">Notes:</span> {request.notes}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center justify-center">
                    <span className="text-sm text-gray-500 flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      Waiting for response
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Accepted Family Members */}
        {familyRequests.accepted.length > 0 && (
          <div className="card">
            <h3 className="heading-responsive text-gray-900 mb-6 flex items-center">
              <Heart className="h-6 w-6 mr-2 text-green-500" />
              Family Members ({familyRequests.accepted.length})
            </h3>
            <div className="space-y-4">
              {familyRequests.accepted.map((request) => (
                <div key={request._id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="font-semibold text-gray-900">{getFamilyMemberName(request)}</h4>
                      <p className="text-sm text-gray-600">{getFamilyMemberEmail(request)}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="text-sm text-gray-500">ID: {getFamilyMemberUniqueId(request)}</span>
                        <button
                          onClick={() => copyUniqueId(getFamilyMemberUniqueId(request))}
                          className="text-gray-400 hover:text-gray-600 transition-colors"
                          title="Copy Unique ID"
                        >
                          <Copy className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-sm text-gray-500">
                        {new Date(request.respondedAt || request.requestedAt).toLocaleDateString()}
                      </span>
                      <p className="text-xs text-green-600 mt-1">Connected</p>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <p className="text-sm text-gray-700">
                      <span className="font-medium">Relationship:</span> {request.relationship.charAt(0).toUpperCase() + request.relationship.slice(1)}
                    </p>
                    {request.notes && (
                      <p className="text-sm text-gray-600 mt-1">
                        <span className="font-medium">Notes:</span> {request.notes}
                      </p>
                    )}
                  </div>

                  <button
                    onClick={() => handleRemoveFamilyMember(request._id)}
                    className="w-full bg-red-600 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-red-700 transition-colors duration-200"
                  >
                    <UserX className="h-4 w-4 inline mr-1" />
                    Remove Family Member
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {familyRequests.incoming.length === 0 && 
         familyRequests.outgoing.length === 0 && 
         familyRequests.accepted.length === 0 && (
          <div className="card text-center py-12">
            <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Family Connections</h3>
            <p className="text-gray-600 mb-6">
              Start by adding family members to coordinate healthcare and share important information.
            </p>
            <button
              onClick={() => setShowAddForm(true)}
              className="btn-primary"
            >
              <UserPlus className="h-5 w-5 mr-2" />
              Add Your First Family Member
            </button>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default FamilyManagement; 
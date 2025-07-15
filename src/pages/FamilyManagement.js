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
  Heart,
  UserCircle,
  FileText,
  Pill
} from 'lucide-react';
import DashboardLayout from '../components/DashboardLayout';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
// Remove react-loading-skeleton imports

// Mock data for family member details
const mockFamilyDetails = {
  prescriptions: [
    {
      id: 1,
      medication: 'Paracetamol 500mg',
      dosage: '1 tablet every 6 hours',
      doctor: 'Dr. John Smith',
      startDate: '2024-02-01',
      refills: 1,
      status: 'Active',
      instructions: 'Take after meals',
    },
    {
      id: 2,
      medication: 'Amoxicillin 250mg',
      dosage: '1 capsule every 8 hours',
      doctor: 'Dr. Jane Doe',
      startDate: '2024-01-15',
      refills: 0,
      status: 'Expired',
      instructions: 'Complete the full course',
    },
  ],
  reports: [
    {
      id: 1,
      name: 'Blood Test Report',
      date: '2024-01-20',
      url: '#',
    },
    {
      id: 2,
      name: 'X-Ray Chest',
      date: '2024-01-25',
      url: '#',
    },
  ],
  info: {
    age: 35,
    gender: 'Male',
    phone: '123-456-7890',
  },
};

const FamilyManagement = () => {
  const { user, searchUsers, sendFamilyRequest, getFamilyRequests, respondToFamilyRequest, removeFamilyMember } = useAuth();
  // Debug: Log user and familyRequests
  useEffect(() => {
    console.log('FamilyManagement user:', user);
  }, [user]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [familyRequests, setFamilyRequests] = useState({
    incoming: [],
    outgoing: [],
    accepted: []
  });
  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    const loadData = async () => {
      const start = Date.now();
      try {
        const result = await getFamilyRequests();
        if (result.success && isMounted) {
          setFamilyRequests(result.data);
        }
      } catch (error) {
        console.error('Failed to fetch family requests:', error);
      } finally {
        const elapsed = Date.now() - start;
        const minDelay = 600;
        setTimeout(() => { if (isMounted) setLoading(false); }, Math.max(0, minDelay - elapsed));
      }
    };
    loadData();
    return () => { isMounted = false; };
  }, []);
  useEffect(() => {
    console.log('FamilyManagement familyRequests:', familyRequests);
  }, [familyRequests]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [relationship, setRelationship] = useState('');
  const [notes, setNotes] = useState('');
  const [selectedFamily, setSelectedFamily] = useState(null);
  const [showFamilyModal, setShowFamilyModal] = useState(false);

  const relationships = [
    { value: 'spouse', label: 'Spouse' },
    { value: 'parent', label: 'Parent' },
    { value: 'child', label: 'Child' },
    { value: 'sibling', label: 'Sibling' },
    { value: 'grandparent', label: 'Grandparent' },
    { value: 'grandchild', label: 'Grandchild' },
    { value: 'other', label: 'Other' }
  ];

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
        <div className="section-spacing">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {[1,2,3].map(i => (
              <div key={i} className="rounded-xl shadow-lg border border-primary-100 overflow-hidden bg-white flex flex-col p-6 animate-pulse">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200" />
                  <div className="flex-1">
                    <div className="h-4 w-24 rounded bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 mb-2" />
                    <div className="h-3 w-12 rounded bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200" />
                  </div>
                </div>
                <div className="h-3 w-32 rounded bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 mb-2" />
                <div className="h-3 w-24 rounded bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 mb-2" />
                <div className="h-8 w-24 rounded bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 mt-4" />
              </div>
            ))}
          </div>
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {familyRequests.accepted.map((request) => {
                const name = getFamilyMemberName(request);
                const relation = request.relationship.charAt(0).toUpperCase() + request.relationship.slice(1);
                return (
                  <div key={request._id} className="rounded-xl shadow-lg border border-primary-100 overflow-hidden bg-white flex flex-col">
                    <div className="flex items-center gap-3 bg-primary-500 px-6 py-4">
                      <UserCircle className="h-9 w-9 text-white" />
                      <div>
                        <span className="text-lg font-bold text-white tracking-wide">{name}</span>
                        <div className="text-xs text-primary-100">{relation}</div>
                      </div>
                      <span className="ml-auto px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700 flex items-center gap-1">
                        <CheckCircle className="h-4 w-4 text-green-500" /> Connected
                      </span>
                    </div>
                    <div className="flex-1 flex flex-col gap-2 p-6">
                      <div className="flex flex-col gap-1 mb-2">
                        <span className="text-sm text-gray-700">Email: {getFamilyMemberEmail(request)}</span>
                        <span className="text-sm text-gray-700 flex items-center gap-1">ID: {getFamilyMemberUniqueId(request)}
                          <button onClick={() => copyUniqueId(getFamilyMemberUniqueId(request))} className="text-gray-400 hover:text-gray-600 transition-colors" title="Copy Unique ID">
                            <Copy className="h-3 w-3" />
                          </button>
                        </span>
                      </div>
                      <button
                        onClick={() => { setSelectedFamily(request); setShowFamilyModal(true); }}
                        className="btn-secondary w-full mt-2"
                      >
                        View Details
                      </button>
                      <button
                        onClick={() => handleRemoveFamilyMember(request._id)}
                        className="w-full bg-red-600 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-red-700 transition-colors duration-200 mt-2"
                      >
                        <UserX className="h-4 w-4 inline mr-1" /> Remove
                      </button>
                    </div>
                  </div>
                );
              })}
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

      {/* Family Member Modal */}
      {showFamilyModal && selectedFamily && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl p-8 relative">
            <button className="absolute top-4 right-4 text-gray-400 hover:text-gray-700" onClick={() => setShowFamilyModal(false)}>
              <XCircle className="h-6 w-6" />
            </button>
            {selectedFamily && selectedFamily.relationship ? (
              <>
                <div className="flex items-center gap-4 mb-6">
                  <UserCircle className="h-14 w-14 text-primary-500" />
                  <div>
                    <div className="text-xl font-bold text-primary-700">{getFamilyMemberName(selectedFamily)}</div>
                    <div className="text-sm text-gray-600">{selectedFamily.relationship.charAt(0).toUpperCase() + selectedFamily.relationship.slice(1)}</div>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Prescriptions */}
                  <div>
                    <div className="flex items-center gap-2 mb-2"><Pill className="h-5 w-5 text-primary-400" /><span className="font-semibold text-primary-700">Prescriptions</span></div>
                    <div className="space-y-2">
                      {mockFamilyDetails.prescriptions.map(p => (
                        <div key={p.id} className="border rounded-lg p-3 flex flex-col bg-gray-50">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-bold text-gray-800">{p.medication}</span>
                            <span className={`ml-auto px-2 py-0.5 rounded-full text-xs font-semibold ${p.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{p.status}</span>
                          </div>
                          <div className="text-xs text-gray-600">{p.dosage} | {p.doctor}</div>
                          <div className="text-xs text-gray-500">Start: {p.startDate} | Refills: {p.refills}</div>
                          <div className="text-xs text-gray-700 mt-1">{p.instructions}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                  {/* Reports */}
                  <div>
                    <div className="flex items-center gap-2 mb-2"><FileText className="h-5 w-5 text-primary-400" /><span className="font-semibold text-primary-700">Reports</span></div>
                    <div className="space-y-2">
                      {mockFamilyDetails.reports.map(r => (
                        <div key={r.id} className="border rounded-lg p-3 flex items-center bg-gray-50">
                          <span className="font-bold text-gray-800 flex-1">{r.name}</span>
                          <span className="text-xs text-gray-500 mr-2">{r.date}</span>
                          <a href={r.url} className="btn-link text-xs" download>Download</a>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                {/* Basic Info */}
                <div className="mt-6">
                  <div className="font-semibold text-primary-700 mb-2">Basic Info</div>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-700">
                    <span>Age: {mockFamilyDetails.info.age}</span>
                    <span>Gender: {mockFamilyDetails.info.gender}</span>
                    <span className="flex items-center gap-1"><Phone className="h-4 w-4 text-primary-400" /> {mockFamilyDetails.info.phone}</span>
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center text-red-500 font-semibold py-12">Family member data is missing or invalid.</div>
            )}
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default FamilyManagement; 
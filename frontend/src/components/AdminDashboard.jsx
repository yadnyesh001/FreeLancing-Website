import React, { useEffect, useState } from 'react';
import { axiosInstance } from '../lib/axios';

const AdminDashboard = () => {
  const [selectedSection, setSelectedSection] = useState('earnings');
  const [clients, setClients] = useState([]);
  const [freelancers, setFreelancers] = useState([]);
  const [earnings, setEarnings] = useState(0);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [showSuccessNotification, setShowSuccessNotification] = useState(false);
  const [showDeletionSuccessNotification, setShowDeletionSuccessNotification] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [userTypeToDelete, setUserTypeToDelete] = useState(null);

  const fetchData = async (endpoint, setter, errorMessage) => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(`/${endpoint}`);
      setter(endpoint === 'earnings' ? response.data.totalEarnings : response.data);
    } catch (error) {
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };  

  useEffect(() => {
    // Check for successful login immediately on component mount
    const loginSuccess = localStorage.getItem('loginSuccess');
    
    if (loginSuccess === 'true') {
      // Remove the flag immediately to prevent showing on refresh
      localStorage.removeItem('loginSuccess');
      
      // Show notification immediately
      setShowSuccessNotification(true);
      
      // Hide notification after 3 seconds
      setTimeout(() => {
        setShowSuccessNotification(false);
      }, 2000);
    }

    // Fetch data independently from notification logic
    fetchData('clients', setClients, 'Error fetching clients');
    fetchData('freelancers', setFreelancers, 'Error fetching freelancers');
    fetchData('earnings', setEarnings, 'Error fetching earnings');
  }, []);

  const handleDeleteConfirmation = (id, type) => {
    setUserToDelete(id);
    setUserTypeToDelete(type);
    setShowConfirmationModal(true);
  };

  const confirmDelete = async () => {
    try {
      await axiosInstance.delete(`/users/${userToDelete}`);
      
      // Update the list based on user type
      if (userTypeToDelete === 'clients') {
        setClients(clients.filter(client => client._id !== userToDelete));
      } else {
        setFreelancers(freelancers.filter(freelancer => freelancer._id !== userToDelete));
      }
      
      // Close confirmation modal
      setShowConfirmationModal(false);
      
      // Show deletion success notification
      setShowDeletionSuccessNotification(true);
      
      // Hide deletion success notification after 3 seconds
      setTimeout(() => {
        setShowDeletionSuccessNotification(false);
      }, 2000);
    } catch (error) {
      setError(`Error deleting ${userTypeToDelete}`);
    }
  };

  const StatCard = ({ title, value, icon }) => (
    <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-gray-600 text-sm font-medium">{title}</h3>
        <span className="text-blue-500">{icon}</span>
      </div>
      <div className="text-2xl font-semibold text-gray-800">{value}</div>
    </div>
  );

  const UserList = ({ users, type, onDelete }) => (
    <div className="grid gap-4">
      {users.map((user) => (
        <div 
          key={user._id} 
          className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 flex justify-between items-center"
        >
          <div className="flex flex-col">
            <span className="text-gray-800 font-semibold text-lg">{user.name}</span>
            <span className="text-gray-500 text-sm">{user.email}</span>
          </div>
          <button 
            onClick={() => onDelete(user._id, type)}
            className="px-4 py-2 bg-red-100 text-red-600 rounded-md hover:bg-red-200 transition-colors cursor-pointer"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 relative">
      {/* Success Notification */}
      {showSuccessNotification && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded shadow-md z-50" role="alert">
          <div className="flex items-center">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
            </svg>
            <span className="font-medium">Successfully logged in!</span>
          </div>
        </div>
      )}

      {/* Deletion Success Notification */}
      {showDeletionSuccessNotification && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded shadow-md z-50" role="alert">
          <div className="flex items-center">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
            </svg>
            <span className="font-medium">User deleted successfully!</span>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {showConfirmationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl">
            <h3 className="text-lg font-semibold mb-4">Confirm Deletion</h3>
            <p className="mb-6">Are you sure you want to delete this user?</p>
            <div className="flex justify-end space-x-4">
              <button 
                onClick={() => setShowConfirmationModal(false)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 cursor-pointer"
              >
                Cancel
              </button>
              <button 
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white min-h-screen shadow-sm">
          <div className="p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-6 cursor-pointer">Admin Dashboard</h2>
            <nav>
              {['earnings', 'clients', 'freelancers'].map((section) => (
                <button
                  key={section}
                  onClick={() => setSelectedSection(section)}
                  className={`w-full text-left px-4 py-3 rounded-lg mb-2 transition-colors cursor-pointer ${
                    selectedSection === section
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          {error && (
            <div className="mb-4 p-4 bg-red-100 text-red-600 rounded-lg">
              {error}
            </div>
          )}

          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
            </div>
          ) : (
            <>
              {selectedSection === 'earnings' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-800">Dashboard Overview</h2>
                  <div className="grid grid-cols-3 gap-6">
                    <StatCard 
                      title="Total Earnings" 
                      value={`$${earnings.toLocaleString()}`}
                      icon="💰"
                    />
                    <StatCard 
                      title="Total Clients" 
                      value={clients.length}
                      icon="👥"
                    />
                    <StatCard 
                      title="Total Freelancers" 
                      value={freelancers.length}
                      icon="👨‍💻"
                    />
                  </div>
                </div>
              )}

              {selectedSection === 'clients' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-800">Clients</h2>
                  <UserList 
                    users={clients}
                    type="clients"
                    onDelete={handleDeleteConfirmation}
                  />
                </div>
              )}

              {selectedSection === 'freelancers' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-800">Freelancers</h2>
                  <UserList 
                    users={freelancers}
                    type="freelancers"
                    onDelete={handleDeleteConfirmation}
                  />
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
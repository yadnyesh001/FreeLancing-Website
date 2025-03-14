import React, { useEffect, useState } from 'react';
import { axiosInstance } from '../lib/axios';

const AdminDashboard = () => {
  const [selectedSection, setSelectedSection] = useState('earnings');
  const [clients, setClients] = useState([]);
  const [freelancers, setFreelancers] = useState([]);
  const [filteredClients, setFilteredClients] = useState([]);
  const [filteredFreelancers, setFilteredFreelancers] = useState([]);
  const [earnings, setEarnings] = useState(0);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [showSuccessNotification, setShowSuccessNotification] = useState(false);
  const [showDeletionSuccessNotification, setShowDeletionSuccessNotification] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [userTypeToDelete, setUserTypeToDelete] = useState(null);
  const [clientsCurrentPage, setClientsCurrentPage] = useState(1);
  const [freelancersCurrentPage, setFreelancersCurrentPage] = useState(1);
  const [clientsSearchQuery, setClientsSearchQuery] = useState('');
  const [freelancersSearchQuery, setFreelancersSearchQuery] = useState('');
  const usersPerPage = 5;

  const fetchData = async (endpoint, setter, errorMessage) => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(`/${endpoint}`);
      setter(endpoint === 'earnings' ? response.data.totalEarnings : response.data);
      
      // Also set filtered data initially
      if (endpoint === 'clients') {
        setFilteredClients(response.data);
      } else if (endpoint === 'freelancers') {
        setFilteredFreelancers(response.data);
      }
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
    // fetchData('earnings', setEarnings, 'Error fetching earnings');
  }, []);

  // Update filtered clients when clients change or search query changes
  useEffect(() => {
    if (clientsSearchQuery.trim() === '') {
      setFilteredClients(clients);
    } else {
      const filtered = clients.filter(client => 
        client.username.toLowerCase().includes(clientsSearchQuery.toLowerCase())
      );
      setFilteredClients(filtered);
    }
  }, [clients, clientsSearchQuery]);

  // Update filtered freelancers when freelancers change or search query changes
  useEffect(() => {
    if (freelancersSearchQuery.trim() === '') {
      setFilteredFreelancers(freelancers);
    } else {
      const filtered = freelancers.filter(freelancer => 
        freelancer.username.toLowerCase().includes(freelancersSearchQuery.toLowerCase())
      );
      setFilteredFreelancers(filtered);
    }
  }, [freelancers, freelancersSearchQuery]);

  // Handle client search
  const handleClientSearch = (value) => {
    setClientsSearchQuery(value);
    setClientsCurrentPage(1); // Reset to first page when searching
  };

  // Handle freelancer search
  const handleFreelancerSearch = (value) => {
    setFreelancersSearchQuery(value);
    setFreelancersCurrentPage(1); // Reset to first page when searching
  };

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
        const updatedClients = clients.filter(client => client._id !== userToDelete);
        setClients(updatedClients);
      } else {
        const updatedFreelancers = freelancers.filter(freelancer => freelancer._id !== userToDelete);
        setFreelancers(updatedFreelancers);
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

  // Pagination helpers
  const getPageData = (items, currentPage) => {
    const indexOfLastItem = currentPage * usersPerPage;
    const indexOfFirstItem = indexOfLastItem - usersPerPage;
    return items.slice(indexOfFirstItem, indexOfLastItem);
  };

  const calculateTotalPages = (items) => {
    return Math.ceil(items.length / usersPerPage);
  };

  // Get current users based on pagination
  const currentClients = getPageData(filteredClients, clientsCurrentPage);
  const currentFreelancers = getPageData(filteredFreelancers, freelancersCurrentPage);

  // Total pages calculation
  const totalClientsPages = calculateTotalPages(filteredClients);
  const totalFreelancersPages = calculateTotalPages(filteredFreelancers);

  const StatCard = ({ title, value, icon }) => (
    <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-gray-600 text-sm font-medium">{title}</h3>
        <span className="text-blue-500">{icon}</span>
      </div>
      <div className="text-2xl font-semibold text-gray-800">{value}</div>
    </div>
  );

  const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    // Generate page numbers with ellipsis for large page counts
    const getPageNumbers = () => {
      const pages = [];
      
      if (totalPages <= 5) {
        // If 5 or fewer pages, show all
        for (let i = 1; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        // Always include first page
        pages.push(1);
        
        if (currentPage > 3) {
          pages.push('...');
        }
        
        // Current page and neighbors
        const startPage = Math.max(2, currentPage - 1);
        const endPage = Math.min(totalPages - 1, currentPage + 1);
        
        for (let i = startPage; i <= endPage; i++) {
          pages.push(i);
        }
        
        if (currentPage < totalPages - 2) {
          pages.push('...');
        }
        
        // Always include last page
        if (totalPages > 1) {
          pages.push(totalPages);
        }
      }
      
      return pages;
    };

    return (
      <div className="flex justify-center mt-6">
        <nav className="flex items-center">
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="flex items-center justify-center w-10 h-10 mr-1 rounded-full focus:outline-none transition-colors duration-200 ease-in-out"
            style={{
              backgroundColor: currentPage === 1 ? '#f3f4f6' : '#f9fafb',
              color: currentPage === 1 ? '#9ca3af' : '#4b5563',
              border: '1px solid',
              borderColor: currentPage === 1 ? '#e5e7eb' : '#d1d5db',
              cursor: currentPage === 1 ? 'not-allowed' : 'pointer'
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
            </svg>
          </button>
          
          {getPageNumbers().map((number, index) => (
            number === '...' ? (
              <span key={`ellipsis-${index}`} className="mx-1 px-2">...</span>
            ) : (
              <button
                key={number}
                onClick={() => onPageChange(number)}
                className="flex items-center justify-center w-10 h-10 mx-1 rounded-full focus:outline-none transition-colors duration-200 ease-in-out cursor-pointer"
                style={{
                  backgroundColor: currentPage === number ? '#3b82f6' : '#f9fafb',
                  color: currentPage === number ? 'white' : '#4b5563',
                  border: '1px solid',
                  borderColor: currentPage === number ? '#3b82f6' : '#d1d5db',
                  fontWeight: currentPage === number ? 'bold' : 'normal'
                }}
              >
                {number}
              </button>
            )
          ))}
          
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="flex items-center justify-center w-10 h-10 ml-1 rounded-full focus:outline-none transition-colors duration-200 ease-in-out"
            style={{
              backgroundColor: currentPage === totalPages ? '#f3f4f6' : '#f9fafb',
              color: currentPage === totalPages ? '#9ca3af' : '#4b5563',
              border: '1px solid',
              borderColor: currentPage === totalPages ? '#e5e7eb' : '#d1d5db',
              cursor: currentPage === totalPages ? 'not-allowed' : 'pointer'
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
            </svg>
          </button>
        </nav>
      </div>
    );
  };

  const SearchBar = ({ value, onChange, placeholder }) => (
    <div className="mb-6">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg className="w-5 h-5 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
          </svg>
        </div>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500 shadow-sm"
          placeholder={placeholder}
        />
        {value && (
          <button
            onClick={() => onChange('')}
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        )}
      </div>
    </div>
  );

  const UserList = ({ users, type, onDelete }) => (
    <div className="grid gap-4">
      {users.length > 0 ? (
        users.map((user) => (
          <div 
            key={user._id} 
            className="bg-white p-3.5 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 flex justify-between items-center"
          >
            <div className="flex flex-col">
              <span className="text-gray-800 font-semibold text-lg">{user.username}</span>
              <span className="text-gray-500 text-sm">{user.email}</span>
            </div>
            <button 
              onClick={() => onDelete(user._id, type)}
              className="px-4 py-2 bg-red-100 text-red-600 rounded-md hover:bg-red-200 transition-colors cursor-pointer"
            >
              Delete
            </button>
          </div>
        ))
      ) : (
        <div className="text-center py-8 bg-white rounded-lg shadow-sm">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No users found</h3>
          <p className="mt-1 text-sm text-gray-500">Try adjusting your search criteria.</p>
        </div>
      )}
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
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold text-gray-800">Clients</h2>
                  
                  {/* Search Bar for Clients */}
                  <SearchBar 
                    value={clientsSearchQuery}
                    onChange={handleClientSearch}
                    placeholder="Search clients by username..."
                  />
                  
                  {/* Clients List with Pagination */}
                  <UserList 
                    users={currentClients}
                    type="clients"
                    onDelete={handleDeleteConfirmation}
                  />
                  
                  {/* Pagination Controls */}
                  {filteredClients.length > 0 && (
                    <Pagination 
                      currentPage={clientsCurrentPage}
                      totalPages={totalClientsPages}
                      onPageChange={setClientsCurrentPage}
                    />
                  )}
                </div>
              )}

              {selectedSection === 'freelancers' && (
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold text-gray-800">Freelancers</h2>
                  
                  {/* Search Bar for Freelancers */}
                  <SearchBar 
                    value={freelancersSearchQuery}
                    onChange={handleFreelancerSearch}
                    placeholder="Search freelancers by username..."
                  />
                  
                  {/* Freelancers List with Pagination */}
                  <UserList 
                    users={currentFreelancers}
                    type="freelancers"
                    onDelete={handleDeleteConfirmation}
                  />
                  
                  {/* Pagination Controls */}
                  {filteredFreelancers.length > 0 && (
                    <Pagination 
                      currentPage={freelancersCurrentPage}
                      totalPages={totalFreelancersPages}
                      onPageChange={setFreelancersCurrentPage}
                    />
                  )}
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
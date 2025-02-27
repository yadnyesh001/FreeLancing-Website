import React, { useEffect, useState } from 'react';

const AdminDashboard = () => {
  const [selectedSection, setSelectedSection] = useState('earnings');
  const [clients, setClients] = useState([]);
  const [freelancers, setFreelancers] = useState([]);
  const [earnings, setEarnings] = useState(0);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchData = async (endpoint, setter, errorMessage) => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:3000/api/v1/${endpoint}`);
      const data = await response.json();
      setter(endpoint === 'earnings' ? data.totalEarnings : data);
    } catch (error) {
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData('clients', setClients, 'Error fetching clients');
    fetchData('freelancers', setFreelancers, 'Error fetching freelancers');
    fetchData('earnings', setEarnings, 'Error fetching earnings');
  }, []);

  const handleDelete = async (id, type) => {
    try {
      await fetch(`http://localhost:3000/api/v1/users/${id}`, {
        method: 'DELETE'
      }); 
      fetchData(type, type === 'clients' ? setClients : setFreelancers);
    } catch (error) {
      setError(`Error deleting ${type}`);
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
            onClick={() => onDelete(user._id)}
            className="px-4 py-2 bg-red-100 text-red-600 rounded-md hover:bg-red-200 transition-colors"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white min-h-screen shadow-sm">
          <div className="p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Admin Dashboard</h2>
            <nav>
              {['earnings', 'clients', 'freelancers'].map((section) => (
                <button
                  key={section}
                  onClick={() => setSelectedSection(section)}
                  className={`w-full text-left px-4 py-3 rounded-lg mb-2 transition-colors ${
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
                    onDelete={(id) => handleDelete(id, 'clients')}
                  />
                </div>
              )}

              {selectedSection === 'freelancers' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-800">Freelancers</h2>
                  <UserList 
                    users={freelancers}
                    type="freelancers"
                    onDelete={(id) => handleDelete(id, 'freelancers')}
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

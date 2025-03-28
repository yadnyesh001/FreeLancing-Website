import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from '../lib/axios';
import { Clock, Calendar, DollarSign, Briefcase, BarChart2, Bell, MessageSquare, User } from 'lucide-react';

const FreelancerDashboard = ({ 
  stats = [],
  activeProjects = [],
  notifications = [],
  upcomingDeadlines = []
}) => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(true);
  const [showSuccessNotification, setShowSuccessNotification] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
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
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUserId(parsedUser.id);
      } catch (err) {
        console.error("Error parsing user data from localStorage:", err);
      }
    }
  }, []);

  // Fetch user data from backend using axios
  useEffect(() => {
    if (!userId) return;
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get(`users/${userId}`);
        console.log("User data:", response.data);

        setUserName(response.data.username || "");
        setLoading(false);
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError(err.message || "Failed to fetch user data");
        setLoading(false);
      }
    };

    if (userId) {
      fetchUserData();
    } else {
      // If no userId is provided, don't show loading state
      setLoading(false);
    }
  }, [userId]);

  // Default stats format if none provided
  const defaultStats = [
    { title: 'Active Projects', value: 0, icon: Briefcase, color: 'bg-blue-500' },
    { title: 'Completed', value: 0, icon: BarChart2, color: 'bg-green-500' },
    { title: 'Hours this week', value: 0, icon: Clock, color: 'bg-purple-500' },
    { title: 'Available Balance', value: '$0.00', icon: DollarSign, color: 'bg-yellow-500' },
  ];

  // Use provided stats or defaults
  const displayStats = stats.length ? stats : defaultStats;

  // Handle navigation to find work and update profile
  const handleFindWork = () => {
    navigate('/find-work');
  };

  const handleUpdateProfile = () => {
    navigate('/update-profile-freelancer');
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Main content */}
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
      <div className="container mx-auto px-4 py-8">
        {/* Welcome message */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Welcome back, {loading ? "..." : (userName || "Freelancer")}!
              {error && <span className="text-sm text-gray-500 ml-2">(Error loading name)</span>}
            </h1>
            <p className="text-gray-600">Here's what's happening with your projects today.</p>
          </div>
          <div className="flex space-x-4">
            <button 
              onClick={handleUpdateProfile}
              className="bg-gray-600 text-white px-4 py-2 rounded font-medium hover:bg-gray-700 flex items-center cursor-pointer"
            >
              <User className="mr-2" size={16} /> 
              Update Profile
            </button>
            <button 
              onClick={handleFindWork}
              className="bg-blue-600 text-white px-4 py-2 rounded font-medium hover:bg-blue-700 cursor-pointer"
            >
              Find New Projects
            </button>
          </div>
        </div>

        {/* Rest of the component remains the same */}
        {/* Stats overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {displayStats.map((stat, index) => (
            <div key={index} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <stat.icon className="text-white" size={20} />
                </div>
                <div className="ml-4">
                  <p className="text-gray-500 text-sm font-medium">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-700">{stat.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Rest of the dashboard code remains unchanged */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Active projects */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow">
              <div className="p-6 border-b">
                <h2 className="text-lg font-bold text-gray-800">Active Projects</h2>
              </div>
              <div className="overflow-x-auto">
                {activeProjects.length > 0 ? (
                  <table className="w-full">
                    <thead className="bg-gray-50 text-xs text-gray-700">
                      <tr>
                        <th className="px-6 py-3 text-left">Project</th>
                        <th className="px-6 py-3 text-left">Client</th>
                        <th className="px-6 py-3 text-left">Due Date</th>
                        <th className="px-6 py-3 text-left">Budget</th>
                        <th className="px-6 py-3 text-left">Progress</th>
                      </tr>
                    </thead>
                    <tbody className="text-sm text-gray-700">
                      {activeProjects.map((project) => (
                        <tr key={project.id} className="border-b hover:bg-gray-50">
                          <td className="px-6 py-4 font-medium">{project.title}</td>
                          <td className="px-6 py-4">{project.client}</td>
                          <td className="px-6 py-4">
                            <div className="flex items-center">
                              <Calendar size={14} className="mr-1 text-gray-500" />
                              {project.dueDate}
                            </div>
                          </td>
                          <td className="px-6 py-4 font-medium">{project.budget}</td>
                          <td className="px-6 py-4">
                            <div className="flex items-center">
                              <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
                                <div
                                  className="bg-blue-600 h-2.5 rounded-full"
                                  style={{ width: `${project.progress}%` }}
                                ></div>
                              </div>
                              <span>{project.progress}%</span>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div className="p-6 text-center text-gray-500">
                    No active projects found. Start bidding to get your first project!
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right sidebar */}
          <div className="space-y-8">
            {/* Notifications */}
            <div className="bg-white rounded-lg shadow">
              <div className="p-6 border-b">
                <h2 className="text-lg font-bold text-gray-800">Notifications</h2>
              </div>
              <div>
                {notifications.length > 0 ? (
                  notifications.map((notification) => (
                    <div key={notification.id} className="p-4 border-b hover:bg-gray-50">
                      <p className="text-gray-700">{notification.message}</p>
                      <p className="text-gray-500 text-sm mt-1">{notification.time}</p>
                    </div>
                  ))
                ) : (
                  <div className="p-6 text-center text-gray-500">
                    No new notifications
                  </div>
                )}
                <div className="p-4 text-center">
                  <button className="text-blue-600 text-sm font-medium">View All Notifications</button>
                </div>
              </div>
            </div>

            {/* Upcoming deadlines */}
            <div className="bg-white rounded-lg shadow">
              <div className="p-6 border-b">
                <h2 className="text-lg font-bold text-gray-800">Upcoming Deadlines</h2>
              </div>
              <div>
                {upcomingDeadlines.length > 0 ? (
                  upcomingDeadlines.map((deadline) => (
                    <div key={deadline.id} className="p-4 border-b hover:bg-gray-50">
                      <div className="flex items-start">
                        <div className="bg-red-100 text-red-800 p-2 rounded-lg mr-3">
                          <Calendar size={16} />
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">{deadline.title}</p>
                          <p className="text-gray-600 text-sm">{deadline.client}</p>
                          <p className="text-gray-500 text-sm mt-1">Due: {deadline.date}</p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-6 text-center text-gray-500">
                    No upcoming deadlines
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FreelancerDashboard;
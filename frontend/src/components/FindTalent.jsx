import React, { useEffect, useState } from 'react';
import { Mail, ExternalLink, Star } from 'lucide-react';
import { axiosInstance } from '../lib/axios';

const FindTalent = () => {
  const [freelancers, setFreelancers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getAvatarUrl = (name) => {
    const firstLetter = name.charAt(0).toLowerCase();
    return `https://api.dicebear.com/7.x/initials/svg?seed=${firstLetter}`;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'short' });
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  useEffect(() => {
    const fetchFreelancers = async () => {
      try {
        const response = await axiosInstance.get("/freelancers");
        setFreelancers(response.data);
      } catch (error) {
        console.error("Error fetching freelancers:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFreelancers();
  }, []);

  const RatingDisplay = ({ rating }) => {
    if (!rating) {
      return (
        <div className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded-lg">
          <Star size={14} className="text-gray-500" />
          <span className="text-sm font-medium text-gray-600">New</span>
        </div>
      );
    }

    return (
      <div className="flex items-center gap-1 bg-yellow-100 px-2 py-1 rounded-lg">
        <Star size={14} className="text-yellow-500 fill-yellow-500" />
        <span className="text-sm font-medium text-gray-700">{rating.toFixed(1)}</span>
      </div>
    );
  };

  const SkillBar = ({ skill }) => (
    <div className="px-4 py-1.5 bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 rounded-lg text-sm font-medium cursor-default">
      {skill}
    </div>
  );

  if (isLoading) {
    return (
      <div className="container mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm overflow-hidden animate-pulse h-[380px]">
              <div className="h-48 bg-gray-100" />
              <div className="p-6 space-y-4">
                <div className="h-5 bg-gray-100 rounded-full w-3/4" />
                <div className="h-4 bg-gray-100 rounded-full w-1/2" />
                <div className="h-4 bg-gray-100 rounded-full w-2/3" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 bg-gray-50">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {freelancers.map((freelancer) => (
          <div
            key={freelancer.id}
            className="bg-white rounded-xl shadow-sm overflow-hidden flex flex-col h-full border border-gray-100 transition-all duration-300"
          >
            <div className="p-6 flex-grow">
              <div className="flex items-start gap-6">
                <div className="relative">
                  <img
                    src={getAvatarUrl(freelancer.name)}
                    alt={`${freelancer.name}'s avatar`}
                    className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-100 to-blue-200 p-1 object-cover border-2 border-white shadow-md"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h3 className="text-xl font-bold text-gray-800">{freelancer.name}</h3>
                    <RatingDisplay rating={freelancer.rating} />
                  </div>
                  <p className="text-gray-600 mt-1 text-sm">Joined: {formatDate(freelancer.createdAt)}</p>
                </div>
              </div>

              {freelancer.skills && freelancer.skills.length > 0 && (
                <div className="mt-8">
                  <h4 className="font-semibold text-gray-800 mb-4">Skills & Expertise</h4>
                  <div className="flex flex-wrap gap-2">
                    {freelancer.skills.map((skill, index) => (
                      <SkillBar key={index} skill={skill} />
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="p-4 bg-gray-50 mt-auto border-t border-gray-100">
              <div className="flex justify-between gap-4">
                <button className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white py-2.5 px-4 rounded-lg font-medium transition-colors duration-300">
                  <Mail size={18} />
                  <span>Contact</span>
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 bg-white text-gray-700 py-2.5 px-4 rounded-lg font-medium border border-gray-200 transition-colors duration-300">
                  <ExternalLink size={18} />
                  <span>View Profile</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FindTalent; 
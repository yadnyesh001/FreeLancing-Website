import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useAuthStore } from '../store/useAuthStore';
import { axiosInstance } from "../lib/axios";

const getAvatarUrl = (name) => {
  const firstLetter = name.charAt(0).toLowerCase();
  return `https://api.dicebear.com/7.x/initials/svg?seed=${firstLetter}`;
};

const UpdateProfile = () => {
  const { user } = useAuthStore();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    profileImage: "",
    skills: [],
    bio: ""
  });
  const [originalData, setOriginalData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [skillInput, setSkillInput] = useState("");
  const fileInputRef = useRef(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userId = user.id;
        
        if (!userId) {
          setError("User ID not found. Please log in.");
          setLoading(false);
          return;
        }

        const response = await axiosInstance.get(`/users/${userId}`);
        
        const userData = {
          name: response.data.username || user.username || "",
          email: response.data.email || user.email || "",
          profileImage: response.data.profileImage || getAvatarUrl(response.data.username || user.username),
          skills: response.data.skills || user.skills || [],
          bio: response.data.bio || user.bio || ""
        };

        setFormData(userData);
        setOriginalData(userData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user profile:", error);
        setError("Failed to load user profile");
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prevData => ({ 
          ...prevData, 
          profileImage: reader.result 
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const addSkill = () => {
    const trimmedSkill = skillInput.trim();
    if (trimmedSkill && !formData.skills.includes(trimmedSkill)) {
      setFormData(prevData => ({
        ...prevData,
        skills: [...prevData.skills, trimmedSkill]
      }));
      setSkillInput("");
    }
  };

  const removeSkill = (skillToRemove) => {
    setFormData(prevData => ({
      ...prevData,
      skills: prevData.skills.filter(skill => skill !== skillToRemove)
    }));
  };

  const getChangedFields = () => {
    const changedFields = {};
    
    // Check each field for changes
    Object.keys(formData).forEach(key => {
      // Handle array comparison for skills
      if (key === 'skills') {
        if (JSON.stringify(formData.skills) !== JSON.stringify(originalData.skills)) {
          changedFields.skills = formData.skills;
        }
      } 
      // Handle other fields
      else if (formData[key] !== originalData[key]) {
        changedFields[key] = formData[key];
      }
    });

    return changedFields;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const userId = user._id;
      
      // Get only the changed fields
      const updatedFields = getChangedFields();

      // Only send request if there are changes
      if (Object.keys(updatedFields).length > 0) {
        const response = await axiosInstance.patch(`/users/${userId}`, updatedFields);
        
        console.log("Update Response:", response.data);
        
        // Update original data after successful update
        setOriginalData(prevData => ({
          ...prevData,
          ...updatedFields
        }));
        
        setError("Profile updated successfully!");
      } else {
        setError("No changes to update.");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      setError(error.response?.data?.message || "Error updating profile");
    }

    setLoading(false);
  };

  // Rest of the component remains the same as in the previous version
  // ... (rendering logic stays unchanged)

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-semibold mb-4 text-center">Update Profile</h2>
      
      {error && (
        <div className={`mb-4 p-2 rounded ${error.includes('successfully') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {error}
        </div>
      )}
      
      <div className="mb-4 flex flex-col items-center">
        <div className="relative mb-2">
          <img 
            src={formData.profileImage || getAvatarUrl(formData.username)} 
            alt="Profile" 
            className="w-32 h-32 rounded-full object-cover border-2 border-blue-200"
          />
          <input 
            type="file" 
            ref={fileInputRef}
            onChange={handleImageUpload}
            accept="image/*"
            className="hidden"
          />
          <button 
            type="button"
            onClick={() => fileInputRef.current.click()}
            className="absolute bottom-0 right-0 bg-blue-500 text-white p-1.5 rounded-full"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 20h9"></path>
              <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
            </svg>
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          name="name"
          value={formData.username}
          onChange={handleChange}
          placeholder="Full Name"
          className="w-full p-2 border rounded"
        />
        
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email Address"
          className="w-full p-2 border rounded"
        />
        
        <div className="flex space-x-2">
          <input
            type="text"
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
            placeholder="Add Skill"
            className="flex-grow p-2 border rounded"
          />
          <button
            type="button"
            onClick={addSkill}
            className="bg-blue-500 text-white p-2 rounded"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
          </button>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-2">
          {formData.skills.map((skill) => (
            <div 
              key={skill} 
              className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full flex items-center text-sm"
            >
              {skill}
              <button
                type="button"
                onClick={() => removeSkill(skill)}
                className="ml-2 text-red-500"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
          ))}
        </div>
        
        <textarea
          name="bio"
          value={formData.bio}
          onChange={handleChange}
          placeholder="Bio"
          className="w-full p-2 border rounded min-h-[80px]"
        />
        
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded"
          disabled={loading}
        >
          {loading ? "Updating..." : "Update Profile"}
        </button>
      </form>
    </div>
  );
};

export default UpdateProfile;
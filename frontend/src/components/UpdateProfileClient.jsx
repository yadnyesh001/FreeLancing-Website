import React, { useState, useEffect, useRef } from "react";
import { useAuthStore } from '../store/useAuthStore';
import { axiosInstance } from "../lib/axios";

const getAvatarUrl = (name) => {
  if (!name) return "https://api.dicebear.com/7.x/initials/svg?seed=user";
  return `https://api.dicebear.com/7.x/initials/svg?seed=${name.charAt(0).toLowerCase()}`;
};

const UpdateProfile = () => {
  const { user } = useAuthStore();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    profileImage: "",
    bio: ""
  });
  const [originalData, setOriginalData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userId = user.id || user._id;
        if (!userId) {
          setError("User ID not found. Please log in.");
          return;
        }
        const { data } = await axiosInstance.get(`/users/${userId}`);
        const userData = {
          username: data.username || user.username || "",
          email: data.email || user.email || "",
          profileImage: data.profileImage || getAvatarUrl(data.username || user.username),
          bio: data.bio || user.bio || ""
        };
        setFormData(userData);
        setOriginalData(userData);
      } catch (err) {
        console.error("Error fetching user profile:", err);
        setError("Failed to load user profile.");
      }
    };
    fetchUserProfile();
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prevData) => ({ ...prevData, profileImage: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const getChangedFields = () => {
    const changedFields = {};
    Object.keys(formData).forEach((key) => {
      if (formData[key] !== originalData[key]) {
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
      const userId = user.id || user._id;
      const updatedFields = getChangedFields();
      if (!userId) {
        setError("User ID not found. Please log in.");
        setLoading(false);
        return;
      }
      if (Object.keys(updatedFields).length === 0) {
        setError("No changes to update.");
        setLoading(false);
        return;
      }
      await axiosInstance.patch(`/users/${userId}`, updatedFields);
      setOriginalData((prevData) => ({ ...prevData, ...updatedFields }));
      setError("Profile updated successfully!");
    } catch (err) {
      console.error("Error updating profile:", err);
      setError(err.response?.data?.message || "Error updating profile");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-semibold mb-4 text-center">Update Profile</h2>
      {error && (
        <div className={`mb-4 p-2 rounded ${error.includes("successfully") ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
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
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M12 20h9"></path>
              <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
            </svg>
          </button>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input type="text" name="username" value={formData.username} onChange={handleChange} placeholder="Full Name" className="w-full p-2 border rounded" />
        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email Address" className="w-full p-2 border rounded" />
        <textarea name="bio" value={formData.bio} onChange={handleChange} placeholder="Bio" className="w-full p-2 border rounded min-h-[80px]" />
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded" disabled={loading}>
          {loading ? "Updating..." : "Update Profile"}
        </button>
      </form>
    </div>
  );
};

export default UpdateProfile;

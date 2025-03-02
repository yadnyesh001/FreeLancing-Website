import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from '../store/auth';

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuthStore();
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Please enter a valid email address";

    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 6) newErrors.password = "Password must be at least 6 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);

    // Set timeout promise (2 seconds)
    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error("timeout")), 2000)
    );

    try {
      const response = await Promise.race([
        axios.post("http://localhost:3000/api/v1/auth/login", formData, { withCredentials: true }),
        timeoutPromise
      ]);

      const { user, success, token } = response.data;
      if (success) {
        setErrors({});
        login(token, user);
        
        // Store success state in localStorage instead of sessionStorage
        localStorage.setItem('loginSuccess', 'true');
        
        // Navigate based on user role
        let dashboardRoute;
        switch (user.role) {
          case "admin":
            dashboardRoute = "/admindashboard";
            break;
          case "freelancer":
            dashboardRoute = "/freelancerdashboard";
            break;
          case "client":
            dashboardRoute = "/clientdashboard";
            break;
          default:
            dashboardRoute = "/";
        }
        
        navigate(dashboardRoute);
      }
    } catch (error) {
      console.log("Login error:", error);

      if (error.message === "timeout") {
        setErrors({ submit: "Network error. Please check your connection and try again." });
      } else if (error.response) {
        setErrors({ submit: error.response.data.message || "Invalid credentials. Please try again." });
      } else if (error.request) {
        setErrors({ submit: "Network error. Please check your connection and try again." });
      } else {
        setErrors({ submit: "An unexpected error occurred. Please try again." });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-6">
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-8" noValidate>
          <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">Welcome Back</h1>

          {errors.submit && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md" role="alert">
              {errors.submit}
            </div>
          )}

          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
              disabled={loading}
            />
            {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.password ? "border-red-500" : "border-gray-300"
                }`}
                disabled={loading}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
          </div>

          <button
            type="submit"
            className={`w-full py-2 px-4 rounded-md text-white font-medium transition-colors cursor-pointer ${
              loading
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            }`}
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>

          <div className="mt-4 text-center text-sm text-gray-600">
            <a href="/signup" className="text-blue-600 hover:text-blue-700">
              Don't have an account? Sign up
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
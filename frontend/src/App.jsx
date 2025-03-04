import React from "react";
import { Routes, Route } from "react-router-dom";
import Signup from "./components/Signup.jsx";
import Login from "./components/Login.jsx";
import AdminDashboard from "./components/AdminDashboard.jsx";
import Navbar from "./components/Navbar.jsx";
import Home from "./components/Home.jsx";
import Footer from "./components/Footer.jsx";
import FindWork from "./components/FindWork.jsx";
import FindTalent from "./components/FindTalent.jsx";
import FreelancerDashboard from "./components/FreelancerDashboard.jsx";
import ClientDashboard from "./components/ClientDashboard.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />

          {/* Secure Dashboard Routes */}
          <Route
            path="/admindashboard"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/freelancerdashboard"
            element={
              <ProtectedRoute allowedRoles={["freelancer"]}>
                <FreelancerDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/clientdashboard"
            element={
              <ProtectedRoute allowedRoles={["client"]}>
                <ClientDashboard />
              </ProtectedRoute>
            }
          />

          <Route path="/find-work" element={<FindWork />} />
          <Route path="/find-talent" element={<FindTalent />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;

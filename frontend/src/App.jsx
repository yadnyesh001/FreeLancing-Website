import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Signup from './components/Signup.jsx';
import Login from './components/Login.jsx';
import AdminDashboard from './components/AdminDashboard.jsx';
import Navbar from './components/Navbar.jsx';
import Home from './components/Home.jsx';
import Footer from './components/Footer.jsx';
import FindWork from './components/FindWork.jsx';
import FindTalent from './components/FindTalent.jsx';
import FreelancerDashboard from './components/FreelancerDashboard.jsx';
import ClientDashboard from './components/ClientDashboard.jsx';

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admindashboard" element={<AdminDashboard />} />
          <Route path="/freelancerdashboard" element={<FreelancerDashboard />} />
          <Route path="/clientdashboard" element={<ClientDashboard />} />
          <Route path="/find-work" element={<FindWork />} />
          <Route path="/find-talent" element={<FindTalent />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;

import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { DoctorContext } from './context/DoctorContext';
import { AdminContext } from './context/AdminContext';

import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';

import Dashboard from './pages/Admin/Dashboard';
import AllAppointments from './pages/Admin/AllAppointments';
import AddDoctor from './pages/Admin/AddDoctor';
import DoctorsList from './pages/Admin/DoctorsList';

import Login from './pages/Login';
import DoctorAppointments from './pages/Doctor/DoctorAppointments';
import DoctorDashboard from './pages/Doctor/DoctorDashboard';
import DoctorProfile from './pages/Doctor/DoctorProfile';

const App = () => {
  const { dToken } = useContext(DoctorContext);
  const { aToken } = useContext(AdminContext);
  const isLoggedIn = dToken || aToken;

  return (
    <>
      <ToastContainer />
      {isLoggedIn ? (
        <div className="bg-[#F8F9FD]">
          <Navbar />
          <div className="flex items-start">
            <Sidebar />
            <div className="flex-1 p-4">
              <Routes>
                <Route path="/" element={<Navigate to={aToken ? "/admin-dashboard" : "/doctor-dashboard"} />} />
                <Route path="/admin-dashboard" element={<Dashboard />} />
                <Route path="/all-appointments" element={<AllAppointments />} />
                <Route path="/add-doctor" element={<AddDoctor />} />
                <Route path="/doctor-list" element={<DoctorsList />} />
                <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
                <Route path="/doctor-appointments" element={<DoctorAppointments />} />
                <Route path="/doctor-profile" element={<DoctorProfile />} />
              </Routes>
            </div>
          </div>
        </div>
      ) : (
        <Routes>
          <Route path="*" element={<Login />} />
        </Routes>
      )}
    </>
  );
};

export default App;

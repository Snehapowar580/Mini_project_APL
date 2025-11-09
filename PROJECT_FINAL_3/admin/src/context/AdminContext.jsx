import { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

export const AdminContext = createContext();

const AdminContextProvider = ({ children }) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000'; 

  const [aToken, setAToken] = useState(localStorage.getItem("aToken") || "");
  const [dashData, setDashData] = useState(null);
  const [appointments, setAppointments] = useState([]); 
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    if (aToken) {
      localStorage.setItem("aToken", aToken);
    } else {
      localStorage.removeItem("aToken");
    }
  }, [aToken]);

  const handleTokenError = (error) => {
    if (error.response?.status === 403 || error.response?.data?.message === 'Invalid token') {
      toast.error("Session expired. Please log in again.");
      setAToken("");
      localStorage.removeItem("aToken");
    } else {
      toast.error("Something went wrong!");
    }
  };

  const getDashData = async () => {
    const tokenToSend = aToken || localStorage.getItem("aToken");

    if (!tokenToSend) {
      toast.error("Admin token missing. Please login again.");
      return;
    }

    try {
      console.log("📦 Sending token to admin dashboard:", tokenToSend);
      const response = await axios.get(`${backendUrl}/api/admin/dashboard`, {
        headers: {
          Authorization: `Bearer ${tokenToSend}`,
        },
      });
      setDashData(response.data);
    } catch (error) {
      console.error('🚫 getDashData error:', error.response || error);
      handleTokenError(error);
    }
  };
  const getAllAppointments = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/appointments`, {
        headers: {
          Authorization: `Bearer ${aToken}`,
        },
      });
  
      console.log('Fetched appointments:', response.data); // Verify API response
  
      // If data is an array, set the appointments
      if (Array.isArray(response.data)) {
        setAppointments(response.data); // Ensure we are updating the state here
      } else {
        console.error('Fetched data is not an array:', response.data);
      }
    } catch (error) {
      console.error('Error fetching appointments:', error.response || error);
    }
  };
  const cancelAppointment = async (id) => {
    try {
      const { data } = await axios.patch(
        `${backendUrl}/api/appointment/cancel/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${aToken}`,
          },
        }
      );
      if (data.success) {
        toast.success("Appointment cancelled successfully");
        getDashData();
        getAllAppointments();
      } else {
        toast.error(data.message || "Failed to cancel appointment.");
      }
    } catch (err) {
      console.error("Cancel appointment error:", err);
      handleTokenError(err);
      toast.error("Error cancelling appointment.");
    }
  };

  const getAllDoctors = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/admin/doctors`, {
        headers: {
          Authorization: `Bearer ${aToken}`,
        },
      });
      setDoctors(response.data.doctors || []);
    } catch (error) {
      console.error('Error fetching doctors:', error.response || error.message);
      handleTokenError(error);
      toast.error("Failed to fetch doctors");
    }
  };

  const changeAvailability = async (id) => {
    try {
      const response = await axios.patch(
        `${backendUrl}/api/admin/doctor-availability/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${aToken}`,
          },
        }
      );
      if (response.data.success) {
        toast.success("Availability updated");
        getAllDoctors();  
      }
    } catch (error) {
      handleTokenError(error);
      toast.error("Failed to update availability");
      console.error("Error updating availability:", error);
    }
  };

  return (
    <AdminContext.Provider
      value={{
        aToken,
        setAToken,
        dashData,
        getDashData,
        cancelAppointment,
        appointments,
        getAllAppointments,
        doctors,
        getAllDoctors,
        changeAvailability,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;

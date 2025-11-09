import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const DoctorContext = createContext();

const DoctorContextProvider = ({ children }) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";

  const [dToken, setDToken] = useState(() => localStorage.getItem("dToken") || null);

  const [appointments, setAppointments] = useState([]);
  const [dashData, setDashData] = useState(null);
  const [profileData, setProfileData] = useState(null);

  const headers = {
    Authorization: `Bearer ${dToken}`,
  };

  // Get doctor appointments
  const getAppointments = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/doctors/appointments`, { headers });

      if (data.success) {
        setAppointments(data.appointments?.reverse() || []);
      } else {
        toast.error(data.message || "Failed to fetch appointments.");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error fetching appointments");
    }
  };

  // Get doctor profile data
  const getProfileData = async () => {
    if (!dToken) {
      console.error('No token available. Please log in.');
      toast.error('Authentication token missing.');
      return;
    }

    const headers = {
      Authorization: `Bearer ${dToken}`,
    };

    try {
      const { data } = await axios.get(`${backendUrl}/api/doctors/profile`, { headers });

      // Log the response to check the structure
      console.log("API Response:", data);

      // Check if profile data exists in the response
      if (data && data.profile) {
        setProfileData(data.profile);
        console.log("Profile data found:", data.profile);
      } else {
        console.error("No profile data found.");
        toast.error("Doctor profile data not found.");
        setProfileData(null); // Reset profileData if not found
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      toast.error('Error fetching profile');
      setProfileData(null); // Reset profileData on error
    }
  };

  // Dashboard data
  const getDashData = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/doctors/dashboard`, { headers });
      setDashData(data.dashData);
    } catch (error) {
      toast.error(error.response?.data?.message || "Error fetching dashboard data.");
    }
  };

  // Cancel an appointment
  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(`${backendUrl}/api/doctors/cancel-appointment`, { appointmentId }, { headers });
      if (data.success) {
        toast.success(data.message);
        getAppointments();
      } else {
        toast.error(data.message || "Failed to cancel appointment.");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to cancel appointment.");
    }
  };

  // Mark an appointment as complete
  const completeAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(`${backendUrl}/api/doctors/complete-appointment`, { appointmentId }, { headers });
      if (data.success) {
        toast.success(data.message);
        getAppointments();
      } else {
        toast.error(data.message || "Failed to complete appointment.");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to mark appointment as complete.");
    }
  };

  // Automatically fetch profile data and appointments when the token is set
  useEffect(() => {
    if (dToken) {
      getProfileData();
      getAppointments(); // Ensure appointments are fetched on mount
    }
  }, [dToken]);

  return (
    <DoctorContext.Provider
      value={{
        dToken,
        setDToken,
        appointments,
        getAppointments,
        cancelAppointment,
        completeAppointment,
        dashData,
        getDashData,
        profileData,
        setProfileData,
        getProfileData,
      }}
    >
      {children}
    </DoctorContext.Provider>
  );
};

export default DoctorContextProvider;

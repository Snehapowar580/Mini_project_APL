import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const currencySymbol = "₹";
  const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";

  const [doctors, setDoctors] = useState([]);
  const [token, setTokenState] = useState(localStorage.getItem("token") || "");
  const [userData, setUserData] = useState(null);

  // ✅ Sync token between localStorage and state
  const setToken = (newToken) => {
    setTokenState(newToken);
    if (newToken) {
      localStorage.setItem("token", newToken);
    } else {
      localStorage.removeItem("token");
    }
  };

  const getDoctorsData = async () => {
    try {
      const config = token
        ? { headers: { Authorization: `Bearer ${token}` } }
        : {};

      const res = await axios.get(`${backendUrl}/api/doctors/list`, config);

      if (res.data?.success && Array.isArray(res.data.doctors)) {
        setDoctors(res.data.doctors);
      } else {
        console.warn("Unexpected API response:", res.data);
        toast.error(res.data?.message || "Unable to fetch doctors.");
      }
    } catch (error) {
      console.error("❌ Error fetching doctors:", error);
      const message =
        error.response?.data?.message || "Failed to fetch doctor data.";
      toast.error(message);
    }
  };

  const loadUserProfileData = async () => {
    if (!token) return;

    try {
      const res = await axios.get(`${backendUrl}/api/user/get-profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.data?.success && res.data?.userData) {
        const user = res.data.userData;

        // ✅ Fix: Ensure profile_pic has a fallback if it's missing or empty
        const profile_pic = user.profile_pic && user.profile_pic.trim() !== ""
          ? user.profile_pic
          : "https://via.placeholder.com/150";

        const userWithProfilePic = {
          ...user,
          profile_pic,
        };

        setUserData(userWithProfilePic);
      } else {
        toast.error(res.data.message || "Failed to load profile.");
      }
    } catch (error) {
      console.error("❌ Error fetching user:", error);
      if (error.response?.status === 401) {
        toast.error("Session expired. Please log in again.");
        setToken(""); // clear token
      } else {
        toast.error("Failed to load user");
      }
    }
  };

  useEffect(() => {
    getDoctorsData();
  }, []);

  useEffect(() => {
    loadUserProfileData();
  }, [token]);

  return (
    <AppContext.Provider
      value={{
        doctors,
        getDoctorsData,
        currencySymbol,
        backendUrl,
        token,
        setToken,
        userData,
        setUserData,
        loadUserProfileData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
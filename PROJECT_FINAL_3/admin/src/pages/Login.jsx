import axios from 'axios';
import React, { useContext, useState } from 'react';
import { DoctorContext } from '../context/DoctorContext';
import { AdminContext } from '../context/AdminContext';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [role, setRole] = useState('Admin');  // Default role is Admin
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // Get token setters from context
  const { setDToken } = useContext(DoctorContext);
  const { setAToken } = useContext(AdminContext);
  const navigate = useNavigate();

  // Backend URL (make sure the environment variable is correctly set)
  const backendUrl = (import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000').replace(/\/+$/, '');

  // Handle form submission
  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      // Prepare payload
      const payload = {
        email: email.trim(),
        password: password.trim(),
      };

      // Determine the correct login URL based on the role
      const loginUrl =
        role === 'Admin'
          ? `${backendUrl}/api/admin/login`
          : `${backendUrl}/api/doctors/login`;

      // Log the final URL to verify it's correct
      console.log("Login URL:", loginUrl);

      // Send POST request to the login endpoint
      const { data } = await axios.post(loginUrl, payload);

      // If login is successful
      if (data?.success) {
        const token = data.token;

        // Store token in the appropriate context and localStorage
        if (role === 'Admin') {
          setAToken(token);
          localStorage.setItem('aToken', token);
          toast.success('Admin logged in successfully');
          navigate('/admin-dashboard');  // Redirect to Admin Dashboard
        } else {
          setDToken(token);
          localStorage.setItem('dToken', token);
          toast.success('Doctor logged in successfully');
          navigate('/doctor-dashboard');  // Redirect to Doctor Dashboard
        }

        // Clear the email and password fields
        setEmail('');
        setPassword('');
      } else {
        toast.error(data?.message || 'Login failed.');
      }
    } catch (error) {
      // Handle errors, both network or API-related
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        'An error occurred during login.';
      toast.error(errorMessage);
    } finally {
      // Stop loading animation after request
      setLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="min-h-[80vh] flex items-center">
      <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg">
        <p className="text-2xl font-semibold m-auto">
          <span className="text-purple-900">{role}</span> Login
        </p>

        <div className="w-full">
          <p>Email</p>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-[#DADADA] rounded w-full p-2 mt-1"
            required
          />
        </div>

        <div className="w-full">
          <p>Password</p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-[#DADADA] rounded w-full p-2 mt-1"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-purple-900 text-white w-full py-2 rounded-md text-base disabled:opacity-50"
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Login'}
        </button>

        <p className="text-center w-full">
          {role === 'Admin' ? (
            <>
              Techniciasn Login?{' '}
              <span
                onClick={() => setRole('Techniciasn')}
                className="text-purple-900 underline cursor-pointer"
              >
                Click here
              </span>
            </>
          ) : (
            <>
              Admin Login?{' '}
              <span
                onClick={() => setRole('Admin')}
                className="text-purple-900 underline cursor-pointer"
              >
                Click here
              </span>
            </>
          )}
        </p>
      </div>
    </form>
  );
};

export default Login;

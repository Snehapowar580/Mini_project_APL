import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [mode, setMode] = useState("Sign Up");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { backendUrl, token, setToken } = useContext(AppContext);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let payload = { email, password };

      if (mode === "Sign Up") {
        if (!name.trim()) {
          toast.error("Name is required for sign up");
          setLoading(false);
          return;
        }
        payload.name = name;
      }

      const endpoint =
        mode === "Sign Up" ? "/api/user/register" : "/api/user/login";

      const response = await axios.post(`${backendUrl}${endpoint}`, payload);
      const { data } = response;
      console.log("✅ Auth Response:", data);

      if (data.success && data.token) {
        localStorage.setItem("token", data.token); // ✅ fixed
        setToken(data.token); // ✅ fixed
        toast.success(`${mode} successful`);
      } else {
        toast.error(data.message || "Unexpected response");
      }
    } catch (err) {
      console.error("🛑 Login Error:", err.response?.data || err.message);
      const message = err.response?.data?.message || "Invalid credentials";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token, navigate]);

  return (
    <form onSubmit={onSubmitHandler} className="min-h-[80vh] flex items-center">
      <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg">
        <p className="text-2xl font-semibold">
          {mode === "Sign Up" ? "Create Account" : "Login"}
        </p>
        <p>
          Please {mode === "Sign Up" ? "sign up" : "log in"} to book appointment
        </p>

        {mode === "Sign Up" && (
          <div className="w-full">
            <p>Full Name</p>
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              className="border border-[#DADADA] rounded w-full p-2 mt-1"
              type="text"
              required
            />
          </div>
        )}

        <div className="w-full">
          <p>Email</p>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="border border-[#DADADA] rounded w-full p-2 mt-1"
            type="email"
            required
          />
        </div>

        <div className="w-full">
          <p>Password</p>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className="border border-[#DADADA] rounded w-full p-2 mt-1"
            type="password"
            required
            minLength={8}
          />
        </div>

        <button
          disabled={loading}
          className="bg-purple-900 text-white w-full py-2 my-2 rounded-md text-base disabled:opacity-60"
        >
          {loading
            ? "Please wait..."
            : mode === "Sign Up"
            ? "Create Account"
            : "Login"}
        </button>

        {mode === "Sign Up" ? (
          <p>
            Already have an account?{" "}
            <span
              onClick={() => setMode("Login")}
              className="text-purple-900 underline cursor-pointer"
            >
              Login here
            </span>
          </p>
        ) : (
          <p>
            Don't have an account?{" "}
            <span
              onClick={() => setMode("Sign Up")}
              className="text-purple-900 underline cursor-pointer"
            >
              Sign up here
            </span>
          </p>
        )}
      </div>
    </form>
  );
};

export default Login;

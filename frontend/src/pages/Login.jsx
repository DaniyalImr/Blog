import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

function Login() {
  const { setIsAuthenticated, setProfile } = useAuth();
  const navigateTo = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:4001/api/users/login",
        { email, password, role },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      localStorage.setItem("jwt", data.token);
      toast.success(data.message || "User Logined successfully", {
        duration: 3000,
      });
      setProfile(data);
      setIsAuthenticated(true);
      setEmail("");
      setPassword("");
      setRole("");
      navigateTo("/");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Please fill the required fields", {
          duration: 3000,
        }
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F7E8D0]">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8 transform transition duration-500 hover:scale-105">
        <form onSubmit={handleLogin}>
          <div className="font-semibold text-2xl text-center mb-6">
            Cilli<span className="text-[#243665]">Blog</span>
          </div>
          <h1 className="text-xl font-semibold mb-8 text-center text-gray-700">Login</h1>
          
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:border-[#243665]"
          >
            <option value="">Select Role</option>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>

          <div className="mb-4">
            <input
              type="email"
              placeholder="Your Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-[#243665]"
            />
          </div>

          <div className="mb-6">
            <input
              type="password"
              placeholder="Your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-[#243665]"
            />
          </div>

          <p className="text-center mb-6 text-gray-500">
            New User?{" "}
            <Link to={"/register"} className="text-[#243665] font-semibold hover:underline">
              Register Now
            </Link>
          </p>
          
          <button
            type="submit"
            className="w-full p-3 bg-[#243665] text-white font-semibold rounded-md hover:bg-[#1c2b52] transition-all duration-300 shadow-md"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;

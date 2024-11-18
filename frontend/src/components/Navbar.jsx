import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineMenu } from "react-icons/ai";
import { IoCloseSharp } from "react-icons/io5";
import { useAuth } from "../context/AuthProvider";
import axios from "axios";
import toast from "react-hot-toast";

function Navbar() {
  const [show, setShow] = useState(false);

  const { profile, isAuthenticated, setIsAuthenticated } = useAuth();
  const navigateTo = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(
        "http://localhost:4001/api/users/logout",
        { withCredentials: true }
      );
      localStorage.removeItem("jwt");
      toast.success(data.message);
      setIsAuthenticated(false);
      navigateTo("/login");
    } catch (error) {
      toast.error("Failed to logout");
    }
  };

  return (
    <nav className="shadow-lg px-4 py-3 bg-white text-gray-800">
      <div className="flex items-center justify-between container mx-auto">
        <div className="font-bold text-2xl text-blue-600">
          Daniyal<span className="text-black">Blog</span>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-6">
          {["HOME", "BLOGS", "CREATORS", "ABOUT", "CONTACT"].map((item, index) => (
            <Link key={index} to={`/${item.toLowerCase()}`} className="hover:text-blue-600 transition-colors">
              {item}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Icon */}
        <div className="md:hidden" onClick={() => setShow(!show)}>
          {show ? <IoCloseSharp size={26} /> : <AiOutlineMenu size={26} />}
        </div>

        {/* Desktop Authentication Links */}
        <div className="hidden md:flex space-x-3">
          {isAuthenticated && profile?.user?.role === "admin" && (
            <Link
              to="/dashboard"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-800 transition-colors"
            >
              DASHBOARD
            </Link>
          )}

          {!isAuthenticated ? (
            <Link
              to="/Login"
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
            >
              LOGIN
            </Link>
          ) : (
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
            >
              LOGOUT
            </button>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {show && (
        <div className="bg-white md:hidden absolute top-full left-0 w-full shadow-lg">
          <ul className="flex flex-col items-center py-4 space-y-4 text-lg">
            {["HOME", "BLOGS", "CREATORS", "ABOUT", "CONTACT"].map((item, index) => (
              <Link
                key={index}
                to={`/${item.toLowerCase()}`}
                onClick={() => setShow(false)}
                className="hover:text-blue-600"
              >
                {item}
              </Link>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}

export default Navbar;

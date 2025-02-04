import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear authentication data
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");
    navigate("/login");
  };

  return (
    <div className="w-full px-8 h-[70px] flex justify-between items-center shadow">
      <div className="font-semibold text-2xl ">
        <span className="text-slate-500">Course</span>
        <span className="text-gray-800">APP.</span>
      </div>
      <div>
        <button
          onClick={handleLogout}
          className="btn-primary bg-red-500 p-2 px-4 rounded-full hover:bg-red-600 hover:text-white hover:border-transparent"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;

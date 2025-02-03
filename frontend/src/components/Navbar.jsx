import React from "react";

const Navbar = () => {
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
        <button className="btn-primary bg-red-500 p-2 px-4 rounded-full">Logout</button>
      </div>
    </div>
  );
};

export default Navbar;

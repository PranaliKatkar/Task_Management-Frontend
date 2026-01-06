import React from "react";
import { useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();

  const username = localStorage.getItem("username");

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  const goDashboard = () => navigate("/dashboard");

  return (
    <div className="sidebar">
      <h2 className="logo">TaskFlow</h2>

      <p className="profile">
        👤 {username ? username : "Guest"}
      </p>

      <button onClick={goDashboard}>Dashboard</button>

      <div className="spacer" />

      <button className="logout" onClick={logout}>
        Logout
      </button>
    </div>
  );
}

export default Sidebar;

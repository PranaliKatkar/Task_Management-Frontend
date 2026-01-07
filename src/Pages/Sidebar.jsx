import React from "react";
import { useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();
  const username = localStorage.getItem("username");
  const role = localStorage.getItem("role");

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  const goDashboard = () => navigate("/dashboard");
  const goAdminUsers = () => navigate("/admin/users");

  return (
    <div className="sidebar">
      <h2 className="logo">TaskFlow</h2>
      <p className="profile">👤 {username ? username : "Guest"}</p>

      <button onClick={goDashboard}>Dashboard</button>

      {role === "ADMIN" && (
        <button onClick={goAdminUsers}>View Users</button>
      )}

      <div className="spacer" />

      <button className="logout" onClick={logout}>
        Logout
      </button>
    </div>
  );
}

export default Sidebar;

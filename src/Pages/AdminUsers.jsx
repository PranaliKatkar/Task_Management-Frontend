import React, { useEffect, useState } from "react";
import axios from "axios";
import API_BASE_URL from "../config/API";
import Sidebar from "./Sidebar";

function AdminUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/admin/users`)
      .then(res => setUsers(res.data))
      .catch(err => console.error(err));
  }, []);

  const deleteUser = (id) => {
    axios
      .delete(`${API_BASE_URL}/admin/users/${id}`)
      .then(() => setUsers(users.filter(u => u.id !== id)))
      .catch(err => console.error(err));
  };

  return (
    <div className="app-layout">
      <Sidebar />

      <div className="page">
        <div className="page-header">
          <h2>All Users</h2>
        </div>

        <table
          style={{
            width: "100%",
            background: "#fff",
            borderRadius: "12px",
            border: "1px solid #e5e7eb",
            borderCollapse: "collapse"
          }}
        >
          <thead>
            <tr style={{ background: "#f9fafb" }}>
              <th style={{ padding: "12px", textAlign: "left" }}>Username</th>
              <th style={{ padding: "12px", textAlign: "left" }}>Email</th>
              <th style={{ padding: "12px", textAlign: "left" }}>Action</th>
            </tr>
          </thead>

          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan="3" style={{ padding: "14px", textAlign: "center" }}>
                  No users found
                </td>
              </tr>
            ) : (
              users.map(user => (
                <tr key={user.id} style={{ borderTop: "1px solid #e5e7eb" }}>
                  <td style={{ padding: "12px" }}>{user.username}</td>
                  <td style={{ padding: "12px" }}>{user.email}</td>
                  <td style={{ padding: "12px" }}>
                    <button
                      className="delete-folder"
                      onClick={() => deleteUser(user.id)}
                    >
                      ❌ Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminUsers;

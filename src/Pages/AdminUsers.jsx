import React, { useEffect, useState } from "react";
import axios from "axios";
import API_BASE_URL from "../config/API";

function AdminUsers() {
  const [users, setUsers] = useState([]);

  // Fetch all users on mount
  useEffect(() => {
    axios.get(`${API_BASE_URL}/admin/users`)
      .then(res => setUsers(res.data))
      .catch(err => console.error(err));
  }, []);

  // Delete user
  const deleteUser = (id) => {
    axios.delete(`${API_BASE_URL}/admin/users/${id}`)
      .then(() => setUsers(users.filter(u => u.id !== id)))
      .catch(err => console.error(err));
  };

  return (
    <div>
      <h2>All Users</h2>
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u.id}>
              <td>{u.username}</td>
              <td>{u.email}</td>
              <td>
                <button onClick={() => deleteUser(u.id)}>❌</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminUsers;

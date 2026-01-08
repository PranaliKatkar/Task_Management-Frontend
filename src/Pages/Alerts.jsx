import React, { useEffect, useState } from "react";
import axios from "axios";
import API_BASE_URL from "../config/API";
import Sidebar from "./Sidebar";

function Alerts() {
  const [alerts, setAlerts] = useState([]);
  const userEmail = localStorage.getItem("userEmail");

  useEffect(() => {
    if (!userEmail) return;

    axios
      .get(`${API_BASE_URL}/alerts/user/${userEmail}`)
      .then(res => setAlerts(res.data))
      .catch(err => console.error("Failed to load alerts", err));
  }, [userEmail]);

  return (
    <div className="app-layout">
      <Sidebar />

      <div className="page">
        <h2>Alerts</h2>

        {alerts.length === 0 ? (
          <p>No alerts</p>
        ) : (
          alerts.map(alert => (
            <div
              key={alert.id}
              className={`alert-card ${alert.alertType.toLowerCase()}`}
            >
              {alert.message}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Alerts;

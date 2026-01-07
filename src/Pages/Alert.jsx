import React, { useEffect, useState } from "react";
import axios from "axios";
import API_BASE_URL from "../config/API";

function Alerts() {
  const [alerts, setAlerts] = useState([]);
  const userEmail = localStorage.getItem("userEmail");

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/alerts/user/${userEmail}`)
      .then(res => setAlerts(res.data));
  }, []);

  return (
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
  );
}

export default Alerts;

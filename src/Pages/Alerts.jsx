import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import API_BASE_URL from "../config/API";
import Sidebar from "./Sidebar";

function Alerts() {
  const [alerts, setAlerts] = useState([]);
  const userEmail = localStorage.getItem("userEmail");

  const fetchAlerts = useCallback(async () => {
    if (!userEmail) return;

    try {
      const res = await axios.get(
        `${API_BASE_URL}/alerts/user/${userEmail}`
      );
      setAlerts(res.data || []);
    } catch (err) {
      console.error("Failed to load alerts", err);
    }
  }, [userEmail]);

  useEffect(() => {
    fetchAlerts();
    const interval = setInterval(fetchAlerts, 60000);
    return () => clearInterval(interval);
  }, [fetchAlerts]);

  const handleDeleteAlert = async (alertId) => {
    try {
      await axios.delete(`${API_BASE_URL}/alerts/${alertId}`);
      setAlerts(prev => prev.filter(alert => alert.id !== alertId));
    } catch (err) {
      console.error("Failed to delete alert", err);
    }
  };

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
              className={`alert-card ${alert.alertType?.toLowerCase() || ""}`}
            >
              <span>{alert.message}</span>
              <button
                className="alert-close"
                onClick={() => handleDeleteAlert(alert.id)}
              >
                ✕
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Alerts;

import React, { useEffect, useState } from "react";
import FolderCard from "../Pages/FolderCard";
import Sidebar from "./Sidebar";
import axios from "axios";
import API_BASE_URL from "../config/API";
import { createFolder } from "../Services/FolderService";


function Dashboard() {
  const [folders, setFolders] = useState([]);
  const [folderName, setFolderName] = useState("");
  const [loading, setLoading] = useState(false);

  const userEmail = localStorage.getItem("userEmail");

  useEffect(() => {
    fetchFolders();
  }, []);

  const fetchFolders = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_BASE_URL}/folders/user/${userEmail}`);
      setFolders(res.data);
    } catch (error) {
      console.error("Failed to fetch folders:", error);
    } finally {
      setLoading(false);
    }
  };

  const addFolder = async () => {
  if (!folderName.trim()) return;

  try {
    await createFolder(folderName, userEmail);   // <- use service function
    setFolderName("");
    fetchFolders();
  } catch (error) {
    console.error("Failed to create folder:", error.response?.data || error.message);
  }
};

  const handleFolderDeleted = (deletedFolderId) => {
    setFolders((prevFolders) =>
      prevFolders.filter((folder) => folder.id !== deletedFolderId)
    );
  };

  return (
    <div className="app-layout">
      <Sidebar />
      <div className="page">
        <div className="page-header">
          <h2>Create Folder</h2>
          <div className="form-row">
            <input
              placeholder="Folder name"
              value={folderName}
              onChange={(e) => setFolderName(e.target.value)}
            />
            <button onClick={addFolder}>Create</button>
          </div>
        </div>

        <h3 className="section-title">Your Folders</h3>

        {loading ? (
          <p>Loading folders...</p>
        ) : (
          <div className="folder-grid">
            {folders.map((folder) => (
              <FolderCard
                key={folder.id}
                folder={folder}
                onFolderDeleted={handleFolderDeleted}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;

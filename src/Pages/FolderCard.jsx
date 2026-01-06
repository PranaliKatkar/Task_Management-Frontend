import React from "react";
import TaskList from "./TaskList";
import { deleteFolder } from "../Services/FolderService";

function FolderCard({ folder, onFolderDeleted }) {
  const handleDelete = async () => {
    if (!window.confirm(`Delete folder "${folder.name}"?`)) return;

    try {
      await deleteFolder(folder.id);
      onFolderDeleted(folder.id);
    } catch {
      alert("Failed to delete folder");
    }
  };

  return (
    <div className="folder-card">
      <div className="folder-header">
        <h3 className="folder-title">{folder.name}</h3>

        <button
          className="icon-btn danger"
          title="Delete folder"
          onClick={handleDelete}
        >
          ✕
        </button>
      </div>

      <TaskList folderId={folder.id} />
    </div>
  );
}

export default FolderCard;

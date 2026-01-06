import React, { useEffect, useState } from "react";
import {
  getTasksByFolder,
  addTask,
  deleteTask,
  completeTask,
} from "../Services/TaskService";

function TaskList({ folderId }) {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    fetchTasks();
  }, [folderId]);

  const fetchTasks = async () => {
    try {
      const data = await getTasksByFolder(folderId);
      setTasks(Array.isArray(data) ? data : []);
    } catch {
      setTasks([]);
    }
  };

  const handleAddTask = async () => {
    if (!title.trim()) return;
    await addTask(folderId, title);
    setTitle("");
    fetchTasks();
  };

  return (
    <div className="task-list">
      <div className="task-input">
        <input
          placeholder="Add new task..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button onClick={handleAddTask}>Add</button>
      </div>

      {tasks.length === 0 ? (
        <p className="empty">No tasks added</p>
      ) : (
        tasks.map((task) => (
          <div key={task.id} className="task-item">
            <span className={task.completed ? "completed" : ""}>
              {task.title}
            </span>

            <div className="task-actions">
              {!task.completed && (
                <button
                  className="icon-btn success"
                  onClick={() => completeTask(task.id).then(fetchTasks)}
                >
                  ✓
                </button>
              )}
              <button
                className="icon-btn danger"
                onClick={() => deleteTask(task.id).then(fetchTasks)}
              >
                ✕
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default TaskList;

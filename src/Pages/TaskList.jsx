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

  // Fetch tasks whenever folderId changes
  useEffect(() => {
    fetchTasks();
  }, [folderId]);

  const fetchTasks = async () => {
    try {
      const data = await getTasksByFolder(folderId);
      setTasks(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error fetching tasks:", err);
      setTasks([]);
    }
  };

  const handleAddTask = async () => {
    if (!title.trim()) return;
    try {
      const newTask = await addTask(folderId, title);

      // Update state directly so it shows immediately
      setTasks((prevTasks) => [...prevTasks, newTask]);
      setTitle("");
    } catch (err) {
      console.error("Error adding task:", err);
    }
  };

  const handleCompleteTask = async (taskId) => {
    try {
      const updatedTask = await completeTask(taskId);
      // Update task in state
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task.id === taskId ? updatedTask : task))
      );
    } catch (err) {
      console.error("Error completing task:", err);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await deleteTask(taskId);
      // Remove task from state
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    } catch (err) {
      console.error("Error deleting task:", err);
    }
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
                  onClick={() => handleCompleteTask(task.id)}
                >
                  ✓
                </button>
              )}
              <button
                className="icon-btn danger"
                onClick={() => handleDeleteTask(task.id)}
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

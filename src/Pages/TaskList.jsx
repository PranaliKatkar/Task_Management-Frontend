import React, { useEffect, useState } from "react";
import { getTasksByFolder, addTask, completeTask, deleteTask } from "../Services/TaskService";

function TaskList({ folderId }) {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    if (folderId) fetchTasks();
  }, [folderId]);

  const fetchTasks = async () => {
    try {
      const data = await getTasksByFolder(folderId);
      setTasks(data);
    } catch (err) {
      console.error("Failed to fetch tasks:", err);
    }
  };

  const handleAddTask = async () => {
    if (!title.trim()) return;
    try {
      await addTask(folderId, title);
      setTitle("");
      fetchTasks();
    } catch (err) {
      console.error("Failed to add task:", err);
    }
  };

  const handleCompleteTask = async (taskId) => {
    try {
      await completeTask(taskId);
      fetchTasks();
    } catch (err) {
      console.error("Failed to complete task:", err);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await deleteTask(taskId);
      fetchTasks();
    } catch (err) {
      console.error("Failed to delete task:", err);
    }
  };

  return (
    <div>
      <div className="task-input">
        <input
          type="text"
          placeholder="New task"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button onClick={handleAddTask}>Add</button>
      </div>

      {tasks.length === 0 ? (
        <p>No tasks yet</p>
      ) : (
        tasks.map((task) => (
          <div key={task.id} className="task-item">
            <span className={task.completed ? "completed" : ""}>{task.title}</span>
            <div className="task-actions">
              {!task.completed && (
                <button title="Mark complete" onClick={() => handleCompleteTask(task.id)}>✓</button>
              )}
              <button title="Delete task" onClick={() => handleDeleteTask(task.id)}>✕</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default TaskList;

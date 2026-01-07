import React, { useEffect, useState } from "react";
import {
  getTasksByFolder,
  addTask,
  completeTask,
  deleteTask
} from "../Services/TaskService";

function TaskList({ folderId }) {
  const [tasks, setTasks] = useState([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [dueDate, setDueDate] = useState("");

  const [sortBy, setSortBy] = useState("created");
  const [filterBy, setFilterBy] = useState("all");

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
      await addTask(folderId, { title, description, priority, dueDate });
      setTitle("");
      setDescription("");
      setPriority("Medium");
      setDueDate("");
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

  const filteredTasks = tasks.filter((task) => {
    const today = new Date().setHours(0, 0, 0, 0);
    const due = task.dueDate ? new Date(task.dueDate).setHours(0, 0, 0, 0) : null;

    if (filterBy === "completed") return task.completed;
    if (filterBy === "pending") return !task.completed;
    if (filterBy === "overdue")
      return !task.completed && due && due < today;

    return true; 
  });

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sortBy === "priority") {
      const order = { High: 1, Medium: 2, Low: 3 };
      return order[a.priority] - order[b.priority];
    }

    if (sortBy === "dueDate") {
      return new Date(a.dueDate || "9999-12-31") -
             new Date(b.dueDate || "9999-12-31");
    }

    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  return (
    <div>
      <div className="task-input">
        <input
          type="text"
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </select>

        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />

        <button onClick={handleAddTask}>Add</button>
      </div>

      <div className="task-controls">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="created">Sort: Created Date</option>
          <option value="priority">Sort: Priority</option>
          <option value="dueDate">Sort: Due Date</option>
        </select>

        <select value={filterBy} onChange={(e) => setFilterBy(e.target.value)}>
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
          <option value="overdue">Overdue</option>
        </select>
      </div>

      {sortedTasks.length === 0 ? (
        <p>No tasks found</p>
      ) : (
        sortedTasks.map((task) => (
          <div key={task.id} className="task-item">
            <div>
              <span
                className={task.completed ? "completed" : ""}
                data-priority={task.priority}
              >
                {task.title} ({task.priority})
                {task.dueDate &&
                  ` - ${new Date(task.dueDate).toLocaleDateString()}`}
              </span>

              {task.description && (
                <p className="task-desc">{task.description}</p>
              )}
            </div>

            <div className="task-actions">
              {!task.completed && (
                <button onClick={() => handleCompleteTask(task.id)}>✓</button>
              )}
              <button onClick={() => handleDeleteTask(task.id)}>✕</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default TaskList;

import axios from "axios";

const BASE_URL = "http://localhost:8080/api/tasks";

/* ✅ GET TASKS BY FOLDER */
export const getTasksByFolder = async (folderId) => {
  const res = await axios.get(`${BASE_URL}/folder/${folderId}`);
  return res.data;
};

/* ✅ ADD TASK */
export const addTask = async (folderId, title) => {
  const res = await axios.post(`${BASE_URL}/${folderId}`, { title });
  return res.data;
};

/* ✅ COMPLETE TASK */
export const completeTask = async (taskId) => {
  const res = await axios.put(`${BASE_URL}/complete/${taskId}`);
  return res.data;
};

/* ✅ DELETE TASK */
export const deleteTask = async (taskId) => {
  return axios.delete(`${BASE_URL}/${taskId}`);
};

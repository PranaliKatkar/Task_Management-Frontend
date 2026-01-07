import axios from "axios";
import API_BASE_URL from "../config/API";

const BASE_URL = `${API_BASE_URL}/tasks`;

export const getTasksByFolder = async (folderId) => {
  const res = await axios.get(`${BASE_URL}/folder/${folderId}`);
  return res.data;
};

export const addTask = async (folderId, taskData) => {
  const res = await axios.post(`${BASE_URL}/${folderId}`, taskData);
  return res.data;
};

export const completeTask = async (taskId) => {
  const res = await axios.put(`${BASE_URL}/complete/${taskId}`);
  return res.data;
};

export const deleteTask = async (taskId) => {
  return axios.delete(`${BASE_URL}/${taskId}`);
};

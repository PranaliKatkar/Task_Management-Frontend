import axios from "axios";
import API_BASE_URL from "../config/API";

const BASE_URL = `${API_BASE_URL}/folders`;

export const getFolders = async () => {
  const res = await axios.get(BASE_URL);
  return res.data;
};

export const createFolder = async (folderName) => {
  const res = await axios.post(BASE_URL, { name: folderName });
  return res.data;
};

export const deleteFolder = async (folderId) => {
  return axios.delete(`${BASE_URL}/${folderId}`);
};

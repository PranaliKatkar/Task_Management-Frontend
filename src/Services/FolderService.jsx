import axios from "axios";

const BASE_URL = "http://localhost:8080/api/folders";

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

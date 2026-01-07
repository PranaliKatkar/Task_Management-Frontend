import axios from "axios";
import API_BASE_URL from "../config/API";

const BASE_URL = `${API_BASE_URL}/folders`;

export const getFolders = async (userEmail) => {
  const res = await axios.get(`${BASE_URL}/user/${userEmail}`);
  return res.data;
};

export const createFolder = async (folderName, userEmail) => {
  const res = await axios.post(BASE_URL, {
    name: folderName,
    user: { email: userEmail }  
  });
  return res.data;
};



export const deleteFolder = async (folderId) => {
  return axios.delete(`${BASE_URL}/${folderId}`);
};

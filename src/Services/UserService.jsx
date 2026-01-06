import axios from "axios";
import API_BASE_URL from "../config/API";

const BASE_URL = `${API_BASE_URL}/auth`;

export const registerUser = (data) => {
  return axios.post(`${BASE_URL}/register`, data);
};

export const loginUser = (data) => {
  return axios.post(`${BASE_URL}/login`, data);
};

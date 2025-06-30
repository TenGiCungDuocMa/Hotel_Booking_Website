import axios from "axios";

const API_BASE_URL = "http://localhost:8888/api/auth";

export const register = async (data) => {
    return axios.post(`${API_BASE_URL}/register`, data);
};
export const login = async (data) => {
    const response = await axios.post(`${API_BASE_URL}/login`, data);
    return response.data.token; // Trả về token
};
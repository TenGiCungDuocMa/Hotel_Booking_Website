import axios from "axios";

const baseURL = "http://127.0.0.1:8888/api";

const api = {
    get: async (url, params = {}) => {
        try {
            const response = await axios.get(`${baseURL}${url}`, { params });
            return response.data;
        } catch (error) {
            console.error("GET Error:", error);
            return null;
        }
    },
    post: async (url, data = {}) => {
        try {
            const response = await axios.post(`${baseURL}${url}`, data);
            return response.data;
        } catch (error) {
            console.error("POST Error:", error);
            return null;
        }
    },
    put: async (url, data = {}) => {
        try {
            const response = await axios.put(`${baseURL}${url}`, data);
            return response.data;
        } catch (error) {
            console.error("PUT Error:", error);
            return null;
        }
    },
    delete: async (url, params = {}) => {
        try {
            const response = await axios.delete(`${baseURL}${url}`, { params });
            return response.data;
        } catch (error) {
            console.error("DELETE Error:", error);
            return null;
        }
    },
};

export default api;
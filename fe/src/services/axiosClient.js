import axios from "axios";

// Tạo instance của axios
const axiosClient = axios.create({
    baseURL: "http://localhost:8888", // đổi theo backend của bạn
});

// Gắn token vào mọi request nếu có
axiosClient.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default axiosClient;

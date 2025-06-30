import axiosClient from "./axiosClient";

// Lấy thông tin người dùng
export const getProfile = async () => {
    const res = await axiosClient.get("/api/profile");
    return res.data;
};

// Cập nhật thông tin người dùng
export const updateProfile = async (data) => {
    const res = await axiosClient.put("/api/profile", data);
    return res.data;
};

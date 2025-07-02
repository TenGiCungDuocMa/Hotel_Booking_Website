import axiosClient from "./axiosClient";
import axios from "axios";

const API_BASE_URL = "http://localhost:8888";

// Gửi review mới
export const submitReview = async (data) => {
    return axiosClient.post("/api/reviews", data);
};

// Lấy toàn bộ review (user hoặc admin)
export const getAllReviews = async () => {
    return axiosClient.get("/api/reviews");
};
export const checkBookingValid = (bookingId) =>
    axios.get(`${API_BASE_URL}/api/bookings/validate/${bookingId}`);

// ✅ Lấy danh sách review bị đánh dấu spam
export const getSpamReviews = async () => {
    const res = await axiosClient.get("/api/admin/reviews", {
        params: { spam: true }
    });
    return res.data;
};



// ✅ Phê duyệt review (bỏ spam)
export const approveSpamReview = async (id) => {
    return axiosClient.put(`/api/admin/reviews/${id}`);
};

export const deleteReview = async (id) => {
    return axiosClient.delete(`/api/admin/reviews/${id}`);
};

import axiosClient from "./axiosClient";

export const submitReview = async (data) => {
    return axiosClient.post("/api/reviews", data); // token đã tự gắn trong axiosClient
};
export const getAllReviews = async () => {
    return axiosClient.get("/api/reviews");
};
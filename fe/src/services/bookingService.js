import axiosClient from "./axiosClient";

export const getBookings = async () => {
    const res = await axiosClient.get("/api/bookings");
    return res.data;
};

export const updateBooking = async (bookingId, data) => {
    const res = await axiosClient.put(`/api/bookings/${bookingId}`, data);
    return res.data;
};

export const cancelBooking = async (bookingId) => {
    const res = await axiosClient.delete(`/api/bookings/${bookingId}`);
    return res.data;
};

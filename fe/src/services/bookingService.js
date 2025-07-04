import axiosClient from "./axiosClient";

export const getBookings = async () => {
    const res = await axiosClient.get("/api/bookings");
    return res.data;
};

export const getAllBookings = async () => {
    const res = await axiosClient.get("/api/admin/bookings");
    return res.data;
};

export const updateBooking = async (bookingId, data) => {
    const res = await axiosClient.put(`/api/bookings/${bookingId}`, data);
    return res.data;
};

export const updateBookingAdmin = async (bookingId, status) => {
    const res = await axiosClient.put(`/api/admin/bookings/${bookingId}`, { status });
    return res.data;
};

export const cancelBooking = async (bookingId) => {
    const res = await axiosClient.delete(`/api/bookings/${bookingId}`);
    return res.data;
};

export const getUserById = async (userId) => {
    const res = await axiosClient.get(`/api/users/${userId}`);
    return res.data;
};

export const getHotelById = async (hotelId) => {
    const res = await axiosClient.get(`/api/bookings/hotels/${hotelId}`);
    return res.data;
};

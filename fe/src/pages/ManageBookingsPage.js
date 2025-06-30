import React, { useEffect, useState } from "react";
import { getBookings, updateBooking, cancelBooking } from "../services/bookingService";
import BookingItem from "../components/BookingItem";

const ManageBookingsPage = () => {
    const [bookings, setBookings] = useState([]);
    const [message, setMessage] = useState("");

    const fetchBookings = async () => {
        try {
            const data = await getBookings();
            setBookings(data);
        } catch (error) {
            console.error("Lỗi khi lấy danh sách booking:", error);
        }
    };

    useEffect(() => {
        fetchBookings();
    }, []);

    const handleUpdate = async (bookingId, updateData) => {
        try {
            const updated = await updateBooking(bookingId, updateData);
            setBookings((prev) =>
                prev.map((b) => (b.bookingId === bookingId ? updated : b))
            );
            setMessage("✅ Cập nhật thành công");
        } catch (error) {
            setMessage("❌ Cập nhật thất bại");
        }
        setTimeout(() => setMessage(""), 3000);
    };

    const handleCancel = async (bookingId) => {
        if (!window.confirm("Bạn có chắc muốn huỷ đặt phòng này không?")) return;
        try {
            await cancelBooking(bookingId);
            setBookings((prev) =>
                prev.map((b) =>
                    b.bookingId === bookingId ? { ...b, status: "Canceled" } : b
                )
            );
            setMessage("✅ Đã huỷ thành công");
        } catch (error) {
            setMessage("❌ Huỷ thất bại");
        }
        setTimeout(() => setMessage(""), 3000);
    };

    return (
        <div className="container py-5">
            <h3 className="mb-4 text-center">Quản lý đặt phòng</h3>

            {message && (
                <div
                    className={`alert ${
                        message.includes("✅") ? "alert-success" : "alert-danger"
                    }`}
                >
                    {message}
                </div>
            )}

            <div className="table-responsive">
                <table className="table table-bordered text-center align-middle">
                    <thead className="table-light">
                    <tr>
                        <th>Khách sạn</th>
                        <th>Địa chỉ</th>
                        <th>Phòng</th>
                        <th>Nhận phòng</th>
                        <th>Trả phòng</th>
                        <th>Trạng thái</th>
                        <th>Hành động</th>
                    </tr>
                    </thead>
                    <tbody>
                    {bookings.length > 0 ? (
                        bookings.map((booking) => (
                            <BookingItem
                                key={booking.bookingId}
                                booking={booking}
                                onUpdate={handleUpdate}
                                onCancel={handleCancel}
                            />
                        ))
                    ) : (
                        <tr>
                            <td colSpan="7" className="text-muted">
                                Không có đặt phòng nào.
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageBookingsPage;

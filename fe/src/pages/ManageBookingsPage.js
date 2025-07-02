import React, { useEffect, useState } from "react";
import { getBookings, cancelBooking } from "../services/bookingService";
import BookingItem from "../components/BookingItem";
import {toast} from "react-toastify";
const ManageBookingsPage = () => {
    const [bookings, setBookings] = useState([]);
    const [message, setMessage] = useState("");

    const fetchBookings = async () => {
        try {
            const data = await getBookings();
            setBookings(data);
        } catch (error) {
            console.error("Error fetching bookings:", error);
        }
    };

    useEffect(() => {
        fetchBookings();
    }, []);

    const handleCancel = async (bookingId) => {
        if (!window.confirm("Are you sure you want to cancel this booking?")) return;
        try {
            await cancelBooking(bookingId);
            setBookings((prev) =>
                prev.map((b) =>
                    b.bookingId === bookingId ? { ...b, status: "Canceled" } : b
                )
            );
            toast("✅ Successfully canceled");
        } catch (error) {
            toast("❌ Cancel failed");
        }
        setTimeout(() => setMessage(""), 3000);
    };

    return (
        <div className="container py-5">
            <h3 className="mb-4 text-center">Booking Management</h3>

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
                        <th>Order ID</th>
                        <th>Hotel</th>
                        <th>Address</th>
                        <th>Room</th>
                        <th>Check-in</th>
                        <th>Check-out</th>
                        <th>Status</th>
                        <th>Request</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {bookings.length > 0 ? (
                        bookings.map((booking) => (
                            <BookingItem
                                key={booking.bookingId}
                                booking={booking}
                                onCancel={handleCancel}
                            />
                        ))
                    ) : (
                        <tr>
                            <td colSpan="9" className="text-muted">
                                No bookings available.
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

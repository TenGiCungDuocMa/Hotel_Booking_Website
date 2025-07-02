import React, { useEffect, useState } from "react";
import { getBookings, cancelBooking } from "../services/bookingService";
import BookingItem from "../components/BookingItem";
import { toast } from "react-toastify";

const ManageBookingsPage = () => {
    const [bookings, setBookings] = useState([]);

    const fetchBookings = async () => {
        try {
            const data = await getBookings();
            setBookings(data);
        } catch (error) {
            console.error("Error fetching bookings:", error);
            toast.error("❌ Failed to load bookings");
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
            toast.success("✅ Successfully canceled");
        } catch (error) {
            toast.error("❌ Cancel failed");
        }
    };

    return (
        <div className="container py-5">
            <h2
                style={{
                    textAlign: "center",
                    fontSize: "2.2rem",
                    fontWeight: "700",
                    color: "#1f3c88",
                    marginBottom: "1.5rem",
                    textShadow: "0 1px 2px rgba(0, 0, 0, 0.1)",
                    letterSpacing: "0.5px",
                    position: "relative",
                    paddingBottom: "0.5rem"
                }}
            >
                <i className="bi bi-calendar-check-fill me-2"></i>
                Manage Your Hotel Bookings
                <span
                    style={{
                        content: "''",
                        width: "80px",
                        height: "4px",
                        backgroundColor: "#fca311",
                        display: "block",
                        margin: "0.5rem auto 0",
                        borderRadius: "10px"
                    }}
                ></span>
            </h2>


            <div className="table-responsive shadow rounded-3 border">
                <table className="table table-hover table-bordered text-center align-middle mb-0">
                    <thead className="table-primary">
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
                            <td colSpan="9" className="text-muted py-4">
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

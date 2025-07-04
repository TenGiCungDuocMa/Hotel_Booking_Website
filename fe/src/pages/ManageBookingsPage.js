import React, { useEffect, useState } from "react";
import { getBookings, updateBooking, getUserById } from "../services/bookingService";
import { toast } from "react-toastify";
import Header from "../components/Header";
import Footer from "../components/Footer";

const ManageBookingsPage = () => {
    const banners = [
        "/bg_1.jpg", "/bg_2.jpg", "/bg_4.jpg"
    ];
    const titles1 = [
        "More than a hotel... an experience",
        "Where luxury meets comfort",
        "Unwind in style and elegance"
    ];
    const titles2 = [
        "Discover the perfect blend of luxury and comfort",
        "Experience the ultimate in hospitality",
        "Your dream vacation starts here"
    ];
    const [currentIndex, setCurrentIndex] = useState(0);
    const [bookings, setBookings] = useState([]);
    const [userInfoMap, setUserInfoMap] = useState({});
    const [showMoreHotel, setShowMoreHotel] = useState({});
    const [showMoreRequest, setShowMoreRequest] = useState({});
    const maxLen = 30;

    const statusOptions = [
        "Pending",
        "Booked",
        "CheckIn",
        "CheckOut",
        "Complete",
        "Canceled"
    ];

    const fetchBookings = async () => {
        try {
            const data = await getBookings();
            setBookings(data);
        } catch (error) {
            toast.error("❌ Failed to load bookings");
        }
    };

    useEffect(() => {
        fetchBookings();
    }, []);

    useEffect(() => {
        // Fetch user info cho các booking thiếu guestName/phoneNumber
        const fetchMissingUserInfo = async () => {
            const missingUserIds = bookings
                .filter(b => (!b.guestName || !b.phoneNumber) && b.userId && !userInfoMap[b.userId])
                .map(b => b.userId);
            const uniqueUserIds = [...new Set(missingUserIds)];
            if (uniqueUserIds.length === 0) return;
            const userInfoResults = await Promise.all(uniqueUserIds.map(id => getUserById(id)));
            const newMap = { ...userInfoMap };
            uniqueUserIds.forEach((id, idx) => {
                newMap[id] = userInfoResults[idx];
            });
            setUserInfoMap(newMap);
        };
        if (bookings.length > 0) fetchMissingUserInfo();
        // eslint-disable-next-line
    }, [bookings]);

    const handleStatusChange = async (bookingId, data) => {
        try {
            await updateBooking(bookingId, data);
            setBookings(prev =>
                prev.map(b =>
                    b.bookingId === bookingId ? { ...b, status: data } : b
                )
            );
            toast.success("✅ Status updated successfully");
        } catch (error) {
            toast.error("❌ Failed to update status");
        }
    };

    // Show more/less logic cho từng booking
    const renderShowMore = (text, showFull, setShowFull, key) => {
        if (!text) return <span className="text-muted">—</span>;
        if (text.length <= maxLen) return <span>{text}</span>;
        return (
            <span>
                {showFull[key] ? text : text.slice(0, maxLen) + "..."}
                <button
                    className="btn btn-link btn-sm p-0 ms-1"
                    style={{ fontSize: "0.85em" }}
                    onClick={() => setShowFull(prev => ({ ...prev, [key]: !prev[key] }))}
                >
                    {showFull[key] ? "Ẩn bớt" : "Xem thêm"}
                </button>
            </span>
        );
    };

    // Sắp xếp bookings theo bookingId giảm dần (mới nhất lên đầu)
    const sortedBookings = [...bookings].sort((a, b) => b.bookingId - a.bookingId);

    return (
        <div className="container py-5">
            <h2 className="text-center display-5 fw-bold text-primary mb-4">
                <i className="bi bi-calendar-check-fill me-2"></i>
                Manage Your Hotel Bookings
                <div className="mx-auto mt-2" style={{
                    width: "80px",
                    height: "4px",
                    backgroundColor: "#fca311",
                    borderRadius: "10px"
                }}></div>
            </h2>

            <div className="table-responsive shadow rounded-3 border">
                <table className="table table-hover table-bordered align-middle mb-0">
                    <thead className="table-primary">
                    <tr>
                        <th>Order ID</th>
                        <th>Guest Name</th>
                        <th>Phone</th>
                        <th style={{ width: 189 }}>Hotel</th>
                        <th>Room</th>
                        <th>Check-in</th>
                        <th>Check-out</th>
                        <th>Status</th>
                        <th style={{ width: 150 }}>Special Request</th>
                    </tr>
                    </thead>
                    <tbody>
                    {sortedBookings.length > 0 ? (
                        sortedBookings.map((booking) => (
                            <tr key={booking.bookingId} style={{ height: 65 }}>
                                <td>{booking.bookingId}</td>
                                <td style={{ backgroundColor: "#f8f9fa" }}>{booking.userFullName || <span className="text-muted">—</span>}</td>
                                <td style={{ backgroundColor: "#f8f9fa" }}>{booking.userPhone || <span className="text-muted">—</span>}</td>
                                <td style={{ width: 189, maxWidth: 189, wordBreak: 'break-word' }}>
                                    <div className="fw-bold">{booking.hotelName}</div>
                                    <small className="text-muted">
                                        {renderShowMore(booking.hotelAddress, showMoreHotel, setShowMoreHotel, booking.bookingId)}
                                    </small>
                                </td>
                                <td>{booking.roomNumber}</td>
                                <td>{booking.checkInDate}</td>
                                <td>{booking.checkOutDate}</td>
                                <td>
                                    {/* <select
                                        className="form-select form-select-sm"
                                        value={booking.status}
                                        onChange={(e) => handleStatusChange(booking.bookingId, e.target.value)}
                                    >
                                        {statusOptions.map(option => (
                                            <option key={option} value={option}>
                                                {option}
                                            </option>
                                        ))}
                                    </select> */}
                                    {booking.status}
                                </td>
                                <td style={{ width: 150, maxWidth: 150, wordBreak: 'break-word' }}>
                                    {renderShowMore(booking.request, showMoreRequest, setShowMoreRequest, booking.bookingId)}
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="9" className="text-muted py-4 text-center">
                                No bookings found
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
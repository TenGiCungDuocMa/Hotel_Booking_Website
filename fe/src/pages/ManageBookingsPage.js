import React, { useEffect, useState } from "react";
import {
    getBookings,
    getAllBookings,
    updateBookingAdmin,
    getUserById,
} from "../services/bookingService";
import { toast } from "react-toastify";
import { getCurrentUser } from "../utils/auth";

const ManageBookingsPage = () => {
    const [bookings, setBookings] = useState([]);
    const [userInfoMap, setUserInfoMap] = useState({});
    const [showMoreHotel, setShowMoreHotel] = useState({});
    const [showMoreRequest, setShowMoreRequest] = useState({});
    const [role, setRole] = useState(null);
    const maxLen = 30;

    useEffect(() => {
        const fetchRole = async () => {
            const user = getCurrentUser();
            if (user && user.userId) {
                try {
                    const userInfo = await getUserById(user.userId);
                    setRole(userInfo.role);
                } catch (e) {
                    setRole(null);
                }
            } else {
                setRole(null);
            }
        };
        fetchRole();
    }, []);

    const statusOptions = [
        "Pending",
        "Booked",
        "CheckedIn",
        "CheckedOut",
        "Completed",
        "Canceled",
    ];

    const fetchBookings = async () => {
        try {
            let data;
            if (role === "admin") {
                data = await getAllBookings();
                setBookings(data);

                const userIds = [
                    ...new Set(data.map((b) => b.userId).filter(Boolean)),
                ];
                const userInfoResults = await Promise.all(
                    userIds.map((id) => getUserById(id))
                );
                const newMap = {};
                userIds.forEach((id, idx) => {
                    newMap[id] = userInfoResults[idx];
                });
                setUserInfoMap(newMap);
            } else if (role === "user") {
                data = await getBookings();
                setBookings(data);
            }
        } catch (error) {
            toast.error("❌ Failed to load bookings");
        }
    };

    useEffect(() => {
        if (role) fetchBookings();
    }, [role]);

    useEffect(() => {
        if (role !== "user") return;
        const fetchMissingUserInfo = async () => {
            const missingUserIds = bookings
                .filter(
                    (b) =>
                        (!b.guestName || !b.phoneNumber) &&
                        b.userId &&
                        !userInfoMap[b.userId]
                )
                .map((b) => b.userId);
            const uniqueUserIds = [...new Set(missingUserIds)];
            if (uniqueUserIds.length === 0) return;
            const userInfoResults = await Promise.all(
                uniqueUserIds.map((id) => getUserById(id))
            );
            const newMap = { ...userInfoMap };
            uniqueUserIds.forEach((id, idx) => {
                newMap[id] = userInfoResults[idx];
            });
            setUserInfoMap(newMap);
        };
        if (bookings.length > 0) fetchMissingUserInfo();
    }, [bookings, role]);

    const handleStatusChange = async (bookingId, status) => {
        try {
            await updateBookingAdmin(bookingId, status);
            setBookings((prev) =>
                prev.map((b) => (b.bookingId === bookingId ? { ...b, status } : b))
            );
            toast.success("✅ Status updated successfully");
        } catch (error) {
            toast.error("❌ Failed to update status");
        }
    };

    const renderShowMore = (text, showFull, setShowFull, key) => {
        if (!text) return <span className="text-muted">—</span>;
        if (text.length <= maxLen) return <span>{text}</span>;
        return (
            <span>
        {showFull[key] ? text : text.slice(0, maxLen) + "..."}
                <button
                    className="btn btn-link btn-sm p-0 ms-1"
                    style={{ fontSize: "0.85em" }}
                    onClick={() =>
                        setShowFull((prev) => ({ ...prev, [key]: !prev[key] }))
                    }
                >
          {showFull[key] ? "Ẩn bớt" : "Xem thêm"}
        </button>
      </span>
        );
    };

    const sortedBookings = [...bookings].sort(
        (a, b) => a.bookingId - b.bookingId
    );

    const getValidNextStatuses = (current) => {
        switch (current) {
            case "Pending":
                return ["Booked", "Canceled"];
            case "Booked":
                return ["CheckedIn", "Canceled"];
            case "CheckedIn":
                return ["CheckedOut"];
            case "CheckedOut":
                return ["Completed"];
            default:
                return [];
        }
    };

    if (!role) return <div className="text-center py-5">Loading...</div>;

    return (
        <div className="container py-5">
            <h2 className="text-center display-5 fw-bold text-primary mb-4">
                <i className="bi bi-calendar-check-fill me-2"></i>
                Manage Your Hotel Bookings
                <div
                    className="mx-auto mt-2"
                    style={{
                        width: "80px",
                        height: "4px",
                        backgroundColor: "#fca311",
                        borderRadius: "10px",
                    }}
                ></div>
            </h2>

            <div className="table-responsive shadow rounded-3 border">
                <table className="table table-hover table-bordered align-middle mb-0">
                    <thead className="table-primary">
                    <tr>
                        <th>Order ID</th>
                        <th style={{ width: 250 }}>Information</th>
                        <th>Room</th>
                        <th style={{ width: 150 }}>Check-in</th>
                        <th style={{ width: 150 }}>Check-out</th>
                        <th style={{ width: 170 }}>Status</th>
                        <th style={{ width: 150 }}>Special Request</th>
                        {role === "admin" && (
                            <th style={{ width: 80 }}>Cancellation Risk (%)</th>
                        )}
                    </tr>
                    </thead>
                    <tbody>
                    {sortedBookings.length > 0 ? (
                        sortedBookings.map((booking) => {
                            const user = userInfoMap[booking.userId] || {};
                            const info = [user.email || booking.email].filter(Boolean).join(", ");

                            return (
                                <tr key={booking.bookingId} style={{ height: 65 }}>
                                    <td>{booking.madonhang}</td>
                                    <td
                                        style={{
                                            backgroundColor: "#f8f9fa",
                                            width: 250,
                                            maxWidth: 250,
                                            wordBreak: "break-word",
                                        }}
                                    >
                                        {renderShowMore(
                                            info,
                                            showMoreHotel,
                                            setShowMoreHotel,
                                            booking.bookingId + "_info"
                                        )}
                                    </td>
                                    <td>{booking.roomNumber}</td>
                                    <td>{booking.checkInDate}</td>
                                    <td>{booking.checkOutDate}</td>
                                    <td>
                                        {role === "admin" ? (
                                            <select
                                                className="form-select form-select-sm"
                                                value={booking.status}
                                                onChange={(e) =>
                                                    handleStatusChange(booking.bookingId, e.target.value)
                                                }
                                                disabled={getValidNextStatuses(booking.status).length === 0}
                                            >
                                                <option value={booking.status}>{booking.status}</option>
                                                {getValidNextStatuses(booking.status).map((option) => (
                                                    <option key={option} value={option}>
                                                        {option}
                                                    </option>
                                                ))}
                                            </select>
                                        ) : (
                                            booking.status
                                        )}
                                    </td>
                                    <td
                                        style={{
                                            width: 150,
                                            maxWidth: 150,
                                            wordBreak: "break-word",
                                        }}
                                    >
                                        {renderShowMore(
                                            booking.request,
                                            showMoreRequest,
                                            setShowMoreRequest,
                                            booking.bookingId
                                        )}
                                    </td>
                                    {role === "admin" && (
                                        <td>
                                            {booking.probability_of_cancellation !== undefined &&
                                            booking.probability_of_cancellation !== null ? (
                                                <span
                                                    className={`fw-bold ${
                                                        booking.probability_of_cancellation > 0.7
                                                            ? "text-danger"
                                                            : booking.probability_of_cancellation > 0.4
                                                                ? "text-warning"
                                                                : "text-success"
                                                    }`}
                                                >
                            {(booking.probability_of_cancellation * 100).toFixed(1)}%
                          </span>
                                            ) : (
                                                <span className="text-muted">—</span>
                                            )}
                                        </td>
                                    )}
                                </tr>
                            );
                        })
                    ) : (
                        <tr>
                            <td colSpan={role === "admin" ? 8 : 7} className="text-muted py-4 text-center">
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

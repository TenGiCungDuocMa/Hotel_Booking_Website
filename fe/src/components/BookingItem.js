import React, { useState } from "react";

const BookingItem = ({ booking, onCancel }) => {
    const gray = "#f5f5f5";
    const white = "#ffffff";

    // Hàm render badge màu theo trạng thái
    const getBadgeClass = (status) => {
        switch (status) {
            case "Pending":
                return "warning text-dark";
            case "Booked":
                return "success";
            case "CheckedIn":
                return "info";
            case "CheckedOut":
                return "primary";
            case "Completed":
                return "secondary";
            case "Canceled":
                return "danger";
            default:
                return "dark";
        }
    };

    // Show more/less logic cho các trường dài
    const [showFullAddress, setShowFullAddress] = useState(false);
    const [showFullRequest, setShowFullRequest] = useState(false);
    const maxLen = 20;
    const renderShowMore = (text, showFull, setShowFull) => {
        if (!text) return <span className="text-muted">—</span>;
        if (text.length <= maxLen) return <span>{text}</span>;
        return (
            <span>
                {showFull ? text : text.slice(0, maxLen) + "..."}
                <button
                    className="btn btn-link btn-sm p-0 ms-1"
                    style={{ fontSize: "0.85em" }}
                    onClick={() => setShowFull((prev) => !prev)}
                >
                    {showFull ? "Ẩn bớt" : "Xem thêm"}
                </button>
            </span>
        );
    };

    return (
        <tr>
            <td style={{ backgroundColor: gray }}>{booking.madonhang}</td>
            <td style={{ backgroundColor: white }}>{booking.hotelName}</td>
            <td style={{ backgroundColor: gray }}>
                {renderShowMore(booking.hotelAddress, showFullAddress, setShowFullAddress)}
            </td>
            <td style={{ backgroundColor: white }}>{booking.roomNumber}</td>
            <td style={{ backgroundColor: gray }}>
                {new Date(booking.checkInDate).toLocaleDateString()}
            </td>
            <td style={{ backgroundColor: white }}>
                {new Date(booking.checkOutDate).toLocaleDateString()}
            </td>
            <td style={{ backgroundColor: gray }}>
                <span className={`badge bg-${getBadgeClass(booking.status)}`}>
                    {booking.status}
                </span>
            </td>
            <td style={{ backgroundColor: white }}>
                {renderShowMore(booking.request, showFullRequest, setShowFullRequest)}
            </td>
            <td style={{ backgroundColor: gray }}>{booking.userFullName || <span className="text-muted">—</span>}</td>
            <td style={{ backgroundColor: white }}>{booking.userPhone || <span className="text-muted">—</span>}</td>
            <td style={{ backgroundColor: gray }}>
                {booking.createdAt ? new Date(booking.createdAt).toLocaleString() : <span className="text-muted">—</span>}
            </td>
            <td style={{ backgroundColor: gray }}>
                {(booking.status === "Pending" || booking.status === "Booked") && (
                    <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => onCancel(booking.bookingId)}
                    >
                        Cancel
                    </button>
                )}
            </td>
        </tr>
    );
};

export default BookingItem;

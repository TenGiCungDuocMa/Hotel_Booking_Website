import React from "react";

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

    return (
        <tr>
            <td style={{ backgroundColor: gray }}>{booking.madonhang}</td>
            <td style={{ backgroundColor: white }}>{booking.hotelName}</td>
            <td style={{ backgroundColor: gray }}>{booking.hotelAddress}</td>
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
                {booking.request ? (
                    <span className="text-muted" style={{ fontSize: "0.9em" }}>
                        {booking.request}
                    </span>
                ) : (
                    <span className="text-muted">—</span>
                )}
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

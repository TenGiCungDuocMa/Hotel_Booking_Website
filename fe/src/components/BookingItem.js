import React from "react";

const BookingItem = ({ booking, onCancel }) => {
    return (
        <tr>
            <td>{booking.madonhang}</td>
            <td>{booking.hotelName}</td>
            <td>{booking.hotelAddress}</td>
            <td>{booking.roomNumber}</td>
            <td>{new Date(booking.checkInDate).toLocaleDateString()}</td>
            <td>{new Date(booking.checkOutDate).toLocaleDateString()}</td>
            <td>
                <span
                    className={`badge bg-${
                        booking.status === "Canceled"
                            ? "danger"
                            : booking.status === "Booked"
                                ? "success"
                                : "secondary"
                    }`}
                >
                    {booking.status}
                </span>
            </td>
            <td>
                {booking.request ? (
                    <span className="text-muted" style={{ fontSize: "0.9em" }}>
                        {booking.request}
                    </span>
                ) : (
                    <span className="text-muted">—</span>
                )}
            </td>
            <td>
                {booking.status !== "Canceled" && (
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

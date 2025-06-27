import React, { useState } from "react";

const BookingItem = ({ booking, onUpdate, onCancel }) => {
    const [editMode, setEditMode] = useState(false);
    const [form, setForm] = useState({
        checkInDate: booking.checkInDate,
        checkOutDate: booking.checkOutDate,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        onUpdate(booking.bookingId, form);
        setEditMode(false);
    };

    return (
        <tr>
            <td>{booking.hotelName}</td>
            <td>{booking.hotelAddress}</td>
            <td>{booking.roomId}</td>
            <td>
                {editMode ? (
                    <input
                        type="date"
                        name="checkInDate"
                        value={form.checkInDate}
                        onChange={handleChange}
                        className="form-control"
                    />
                ) : (
                    booking.checkInDate
                )}
            </td>
            <td>
                {editMode ? (
                    <input
                        type="date"
                        name="checkOutDate"
                        value={form.checkOutDate}
                        onChange={handleChange}
                        className="form-control"
                    />
                ) : (
                    booking.checkOutDate
                )}
            </td>
            <td>
        <span className={`badge bg-${booking.status === "Canceled" ? "danger" : "success"}`}>
          {booking.status}
        </span>
            </td>
            <td>
                {editMode ? (
                    <>
                        <button className="btn btn-sm btn-success me-2" onClick={handleSave}>
                            Lưu
                        </button>
                        <button className="btn btn-sm btn-secondary" onClick={() => setEditMode(false)}>
                            Hủy
                        </button>
                    </>
                ) : (
                    <>
                        <button className="btn btn-sm btn-warning text-white me-2" onClick={() => setEditMode(true)}>
                            Chỉnh sửa
                        </button>
                        {booking.status !== "Canceled" && (
                            <button className="btn btn-sm btn-outline-danger" onClick={() => onCancel(booking.bookingId)}>
                                Huỷ
                            </button>
                        )}
                    </>
                )}
            </td>
        </tr>
    );
};

export default BookingItem;

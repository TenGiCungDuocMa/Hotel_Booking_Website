import React, { useState } from "react";
import { submitReview } from "../../services/reviewService";

const ReviewForm = ({ onSubmitted }) => {
    const [bookingId, setBookingId] = useState("");
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await submitReview({ bookingId: parseInt(bookingId), rating, comment });
            setMessage("✅ Gửi đánh giá thành công!");
            setBookingId("");
            setRating(5);
            setComment("");
            onSubmitted && onSubmitted(); // gọi lại để reload nếu cần
        } catch (err) {
            const msg = err.response?.data || "❌ Lỗi khi gửi đánh giá.";
            setMessage(`❌ ${msg}`);
        }
    };

    return (
        <div className="border rounded p-4 shadow bg-light">
            <h5 className="mb-3">Viết đánh giá</h5>

            {message && (
                <div
                    className={`alert ${
                        message.startsWith("✅") ? "alert-success" : "alert-danger"
                    } py-2`}
                    role="alert"
                >
                    {message}
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Booking ID</label>
                    <input
                        type="number"
                        className="form-control"
                        required
                        value={bookingId}
                        onChange={(e) => setBookingId(e.target.value)}
                        placeholder="Nhập Booking ID..."
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Số sao</label>
                    <select
                        className="form-select"
                        value={rating}
                        onChange={(e) => setRating(parseInt(e.target.value))}
                    >
                        {[5, 4, 3, 2, 1].map((r) => (
                            <option key={r} value={r}>
                                {r} ⭐
                            </option>
                        ))}
                    </select>
                </div>

                <div className="mb-3">
                    <label className="form-label">Nhận xét</label>
                    <textarea
                        className="form-control"
                        rows={4}
                        required
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Nhập nhận xét của bạn..."
                    />
                </div>

                <button type="submit" className="btn btn-primary">
                    Gửi đánh giá
                </button>
            </form>
        </div>
    );
};

export default ReviewForm;

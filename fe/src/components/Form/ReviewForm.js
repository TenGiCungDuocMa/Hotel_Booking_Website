import React, {useState} from "react";
import {submitReview, checkBookingValid} from "../../services/reviewService";

const ReviewForm = ({onSubmitted}) => {
    const [bookingId, setBookingId] = useState("");
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState("");
    const [message, setMessage] = useState("");
    const [isVerified, setIsVerified] = useState(false);
    const [checking, setChecking] = useState(false);

    const handleBookingCheck = async (e) => {
        e.preventDefault();
        if (!bookingId) return;

        setChecking(true);
        setMessage("");

        try {
            const res = await checkBookingValid(bookingId); // API kiểm tra booking
            const {exists, status, reviewed} = res.data;
            if (!exists) {
                setMessage("❌ Booking Code does not exist.");
            } else if (status !== "Booked") {
                setMessage("❌ Booking is not in 'booked' status.");
            } else if (reviewed) {
                setMessage("❌ This booking has already been reviewed.");
            } else {
                setIsVerified(true); // Hợp lệ → mở form đánh giá
            }
        } catch (err) {
            setMessage("❌ Error checking booking. Please try again.");
        }

        setChecking(false);
    };

    const handleSubmitReview = async (e) => {
        e.preventDefault();
        try {
            await submitReview({bookingId: bookingId, rating, comment});
            setMessage("✅ Review submitted successfully!");
            setBookingId("");
            setRating(5);
            setComment("");
            setIsVerified(false);
            onSubmitted && onSubmitted();
        } catch (err) {
            const msg = err.response?.data || "❌ Error submitting the review.";
            setMessage(`❌ ${msg}`);
        }
    };

    return (
        <div className="border rounded p-4 shadow bg-light">
            <h5 className="mb-3">Write a Review</h5>

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

            {!isVerified ? (
                <form onSubmit={handleBookingCheck}>
                    <div className="mb-3">
                        <label className="form-label">Booking Code</label>
                        <input
                            type="String"
                            className="form-control"
                            required
                            value={bookingId}
                            onChange={(e) => setBookingId(e.target.value)}
                            placeholder="Enter your Booking Code..."
                        />
                    </div>
                    <button type="submit" className="btn btn-primary" disabled={checking}>
                        {checking ? "Checking..." : "Verify Booking"}
                    </button>
                </form>
            ) : (
                <form onSubmit={handleSubmitReview}>
                    <div className="mb-3">
                        <label className="form-label">Rating</label>
                        <select
                            className="form-select"
                            value={rating}
                            onChange={(e) => setRating(parseInt(e.target.value))}
                        >
                            {[5, 4, 3, 2, 1].map((r) => (
                                <option key={r} value={r}>
                                    {"⭐".repeat(r)} ({r})
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Comment</label>
                        <textarea
                            className="form-control"
                            rows={4}
                            required
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder="Write your review here..."
                        />
                    </div>

                    <button type="submit" className="btn btn-success">
                        Submit Review
                    </button>
                </form>
            )}
        </div>
    );
};

export default ReviewForm;

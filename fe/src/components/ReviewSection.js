import React, { useEffect, useState } from "react";
import ReviewForm from "../components/Form/ReviewForm";
import { getAllReviews } from "../services/reviewService";
import { FaSmile, FaFrown, FaMeh, FaStar } from "react-icons/fa";

const ReviewSection = () => {
    const [reviews, setReviews] = useState([]);
    const [showModal, setShowModal] = useState(false);

    const fetchReviews = async () => {
        try {
            const res = await getAllReviews();
            const filtered = res.data.filter((r) => !r.isSpam);
            setReviews(filtered);
        } catch (err) {
            console.error("Error getting review list:", err);
        }
    };

    useEffect(() => {
        fetchReviews();
    }, []);

    const handleOpenModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    const getSentimentIcon = (sentiment) => {
        switch (sentiment?.toLowerCase()) {
            case "positive":
                return <FaSmile className="text-success me-2" />;
            case "negative":
                return <FaFrown className="text-danger me-2" />;
            case "neutral":
                return <FaMeh className="text-secondary me-2" />;
            default:
                return <FaMeh className="text-muted me-2" />;
        }
    };

    const renderStars = (count) => {
        return Array.from({ length: count }, (_, i) => (
            <FaStar key={i} className="text-warning me-1" />
        ));
    };

    return (
        <div className="container py-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="text-primary fw-bold">Hotel Reviews</h2>
                <button className="btn btn-outline-primary" onClick={handleOpenModal}>
                    Write a Review
                </button>
            </div>

            {reviews.length === 0 ? (
                <p className="text-muted">No reviews yet</p>
            ) : (
                <div className="row">
                    {reviews.map((r, index) => (
                        <div className="col-md-6 mb-4" key={index}>
                            <div className="card shadow-sm border-0 h-100">
                                <div className="card-body">
                                    <div className="d-flex align-items-center mb-3">
                                        <img
                                            src={`https://i.pravatar.cc/50?img=${index + 1}`}
                                            alt="avatar"
                                            className="rounded-circle me-3"
                                            width="50"
                                            height="50"
                                        />
                                        <div>
                                            <h6 className="mb-0">{r.userName}</h6>
                                            <small className="text-muted">
                                                Room: {r.roomNumber} • {new Date(r.createdAt).toLocaleString()}
                                            </small>
                                        </div>
                                    </div>

                                    <div className="d-flex align-items-center mb-2">
                                        {getSentimentIcon(r.sentiment)}
                                        {renderStars(r.rating)}
                                    </div>

                                    <p className="card-text">{r.comment}</p>

                                    <div className="text-muted small">
                                        Capacity: {r.capacity}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Modal */}
            {showModal && (
                <div className="modal show fade d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content shadow-lg">
                            <div className="modal-header">
                                <h5 className="modal-title">Write a Review</h5>
                                <button type="button" className="btn-close" onClick={handleCloseModal}></button>
                            </div>
                            <div className="modal-body">
                                <ReviewForm
                                    bookingId={null}
                                    onSubmitted={() => {
                                        fetchReviews();
                                        handleCloseModal();
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ReviewSection;

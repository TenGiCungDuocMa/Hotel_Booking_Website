import React, { useEffect, useState } from "react";
import ReviewForm from "../components/Form/ReviewForm";
import { getAllReviews } from "../services/reviewService";

const ReviewPage = () => {
    const [reviews, setReviews] = useState([]);
    const [showModal, setShowModal] = useState(false);

    const fetchReviews = async () => {
        try {
            const res = await getAllReviews();
            const filtered = res.data.filter((r) => !r.isSpam);
            setReviews(filtered);
        } catch (err) {
            console.error("Lỗi khi lấy danh sách đánh giá:", err);
        }
    };

    useEffect(() => {
        fetchReviews();
    }, []);

    const handleOpenModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    return (
        <div className="container mt-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Đánh giá khách sạn</h2>
                <button className="btn btn-primary" onClick={handleOpenModal}>
                    Viết đánh giá
                </button>
            </div>

            {reviews.length === 0 ? (
                <p>Chưa có đánh giá nào.</p>
            ) : (
                <div className="list-group">
                    {reviews.map((r, index) => (
                        <div key={index} className="list-group-item">
                            <h5 className="mb-1">⭐ {r.rating} - <i>{r.sentiment || "Chưa phân tích"}</i></h5>
                            <p className="mb-1">{r.comment}</p>
                            <small className="text-muted">
                                Người đánh giá: {r.userName} | Phòng: {r.roomNumber} | Sức chứa: {r.capacity}<br />
                                Thời gian: {new Date(r.createdAt).toLocaleString()}
                            </small>
                        </div>
                    ))}
                </div>
            )}

            {/* Modal Bootstrap */}
            {showModal && (
                <div className="modal show fade d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Viết đánh giá</h5>
                                <button type="button" className="btn-close" onClick={handleCloseModal}></button>
                            </div>
                            <div className="modal-body">
                                <ReviewForm
                                    bookingId={null} // nếu có booking cụ thể thì truyền vào
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

export default ReviewPage;

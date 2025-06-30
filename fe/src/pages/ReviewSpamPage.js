import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AdminLayout from "../components/AdminLayout";
import { isAdmin } from "../utils/auth";
import {approveSpamReview, getSpamReviews, deleteReview} from "../services/reviewService"; // ✅ dùng API tách riêng
import Swal from "sweetalert2";

const ReviewSpamPage = () => {
    const [reviews, setReviews] = useState([]);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAdmin()) {
            toast.error("⚠️ Vui lòng đăng nhập bằng tài khoản admin để truy cập.");
            navigate("/login");
            return;
        }

        getSpamReviews()
            .then(res => setReviews(res))
            .catch(() => setError("Không thể tải danh sách review."));
    }, []);

    const handleApprove = async (id) => {
        try {
            await approveSpamReview(id);
            toast.success("Đã phê duyệt review.");
            setReviews(reviews.filter(r => r.id !== id));
        } catch (e) {
            toast.error("Lỗi phê duyệt.");
        }
    };

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: "Bạn chắc chắn?",
            text: "Review này sẽ bị xoá vĩnh viễn!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#6c757d",
            confirmButtonText: "Xoá",
            cancelButtonText: "Huỷ",
        });

        if (result.isConfirmed) {
            try {
                await deleteReview(id);
                toast.success("✅ Đã xoá review.");
                setReviews(reviews.filter(r => r.id !== id));
            } catch (err) {
                toast.error("❌ Lỗi xoá review.");
            }
        }
    };



    return (
        <AdminLayout>
            <h2 className="mb-4">🚫 Danh sách review bị đánh dấu spam</h2>

            {error ? (
                <div className="alert alert-danger">{error}</div>
            ) : (
                <div className="table-responsive">
                    <table className="table table-bordered table-hover align-middle">
                        <thead className="table-dark">
                        <tr>
                            <th>ID</th>
                            <th>User ID</th>
                            <th>Booking ID</th>
                            <th>Rating</th>
                            <th>Comment</th>
                            <th>Ngày</th>
                            <th>Thao tác</th>
                        </tr>
                        </thead>
                        <tbody>
                        {reviews.map(r => (
                            <tr key={r.id}>
                                <td>{r.id}</td>
                                <td>{r.userId}</td>
                                <td>{r.bookingId}</td>
                                <td>{r.rating}</td>
                                <td style={{maxWidth: 300}}>{r.comment}</td>
                                <td>{new Date(r.createdAt).toLocaleString()}</td>
                                <td>
                                    <button className="btn btn-success btn-sm me-2" onClick={() => handleApprove(r.id)}>
                                        ✅Phê duyệt
                                    </button>
                                    <button className="btn btn-danger btn-sm" onClick={() => handleDelete(r.id)}>
                                        🗑️Xoá
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}
        </AdminLayout>
    );
};

export default ReviewSpamPage;

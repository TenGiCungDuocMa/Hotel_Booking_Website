import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AdminLayout from "../components/AdminLayout";
import { isAdmin } from "../utils/auth";
import { approveSpamReview, getSpamReviews, deleteReview } from "../services/reviewService";
import Swal from "sweetalert2";

const ReviewSpamPage = () => {
    const [reviews, setReviews] = useState([]);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAdmin()) {
            toast.error("⚠️ Please log in with an admin account to access.");
            navigate("/login");
            return;
        }

        getSpamReviews()
            .then(res => setReviews(res))
            .catch(() => setError("Unable to load review list."));
    }, []);

    const handleApprove = async (id) => {
        try {
            await approveSpamReview(id);
            toast.success("Review approved successfully.");
            setReviews(reviews.filter(r => r.id !== id));
        } catch (e) {
            toast.error("Error approving review.");
        }
    };

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "This review will be deleted permanently!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#6c757d",
            confirmButtonText: "Delete",
            cancelButtonText: "Cancel",
        });

        if (result.isConfirmed) {
            try {
                await deleteReview(id);
                toast.success("✅ Review deleted successfully.");
                setReviews(reviews.filter(r => r.id !== id));
            } catch (err) {
                toast.error("❌ Error deleting review.");
            }
        }
    };

    return (
        <AdminLayout>
            <style>{`
                .review-spam-container {
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 1rem;
                }

                .review-spam-header {
                    font-size: 1.75rem;
                    font-weight: 700;
                    color: #2d3748;
                    margin-bottom: 1.5rem;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                }

                .table-responsive {
                    overflow-x: auto;
                }

                .review-table {
                    width: 100%;
                    border-collapse: separate;
                    border-spacing: 0 0.5rem;
                    background: #f7fafc;
                }

                .review-table thead {
                    background: #e2e8f0;
                    color: #4a5568;
                }

                .review-table th {
                    padding: 1rem;
                    text-align: left;
                    font-weight: 600;
                    font-size: 0.9rem;
                    border-bottom: 2px solid #cbd5e0;
                }

                .review-table td {
                    padding: 1rem;
                    background: #ffffff;
                    font-size: 0.9rem;
                    color: #4a5568;
                    border-bottom: 1px solid #edf2f7;
                }

                .review-table tr:hover td {
                    background: #edf2f7;
                    transition: background 0.2s ease;
                }

                .status-badge {
                    display: inline-block;
                    padding: 0.25rem 0.75rem;
                    border-radius: 12px;
                    font-size: 0.75rem;
                    font-weight: 600;
                    text-transform: uppercase;
                }

                .status-badge.pending {
                    background: #fefcbf;
                    color: #744210;
                }

                .status-badge.confirmed {
                    background: #c6f6d5;
                    color: #22543d;
                }

                .status-badge.cancelled {
                    background: #fed7d7;
                    color: #742a2a;
                }

                .action-buttons button {
                    padding: 0.3rem 0.75rem;
                    margin-right: 0.5rem;
                    border: none;
                    border-radius: 6px;
                    font-size: 0.8rem;
                    cursor: pointer;
                    transition: transform 0.2s ease, background 0.2s ease;
                }

                .action-buttons button:last-child {
                    margin-right: 0;
                }

                .action-buttons .approve-btn {
                    background: #48bb78;
                    color: #fff;
                }

                .action-buttons .approve-btn:hover {
                    background: #38a169;
                    transform: translateY(-1px);
                }

                .action-buttons .delete-btn {
                    background: #f56565;
                    color: #fff;
                }

                .action-buttons .delete-btn:hover {
                    background: #e53e3e;
                    transform: translateY(-1px);
                }

                @media (max-width: 768px) {
                    .review-spam-header {
                        font-size: 1.5rem;
                    }

                    .review-table th,
                    .review-table td {
                        padding: 0.75rem;
                        font-size: 0.85rem;
                    }

                    .action-buttons button {
                        padding: 0.25rem 0.5rem;
                        font-size: 0.75rem;
                    }
                }
            `}</style>
            <div className="review-spam-container">
                <h2 className="review-spam-header">
                    <span role="img" aria-label="warning">🚫</span> List of Reviews Marked as Spam
                </h2>

                {error ? (
                    <div className="alert alert-danger">{error}</div>
                ) : (
                    <div className="table-responsive">
                        <table className="review-table">
                            <thead>
                            <tr>
                                <th>ID</th>
                                <th>User ID</th>
                                <th>Booking ID</th>
                                <th>Rating</th>
                                <th>Comment</th>
                                <th>Date</th>
                                <th>Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {reviews.map(r => (
                                <tr key={r.id}>
                                    <td>{r.id}</td>
                                    <td>{r.userId}</td>
                                    <td>{r.bookingId}</td>
                                    <td>{r.rating} ★</td>
                                    <td style={{ maxWidth: 300 }}>{r.comment}</td>
                                    <td>{new Date(r.createdAt).toLocaleString()}</td>
                                    <td className="action-buttons">
                                        <button
                                            className="approve-btn"
                                            onClick={() => handleApprove(r.id)}
                                        >
                                            ✅ Approve
                                        </button>
                                        <button
                                            className="delete-btn"
                                            onClick={() => handleDelete(r.id)}
                                        >
                                            🗑️ Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
};

export default ReviewSpamPage;
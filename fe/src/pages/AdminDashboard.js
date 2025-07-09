import React from "react";
import AdminLayout from "../components/AdminLayout";
import ManageBookingsPage from "./ManageBookingsPage";
import StatisticsPage from "./StatisticsPage";

const AdminDashboard = () => {
    return (
        <AdminLayout>
            <style>{`
                .dashboard-container {
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 2rem 1rem;
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                }

                .dashboard-header {
                    font-size: 2rem;
                    font-weight: 700;
                    color: #1a202c;
                    margin-bottom: 2rem;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                }

                .stats-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                    gap: 1.5rem;
                    margin-bottom: 2rem;
                }

                .stat-card {
                    background: linear-gradient(135deg, #ffffff 0%, #f7fafc 100%);
                    border-radius: 12px;
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
                    padding: 1.5rem;
                    color: #fff;
                    transition: transform 0.3s ease, box-shadow 0.3s ease;
                    position: relative;
                    overflow: hidden;
                }

                .stat-card:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
                }

                .stat-card.earnings { background: linear-gradient(135deg, #f6ad55, #ed8936); }
                .stat-card.tasks { background: linear-gradient(135deg, #f56565, #e53e3e); }
                .stat-card.views { background: linear-gradient(135deg, #48bb78, #38a169); }
                .stat-card.downloads { background: linear-gradient(135deg, #4299e1, #3182ce); }

                .stat-card h5 {
                    font-size: 1.75rem;
                    font-weight: 700;
                    margin: 0 0 0.5rem;
                }

                .stat-card p {
                    font-size: 0.875rem;
                    margin: 0;
                    opacity: 0.9;
                }

                .stat-icon {
                    position: absolute;
                    bottom: 1rem;
                    right: 1rem;
                    opacity: 0.3;
                }

                .stat-icon svg {
                    width: 2rem;
                    height: 2rem;
                }

                .bookings-section {
                    margin-top: 2rem;
                }

                .bookings-header {
                    font-size: 1.75rem;
                    font-weight: 700;
                    color: #1a202c;
                    margin-bottom: 1rem;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                }

                .bookings-table-container {
                    background: #fff;
                    border-radius: 12px;
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
                    overflow: hidden;
                }

                .bookings-table {
                    width: 100%;
                    border-collapse: collapse;
                }

                .bookings-table thead {
                    background: #edf2f7;
                }

                .bookings-table th {
                    padding: 1rem;
                    text-align: left;
                    color: #4a5568;
                    font-weight: 600;
                    font-size: 0.875rem;
                }

                .bookings-table tbody tr {
                    border-bottom: 1px solid #e2e8f0;
                    transition: background 0.2s ease;
                }

                .bookings-table tbody tr:hover {
                    background: #f7fafc;
                }

                .bookings-table td {
                    padding: 1rem;
                    font-size: 0.875rem;
                    color: #2d3748;
                }

                .status-badge {
                    display: inline-block;
                    padding: 0.25rem 0.5rem;
                    border-radius: 9999px;
                    font-size: 0.75rem;
                    font-weight: 600;
                }

                .status-badge.confirmed {
                    background: #c6f6d5;
                    color: #2f855a;
                }

                .status-badge.pending {
                    background: #fefcbf;
                    color: #b7791f;
                }

                .status-badge.cancelled {
                    background: #fed7d7;
                    color: #c53030;
                }

                .action-buttons {
                    display: flex;
                    gap: 0.5rem;
                }

                .action-button {
                    background: none;
                    border: none;
                    font-size: 0.875rem;
                    cursor: pointer;
                    transition: color 0.2s ease;
                }

                .action-button.edit {
                    color: #3182ce;
                }

                .action-button.edit:hover {
                    color: #2b6cb0;
                }

                .action-button.delete {
                    color: #e53e3e;
                }

                .action-button.delete:hover {
                    color: #c53030;
                }

                @media (max-width: 768px) {
                    .stats-grid {
                        grid-template-columns: 1fr;
                    }

                    .bookings-table th,
                    .bookings-table td {
                        padding: 0.75rem;
                        font-size: 0.8125rem;
                    }
                }
            `}</style>
            <div className="dashboard-container">
                <h2 className="dashboard-header">
                    <span>📊</span> Dashboard Overview
                </h2>
                <div className="bookings-section">
                    <StatisticsPage role='admin'/>
                </div>
            </div>
        </AdminLayout>
    );
};

export default AdminDashboard;
import React, { useEffect, useState } from "react";
import {
    FiDollarSign,
    FiShoppingBag,
    FiThumbsUp,
    FiThumbsDown,
} from "react-icons/fi";
import { getStatistics } from "../services/statisticsService";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
} from "recharts";
import "../assets/style/DashBoard.css";

const StatisticsPage = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const data = await getStatistics();
                setStats(data);
            } catch (error) {
                console.error("Lỗi lấy dữ liệu thống kê:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    if (loading) return <div className="text-center p-5">Đang tải...</div>;
    if (!stats) return <div className="text-center p-5 text-red-500">Không có dữ liệu</div>;

    // Dữ liệu cho biểu đồ
    const chartData = [
        { name: "Bookings", value: stats.totalBookings },
        { name: "Positive", value: stats.positiveReviews },
        { name: "Negative", value: stats.negativeReviews },
    ];

    return (
        <div className="dashboard-wrapper">
            <div className="dashboard-container">
                <h1 className="dashboard-title">Dashboard Overview</h1>

                <div className="dashboard-cards">
                    {/* Revenue */}
                    <div className="card bg-orange">
                        <div className="card-content">
                            <FiDollarSign className="card-icon" size={32} />
                            <div>
                                <p>Revenue</p>
                                <h2>{stats.totalRevenue?.toLocaleString()} VND</h2>
                            </div>
                        </div>
                    </div>

                    {/* Total Bookings */}
                    <div className="card bg-green">
                        <div className="card-content">
                            <FiShoppingBag className="card-icon" size={32} />
                            <div>
                                <p>Total Bookings</p>
                                <h2>{stats.totalBookings}</h2>
                            </div>
                        </div>
                    </div>

                    {/* Positive Reviews */}
                    <div className="card bg-blue">
                        <div className="card-content">
                            <FiThumbsUp className="card-icon" size={32} />
                            <div>
                                <p>Positive Reviews</p>
                                <h2>{stats.positiveReviews}</h2>
                            </div>
                        </div>
                    </div>

                    {/* Negative Reviews */}
                    <div className="card bg-red">
                        <div className="card-content">
                            <FiThumbsDown className="card-icon" size={32} />
                            <div>
                                <p>Negative Reviews</p>
                                <h2>{stats.negativeReviews}</h2>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Biểu đồ thống kê */}
                <div className="mt-5 bg-white rounded shadow p-4">
                    <h3 className="text-xl font-semibold mb-4 text-center">Statistics Chart</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={chartData} margin={{ top: 10, right: 20, bottom: 30, left: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis allowDecimals={false} />
                            <Tooltip />
                            <Bar dataKey="value" fill="#8884d8" barSize={50} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Recent Activity - demo static */}
                <div className="dashboard-activity">
                    <h3>Recent Activity</h3>
                    <ul>
                        <li>Customer A booked a VIP room</li>
                        <li>Customer B completed payment</li>
                        <li>Room 203 was checked out</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default StatisticsPage;

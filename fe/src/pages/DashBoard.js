import React from "react";
import { FiDollarSign, FiShoppingBag, FiHome } from "react-icons/fi";
import "../assets/style/DashBoard.css";

const DashboardPage = () => {
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
                                <h2>$12,450</h2>
                            </div>
                        </div>
                    </div>

                    {/* Booking Orders */}
                    <div className="card bg-green">
                        <div className="card-content">
                            <FiShoppingBag className="card-icon" size={32} />
                            <div>
                                <p>Booking Orders</p>
                                <h2>128</h2>
                            </div>
                        </div>
                    </div>

                    {/* Rooms Booked */}
                    <div className="card bg-blue">
                        <div className="card-content">
                            <FiHome className="card-icon" size={32} />
                            <div>
                                <p>Rooms Booked</p>
                                <h2>342</h2>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Recent Activity */}
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

export default DashboardPage;

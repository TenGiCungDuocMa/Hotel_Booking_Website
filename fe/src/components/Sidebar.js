import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Sidebar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token"); // ❌ Xoá JWT
        navigate("/login"); // 🔁 Điều hướng
    };

    return (
        <div className="sidebar-container">
            <style>{`
                .sidebar-container {
                    width: 260px;
                    height: auto;
                    background: linear-gradient(145deg, #1e3c72, #2a5298);
                    color: #ffffff;
                    padding: 1.8rem 0.8rem;
                    display: flex;
                    flex-direction: column;
                    border-top-right-radius: 15px;
                    border-bottom-right-radius: 15px;
                    overflow: hidden;
                    box-shadow: 5px 0 20px rgba(0, 0, 0, 0.2);
                }

                .sidebar-header {
                    font-size: 1.6rem;
                    font-weight: 700;
                    padding: 0.7rem 1rem;
                    margin-bottom: 2.2rem;
                    display: flex;
                    align-items: center;
                    gap: 0.8rem;
                    background: rgba(255, 255, 255, 0.12);
                    border-radius: 10px;
                    text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.2);
                }

                .sidebar-header img {
                    width: 28px;
                    height: 28px;
                    filter: brightness(0) invert(1);
                }

                .nav-list {
                    flex-grow: 1;
                    list-style: none;
                    padding: 0;
                    margin: 0;
                }

                .nav-item {
                    padding: 0.9rem 1.2rem;
                    margin: 0.4rem 0;
                    border-radius: 10px;
                    text-decoration: none;
                    color: #ffffff;
                    font-size: 1.05rem;
                    font-weight: 500;
                    display: flex;
                    align-items: center;
                    transition: all 0.3s ease;
                    position: relative;
                }

                .nav-item:hover {
                    background: rgba(255, 255, 255, 0.18);
                    transform: scale(1.02);
                }

                .nav-item.active {
                    background: rgba(255, 255, 255, 0.3);
                    font-weight: 600;
                }

                .nav-item.active::after {
                    content: "";
                    position: absolute;
                    right: 0;
                    top: 0;
                    bottom: 0;
                    width: 6px;
                    background: #ffd700;
                    border-radius: 0 10px 10px 0;
                }

                .nav-item span[role="img"] {
                    margin-right: 0.9rem;
                    font-size: 1.3rem;
                }

                .logout-btn {
                    padding: 0.9rem 1.2rem;
                    border-radius: 10px;
                    border: none;
                    background: linear-gradient(145deg, #ff8c42, #ff6f61);
                    color: #ffffff;
                    font-size: 1.05rem;
                    font-weight: 500;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    margin-top: 1.5rem;
                }

                .logout-btn:hover {
                    background: linear-gradient(145deg, #ff6f61, #ff4e50);
                    transform: translateY(-3px);
                    box-shadow: 0 5px 15px rgba(255, 111, 97, 0.4);
                }

                @media (max-width: 768px) {
                    .sidebar-container {
                        width: 200px;
                        padding: 1.2rem 0.6rem;
                    }

                    .sidebar-header {
                        font-size: 1.3rem;
                        margin-bottom: 1.8rem;
                    }

                    .nav-item {
                        padding: 0.7rem 1rem;
                        font-size: 0.95rem;
                    }

                    .logout-btn {
                        padding: 0.7rem 1rem;
                        font-size: 0.95rem;
                    }
                }
            `}</style>
            <div className="sidebar-container">
                <div className="sidebar-header">
                    <img src="https://via.placeholder.com/28" alt="Admin Icon" />
                    Admin Panel
                </div>

                <ul className="nav-list">
                    <li>
                        <NavLink
                            to="/admin"
                            className={({ isActive }) =>
                                `nav-item ${isActive ? "active" : ""}`
                            }
                        >
                            <span role="img" aria-label="dashboard">📊</span> Dashboard
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/admin/reviews/spam"
                            className={({ isActive }) =>
                                `nav-item ${isActive ? "active" : ""}`
                            }
                        >
                            <span role="img" aria-label="spam">🚫</span> Review Spam
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/admin/manage-booking"
                            className={({ isActive }) =>
                                `nav-item ${isActive ? "active" : ""}`
                            }
                        >
                            <span role="img" aria-label="manage">📋</span> Manage Booking
                        </NavLink>
                    </li>
                    <li>
                        <button className="logout-btn" onClick={handleLogout}>
                            <span role="img" aria-label="logout">🚪</span> Logout
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../assets/style/Sidebar.css";

const Sidebar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token"); // ❌ Xoá JWT
        navigate("/login"); // 🔁 Điều hướng
    };

    return (
        <div className="sidebar d-flex flex-column p-3 bg-primary text-white" style={{ width: "250px", height: "100vh" }}>
            <h4 className="text-white mb-4">🏨 Admin Panel</h4>

            <ul className="nav nav-pills flex-column mb-auto">
                <li>
                    <NavLink to="/admin" className={({ isActive }) =>
                        `nav-link ${isActive ? "active-link" : "text-white"}`
                    }>
                        📊 Dashboard
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/admin/reviews/spam" className={({ isActive }) =>
                        `nav-link ${isActive ? "active-link" : "text-white"}`
                    }>
                        🚫 Review Spam
                    </NavLink>
                </li>
                <li>
                    <button
                        className="btn btn-outline-light mt-4"
                        onClick={handleLogout}
                    >
                        🚪 Logout
                    </button>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;

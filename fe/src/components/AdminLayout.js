import React from "react";
import Sidebar from "./Sidebar";

const AdminLayout = ({ children }) => {
    return (
        <div className="d-flex">
            <Sidebar />
            <div className="flex-grow-1 p-4 bg-light" style={{ minHeight: "100vh" }}>
                {children}
            </div>
        </div>
    );
};

export default AdminLayout;

import React from "react";
import AdminLayout from "../components/AdminLayout";

const AdminDashboard = () => {
    return (
        <AdminLayout>
            <h2 className="mb-4">📊 Thống kê tổng quan</h2>
            <div className="row">
                <div className="col-md-3">
                    <div className="card text-white bg-warning mb-3">
                        <div className="card-body">
                            <h5>$30,200</h5>
                            <p className="card-text">All Earnings</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card text-white bg-danger mb-3">
                        <div className="card-body">
                            <h5>145</h5>
                            <p className="card-text">Tasks</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card text-white bg-success mb-3">
                        <div className="card-body">
                            <h5>290+</h5>
                            <p className="card-text">Page Views</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card text-white bg-info mb-3">
                        <div className="card-body">
                            <h5>500</h5>
                            <p className="card-text">Downloads</p>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default AdminDashboard;

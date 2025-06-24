import React, { useEffect, useState } from "react";
import { getProfile, updateProfile } from "../services/profileService";

const ProfilePage = () => {
    const [form, setForm] = useState({
        fullName: "",
        email: "",
        phone: "",
        role: "",
    });

    const [editMode, setEditMode] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const profile = await getProfile();
                setForm(profile);
            } catch (error) {
                console.error("Lỗi khi lấy thông tin user:", error);
            }
        };
        fetchData();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = async () => {
        try {
            const updated = await updateProfile({
                fullName: form.fullName,
                phone: form.phone,
            });
            setForm(updated);
            setEditMode(false);
            setMessage("✅ Cập nhật thành công!");
        } catch (error) {
            console.error("Lỗi khi cập nhật:", error);
            setMessage("❌ Cập nhật thất bại!");
        }
    };

    return (
        <div className="container py-5 d-flex justify-content-center">
            <div className="card shadow-lg w-100" style={{ maxWidth: "650px" }}>
                <div className="card-body">
                    <h3 className="card-title mb-4 text-center">Thông tin cá nhân</h3>

                    {message && (
                        <div
                            className={`alert ${
                                message.includes("thành công") ? "alert-success" : "alert-danger"
                            }`}
                        >
                            {message}
                        </div>
                    )}

                    {/* Họ tên */}
                    <div className="row mb-3 align-items-center">
                        <label className="col-sm-3 col-form-label">Họ tên</label>
                        <div className="col-sm-9">
                            {editMode ? (
                                <input
                                    type="text"
                                    name="fullName"
                                    value={form.fullName}
                                    onChange={handleInputChange}
                                    className="form-control"
                                />
                            ) : (
                                <p className="form-control-plaintext mb-0">{form.fullName}</p>
                            )}
                        </div>
                    </div>

                    {/* Số điện thoại */}
                    <div className="row mb-3 align-items-center">
                        <label className="col-sm-3 col-form-label">Số điện thoại</label>
                        <div className="col-sm-9">
                            {editMode ? (
                                <input
                                    type="text"
                                    name="phone"
                                    value={form.phone}
                                    onChange={handleInputChange}
                                    className="form-control"
                                />
                            ) : (
                                <p className="form-control-plaintext mb-0">{form.phone}</p>
                            )}
                        </div>
                    </div>

                    {/* Email */}
                    <div className="row mb-3 align-items-center">
                        <label className="col-sm-3 col-form-label">Email</label>
                        <div className="col-sm-9">
                            <p className="form-control-plaintext mb-0">{form.email}</p>
                        </div>
                    </div>

                    {/* Vai trò */}
                    <div className="row mb-3 align-items-center">
                        <label className="col-sm-3 col-form-label">Vai trò</label>
                        <div className="col-sm-9">
                            <p className="form-control-plaintext mb-0 text-capitalize">{form.role}</p>
                        </div>
                    </div>

                    {/* Button */}
                    <div className="text-center mt-4">
                        {editMode ? (
                            <>
                                <button className="btn btn-success me-2 px-4" onClick={handleSave}>
                                    Lưu
                                </button>
                                <button
                                    className="btn btn-secondary px-4"
                                    onClick={() => setEditMode(false)}
                                >
                                    Hủy
                                </button>
                            </>
                        ) : (
                            <button
                                className="btn btn-warning text-white px-4"
                                onClick={() => setEditMode(true)}
                            >
                                Chỉnh sửa
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;

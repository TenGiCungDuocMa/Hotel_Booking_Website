import React from "react";

const ProfileForm = ({ form, editMode, onChange }) => {
    return (
        <>
            <div className="mb-3">
                <label className="form-label">Họ tên</label>
                {editMode ? (
                    <input
                        type="text"
                        name="fullName"
                        value={form.fullName}
                        onChange={onChange}
                        className="form-control"
                    />
                ) : (
                    <div className="form-control-plaintext">{form.fullName}</div>
                )}
            </div>

            <div className="mb-3">
                <label className="form-label">Số điện thoại</label>
                {editMode ? (
                    <input
                        type="text"
                        name="phone"
                        value={form.phone}
                        onChange={onChange}
                        className="form-control"
                    />
                ) : (
                    <div className="form-control-plaintext">{form.phone}</div>
                )}
            </div>

            <div className="mb-3">
                <label className="form-label">Email</label>
                <div className="form-control-plaintext">{form.email}</div>
            </div>

            <div className="mb-3">
                <label className="form-label">Vai trò</label>
                <div className="form-control-plaintext">{form.role}</div>
            </div>
        </>
    );
};

export default ProfileForm;

// AccountInfo.js
import React from 'react';
import { FaEdit } from 'react-icons/fa';
import Header from '../Header';

const AccountInfo = ({ formData, handleChange, handleSave }) => {
    return (
        <div className="account-wrapper">
            <Header />
            <div className="account-container">
                <h1 className="account-welcome">
                    Welcome, {formData.fullName || 'User'}
                </h1>

                <div className="account-box">
                    <div className="account-box-header">
                        <div className="header-title">Your Account Information</div>
                    </div>


                    <div className="account-form">
                        {/* Full Name */}
                        <div className="form-field">
                            <label>Full Name</label>
                            <div className="input-group">
                                <input
                                    type="text"
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    placeholder="Your Full Name"
                                />
                                <FaEdit className="icon" />
                            </div>
                        </div>

                        {/* Email */}
                        <div className="form-field">
                            <label>Email</label>
                            <div className="input-group">
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Email"
                                />
                                <FaEdit className="icon" />
                            </div>
                        </div>

                        {/* Phone Number */}
                        <div className="form-field">
                            <label>Phone Number</label>
                            <div className="input-group">
                                <input
                                    type="text"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder="Your phone number"
                                />
                                <FaEdit className="icon" />
                            </div>
                        </div>
                    </div>

                    <div className="account-buttons">
                        <button className="btn-save" onClick={handleSave}>
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AccountInfo;

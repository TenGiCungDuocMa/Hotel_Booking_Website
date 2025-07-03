import React, { useEffect, useState } from 'react';
import { FaEdit } from 'react-icons/fa';
import Header from '../components/Header';
import { getProfile, updateProfile } from '../services/profileService';
import Footer from "../components/Footer";

const ProfilePage = () => {
    const banners = [
        "/bg_1.jpg", "/bg_2.jpg", "/bg_4.jpg"
    ];
    const titles1 = [
        "More than a hotel... an experience",
        "Where luxury meets comfort",
        "Unwind in style and elegance"
    ];
    const titles2 = [
        "Discover the perfect blend of luxury and comfort",
        "Experience the ultimate in hospitality",
        "Your dream vacation starts here"
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        role: '',
    });

    const [editMode, setEditMode] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const profile = await getProfile();
                setFormData(profile);
            } catch (error) {
                console.error("Lỗi khi lấy thông tin user:", error);
            }
        };
        fetchData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = async () => {
        try {
            const updated = await updateProfile({
                fullName: formData.fullName,
                phone: formData.phone,
                email: formData.email, // thêm email
            });
            setFormData(updated);
            setEditMode(false);
            setMessage('Updated profile successfully!');
        } catch (error) {
            console.error("Error updating profile:", error);
            setMessage('Update failure!');
        }
    };

    return (
        <div className="account-wrapper">
            <Header/>
            <div className="banner" style={{ position: "relative", textAlign: "center" }}>
                <img
                    style={{
                        maxWidth: "100%",
                        filter: "brightness(55%)",
                        height: "auto"
                    }}
                    src={banners[currentIndex]}
                    alt="BookingOT"
                />
                <div
                    className="banner-text"
                    style={{
                        position: "absolute",
                        left: "50%",
                        top: "35%",
                        transform: "translateX(-50%)",
                        textAlign: "center"
                    }}
                >
                    <h1
                        style={{
                            color: "#f1905b",
                            fontSize: "16px",
                            textTransform: "uppercase",
                            letterSpacing: "2px",
                            fontWeight: 700
                        }}
                    >
                        {titles1[currentIndex]}
                    </h1>
                    <h2
                        style={{
                            color: "white",
                            fontSize: "6vw",
                            fontWeight: 700,
                            lineHeight: 1
                        }}
                    >
                        {titles2[currentIndex]}
                    </h2>
                </div>
            </div>
            <div className="account-container">
                <h1 className="account-welcome">
                    Welcome, {formData.fullName || 'User'}
                </h1>

                <div className="account-box">
                    <div className="account-box-header position-relative text-center">
                        <button
                            onClick={() => window.history.back()}
                            className="btn-back position-absolute"
                            style={{ left: '0', top: '50%', transform: 'translateY(-50%)'}}
                        >
                            ←
                        </button>
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
                                    disabled={!editMode}
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
                                    disabled={!editMode}
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
                                    disabled={!editMode}
                                    placeholder="Your phone number"
                                />
                                <FaEdit className="icon" />
                            </div>
                        </div>
                    </div>
                    {message && (
                        <div
                            className={`form-message ${message.includes("success") ? "success" : "error"}`}
                        >
                            {message}
                        </div>
                    )}
                    <div className="account-buttons">
                        {editMode ? (
                            <>
                                <button className="btn-save" onClick={handleSave}>Save</button>
                                <button className="btn-cancel" onClick={() => setEditMode(false)}>Cancel</button>
                            </>
                        ) : (
                            <button className="btn-edit" onClick={() => setEditMode(true)}>Edit</button>
                        )}
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
};

export default ProfilePage;

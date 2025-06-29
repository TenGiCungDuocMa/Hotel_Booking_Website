import React, { useEffect,useState } from "react";
import { useLocation } from 'react-router-dom';
import './global.scss';
import axios from "axios";
const Section = ({ title, icon, children }) => (
    <div className="section">
        <div className="section__header">
            {icon && <div className="section__icon">{icon}</div>}
            <h3 className="section__title">{title}</h3>
        </div>
        <div className="section__content">{children}</div>
    </div>
);

const InfoItem = ({ label, value, icon }) => (
    <div className="info-item">
        <div className="info-item__label">
            {icon && <span className="info-item__icon">{icon}</span>}
            {label}:
        </div>
        <div className="info-item__value">{value || '-'}</div>
    </div>
);

const ConfirmationPage = ({ bookingData, roomData, paymentMethod }) => {
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const transactionId = query.get('transactionId');
    const [showEmailPopup, setShowEmailPopup] = useState(false);

    useEffect(() => {
        if (bookingData?.email) {
            const sendEmail = async () => {
                try {
                    await axios.post("http://localhost:8080/api/send-confirmation-email", {
                        bookingData,
                        roomData,
                        paymentMethod,
                        transactionId,
                    });
                    setShowEmailPopup(true); // Show popup
                    setTimeout(() => setShowEmailPopup(false), 10000); // Hide after 10s
                } catch (err) {
                    console.error("Lỗi gửi mail:", err);
                }
            };
            sendEmail();
        }
    }, [bookingData, roomData, paymentMethod, transactionId]);

    // Format price
    const formatPrice = (price) => {
        if (!price) return 'N/A';
        const number = parseInt(price.replace(/[^0-9]/g, '')) || 0;
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(number);
    };

    // Calculate total price
    const calculateTotal = () => {
        if (!roomData?.price || !roomData?.checkInDate || !roomData?.checkOutDate) return 0;
        const pricePerNight = parseInt(roomData.price.replace(/[^0-9]/g, '')) || 0;
        const diffTime = Math.abs(new Date(roomData.checkOutDate) - new Date(roomData.checkInDate));
        const nights = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return pricePerNight * nights;
    };

    const totalPrice = calculateTotal();

    return (
        <div className="confirmation-page">
            {showEmailPopup && (
                <div className="email-popup">
                    📧 Email xác nhận đã được gửi tới <strong>{bookingData?.email}</strong>
                </div>
            )}
            <div className="confirmation-page__header">
                <div className="confirmation-badge">
                </div>
                <h1 className="confirmation-page__title">Booking Confirmed</h1>
                <p className="confirmation-page__subtitle">
                    Thank you for your reservation! A confirmation has been sent to {bookingData?.email || 'your email'}
                </p>
            </div>

            {transactionId && (
                <div className="confirmation-page__notice">
                    <div className="notice-content">
                        <span className="notice-label">Transaction ID:</span>
                        <span className="notice-value">{transactionId}</span>
                    </div>
                </div>
            )}

            <div className="confirmation-page__grid">
                <Section title="Personal Details" >
                    <InfoItem
                        label="Full Name"
                        value={`${bookingData?.firstName || ''} ${bookingData?.lastName || ''}`}
                    />
                    <InfoItem
                        label="Email"
                        value={bookingData?.email}
                    />
                    <InfoItem
                        label="Phone"
                        value={bookingData?.phone}
                    />
                    <InfoItem
                        label="Country"
                        value={bookingData?.country}
                    />
                </Section>

                <Section title="Room Details" >
                    <InfoItem
                        label="Hotel"
                        value={roomData?.hotelName}
                    />
                    <InfoItem
                        label="Room Type"
                        value={roomData?.roomType}
                    />
                    <InfoItem
                        label="Check-in"
                        value={roomData?.checkInDate}
                    />
                    <InfoItem
                        label="Check-out"
                        value={roomData?.checkOutDate}
                    />
                    <InfoItem
                        label="Guests"
                        value={roomData?.capacity}
                    />
                    <InfoItem
                        label="Price per night"
                        value={formatPrice(roomData?.price)}
                    />
                </Section>
            </div>

            <Section title="Special Requests" >
                {bookingData?.specialRequests ? (
                    <div className="special-requests">
                        <p>{bookingData.specialRequests}</p>
                    </div>
                ) : (
                    <p className="no-requests">No special requests</p>
                )}
            </Section>

            <Section title="Payment Summary" >
                <InfoItem
                    label="Payment Method"
                    value={paymentMethod}
                />
                <div className="price-summary">
                    <div className="price-row">
                        <span>Room Price ({roomData?.checkInDate} - {roomData?.checkOutDate})</span>
                        <span>{formatPrice(roomData?.price)} × {Math.ceil(
                            (new Date(roomData?.checkOutDate) - new Date(roomData?.checkInDate)) /
                            (1000 * 60 * 60 * 24)
                        )} nights</span>
                    </div>
                    <div className="price-row total">
                        <span>Total Amount</span>
                        <span>{formatPrice(totalPrice.toString())}</span>
                    </div>
                </div>
                <p className="payment-note">
                    You'll receive a detailed payment receipt via email within 24 hours.
                </p>
            </Section>

            <div className="confirmation-page__footer">
                <div className="support-info">
                    <p>Need help? Contact our 24/7 customer support at <a href="tel:+1800123456">1800 123 456</a></p>
                </div>
                <p className="confirmation-page__copyright">© {new Date().getFullYear()} TravelApp. All rights reserved.</p>
            </div>
        </div>
    );
};

export default ConfirmationPage;
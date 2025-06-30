import React, { useState } from 'react';
import axios from 'axios';
import './global.scss';

const BookingForm = ({ roomId, checkInDate, checkOutDate, onBookingSuccess }) => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        country: 'Vietnam',
        phone: '',
        specialRequests: '',
        agreedToPolicy: false,
        subscribeNewsletter: false,
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const validateForm = () => {
        let tempErrors = {};
        if (!formData.firstName.trim()) tempErrors.firstName = 'First name is required';
        if (!formData.lastName.trim()) tempErrors.lastName = 'Last name is required';
        if (!formData.email.trim()) {
            tempErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            tempErrors.email = 'Email is invalid';
        }
        if (!formData.phone.trim()) {
            tempErrors.phone = 'Phone number is required';
        } else if (!/^\+?[\d\s-]{9,}$/.test(formData.phone)) {
            tempErrors.phone = 'Phone number is invalid';
        }
        if (!formData.agreedToPolicy) {
            tempErrors.agreedToPolicy = 'You must agree to the cancellation policy';
        }
        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        setLoading(true);
        try {
            const bookingPayload = {
                ...formData,
                roomId,
                checkInDate,
                checkOutDate,
                status: "Booked"
            };
            const res = await axios.post('/api/bookings', bookingPayload);
            if (onBookingSuccess) onBookingSuccess(res.data, bookingPayload);
            alert('Booking details submitted successfully!');
        } catch (err) {
            alert('Failed to submit booking. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="booking-form-container">
            <h2 className="booking-form-title">Enter Your Details</h2>
            <form onSubmit={handleSubmit} className="booking-form">
                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="firstName" className="form-label">First Name *</label>
                        <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            className="form-input"
                            aria-describedby="firstName-error"
                        />
                        {errors.firstName && <p id="firstName-error" className="error-message">{errors.firstName}</p>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="lastName" className="form-label">Last Name *</label>
                        <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            className="form-input"
                            aria-describedby="lastName-error"
                        />
                        {errors.lastName && <p id="lastName-error" className="error-message">{errors.lastName}</p>}
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="email" className="form-label">Email Address *</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="form-input"
                        aria-describedby="email-error"
                    />
                    {errors.email && <p id="email-error" className="error-message">{errors.email}</p>}
                </div>

                <div className="form-group">
                    <label htmlFor="country" className="form-label">Country/Region *</label>
                    <select
                        id="country"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        className="form-input"
                    >
                        <option value="Vietnam">Vietnam</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="phone" className="form-label">Phone Number *</label>
                    <div className="form-phone-group">
                        <select
                            name="phoneCode"
                            value="+84"
                            onChange={() => {}}
                            className="form-input form-phone-code"
                        >
                            <option value="+84">VN +84</option>
                        </select>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="form-input form-phone-number"
                            aria-describedby="phone-error"
                        />
                    </div>
                    {errors.phone && <p id="phone-error" className="error-message">{errors.phone}</p>}
                </div>

                <div className="booking-form-extras">
                    <div className="form-section special-requests">
                        <h3>Special Requests (Optional)</h3>
                        <textarea
                            name="specialRequests"
                            placeholder="E.g. Early check-in, late check-out, room preferences..."
                            rows="6"
                            className="request-textarea"
                            value={formData.specialRequests}
                            onChange={handleChange}
                        />
                        <p className="note">We'll try our best to accommodate your requests</p>
                    </div>

                    <div className="form-section policy-confirmation">
                        <div className="checkbox-group">
                            <input
                                type="checkbox"
                                id="policy-agreement"
                                name="agreedToPolicy"
                                checked={formData.agreedToPolicy}
                                onChange={handleChange}
                            />
                            <label htmlFor="policy-agreement">
                                I agree to the hotel's cancellation policy and terms of service.
                                <a href="#" className="policy-link">View policy</a>
                            </label>
                        </div>
                        <div className="checkbox-group">
                            <input
                                type="checkbox"
                                id="newsletter"
                                name="subscribeNewsletter"
                                checked={formData.subscribeNewsletter}
                                onChange={handleChange}
                            />
                            <label htmlFor="newsletter">
                                Subscribe to our newsletter for special offers
                            </label>
                        </div>
                        {errors.agreedToPolicy && <p className="error-message">{errors.agreedToPolicy}</p>}
                    </div>
                </div>

                <button type="submit" className="submit-btn" disabled={loading}>
                    {loading ? 'Submitting...' : 'Submit'}
                </button>
            </form>
        </div>
    );
};

export default BookingForm;

import React from 'react';
import './global.scss';

const RoomDetails = ({ roomData = {}, hotelInfo = null }) => {
    const {
        roomType,
        price,
        checkInDate,
        checkOutDate,
        capacity,
        amenities = [],
        hotelName,
        hotelAddress,
        roomNumber,
        features
    } = roomData;

    // Calculate total nights between check-in and check-out
    const calculateTotalNights = () => {
        if (!checkInDate || !checkOutDate) return 0;
        const checkIn = new Date(checkInDate);
        const checkOut = new Date(checkOutDate);
        const diffTime = Math.abs(checkOut - checkIn);
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    };

    const totalNights = calculateTotalNights();

    // Parse price per night and calculate total price
    const parsePrice = (priceString) => {
        if (!priceString) return 0;
        // Remove all non-numeric characters except decimal point
        const cleanPrice = priceString.toString().replace(/[^\d.]/g, '');
        return parseFloat(cleanPrice) || 0;
    };

    const pricePerNight = parsePrice(price);
    const originalTotalPrice = pricePerNight * totalNights;

    // Format price for display
    const formatPrice = (price) => {
        return new Intl.NumberFormat('vi-VN', { 
            style: 'currency', 
            currency: 'VND' 
        }).format(price);
    };

    // Format date for display
    const formatDate = (dateString) => {
        if (!dateString) return 'Not selected';
        return new Date(dateString).toLocaleDateString('en-US', { 
            weekday: 'short', 
            month: 'short', 
            day: 'numeric', 
            year: 'numeric' 
        });
    };

    // Combine room features and amenities
    const allAmenities = [
        ...(features ? features.split(',').map(f => f.trim()) : []),
    ].filter(Boolean);

    return (
        <div className="room-details">
            {/* Property Info */}
            <div className="property-info">
                <div className="flex items-center justify-between">
                    <button className="favorite-btn">
                        <svg className="favorite-btn svg" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                             xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                  d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 20.364l-7.682-7.682a4.5 4.5 0 01-1.318-3.182z"></path>
                        </svg>
                    </button>
                </div>
                <h2>{hotelName || hotelInfo?.name || roomData.hotel?.name || roomData.hotelName || 'Hotel Name Not Available'}</h2>
                <p className="address">{hotelAddress || hotelInfo?.address || roomData.hotel?.address || roomData.hotelAddress || 'Address Not Available'}</p>
                <div className="rating">
                    <span className="rating-badge">9.9</span>
                    <span className="reviews">Exceptional • 20 reviews</span>
                </div>
                <div className="amenities">
                    <span>🅿 Parking</span>
                    {allAmenities.map((amenity, index) => (
                        <span key={index}>{amenity}</span>
                    ))}
                </div>
            </div>

            {/* Booking Details */}
            <div className="booking-details">
                <h3>Your booking details</h3>
                <div className="booking-info">
                    <div className="date-section">
                        <p>Check-in</p>
                        <p className="date">{formatDate(checkInDate)}</p>
                        <p>2:00 PM – 11:00 PM</p>
                    </div>
                    <div className="date-section">
                        <p>Check-out</p>
                        <p className="date">{formatDate(checkOutDate)}</p>
                        <p>12:00 AM – 12:00 PM</p>
                    </div>
                </div>
                <p className="stay-length">Total length of stay:</p>
                <p className="nights">{totalNights} night{totalNights !== 1 ? 's' : ''}</p>
                <div className="selection">
                    <p>You selected</p>
                    <p className="selected">
                        1 room ({roomType || 'Room Type Not Available'}) 
                        {roomNumber && ` - Room ${roomNumber} `}
                        for {capacity || 'Not specified'} people
                    </p>
                </div>
            </div>

            {/* Price Summary */}
            <div className="price-summary">
                <h3>Your price summary</h3>
                <div className="price-details">
                    <div className="price-row">
                        <p>Price per night</p>
                        <p>{formatPrice(pricePerNight)}</p>
                    </div>
                    <div className="price-row">
                        <p>Number of nights</p>
                        <p>{totalNights} night{totalNights !== 1 ? 's' : ''}</p>
                    </div>
                    <div className="price-row">
                        <p>Subtotal</p>
                        <p>{formatPrice(originalTotalPrice)}</p>
                    </div>
                    <div className="total-price">
                        <p className="discounted">{formatPrice(originalTotalPrice)}</p>
                    </div>
                    <p className="tax-note">Includes taxes and fees</p>
                </div>
            </div>
        </div>
    );
};

export default RoomDetails;
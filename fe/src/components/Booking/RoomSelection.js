import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './global.scss';

// Sub-component for room card
const RoomCard = ({ room, onBook, isDisabled, image }) => (
    <div className="room-card">
        <div className="room-image">
            <img src={image} alt={`${room.type} view`} className="room-image-img" />
        </div>
        <div className="room-content">
            <div className="room-details">
                <h3 className="room-title">{room.type}</h3>
                <p className="room-capacity">
                    <svg className="capacity-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    <span>{room.capacity}</span>
                </p>
                <ul className="room-amenities">
                    {room.amenities && room.amenities.split(',').map((amenity, index) => (
                        <li key={index} className="amenity-tag">{amenity.trim()}</li>
                    ))}
                </ul>
            </div>
            <div className="room-price-section">
                <p className="room-price">{room.pricePerNight} đ/night</p>
                <button
                    onClick={() => onBook(room)}
                    className="book-now-btn"
                    disabled={isDisabled}
                    aria-label={`Book ${room.type} for ${room.pricePerNight}`}
                >
                    Book Now
                </button>
            </div>
        </div>
    </div>
);

const RoomSelection = ({ hotelId, onRoomSelect, defaultDates = {}, imagePaths = [] }) => {
    const [checkInDate, setCheckInDate] = useState(defaultDates.checkInDate || '');
    const [checkOutDate, setCheckOutDate] = useState(defaultDates.checkOutDate || '');
    const [rooms, setRooms] = useState([]);
    useEffect(() => {
        if (hotelId) {
            axios.get(`/api/bookings/hotels/${hotelId}/rooms`)
                .then(res => setRooms(res.data))
                .catch(() => setRooms([]));
        }
    }, [hotelId]);

    const handleBookRoom = (room) => {
        if (!checkInDate || !checkOutDate) {
            alert('Please select both check-in and check-out dates.');
            return;
        }
        const checkIn = new Date(checkInDate);
        const checkOut = new Date(checkOutDate);
        if (checkOut <= checkIn) {
            alert('Check-out date must be after check-in date.');
            return;
        }
        onRoomSelect({
            ...room,
            checkInDate,
            checkOutDate,
        });
    };

    const today = new Date().toISOString().split('T')[0]; // Current date: 2025-06-01
    const isBookingDisabled = !checkInDate || !checkOutDate;

    return (
        <section className="room-selection">
            <div className="date-selection">
                <h2 className="section-title">Choose Your Stay Dates</h2>
                <div className="date-selection-wrapper">
                    <div className="date-field">
                        <label htmlFor="check-in-date" className="date-label">Check-in Date</label>
                        <input
                            type="date"
                            id="check-in-date"
                            value={checkInDate}
                            onChange={(e) => setCheckInDate(e.target.value)}
                            min={today}
                            className={`date-input ${!checkInDate && checkOutDate ? 'invalid' : ''}`}
                            required
                            aria-label="Select check-in date"
                        />
                    </div>
                    <div className="date-field">
                        <label htmlFor="check-out-date" className="date-label">Check-out Date</label>
                        <input
                            type="date"
                            id="check-out-date"
                            value={checkOutDate}
                            onChange={(e) => setCheckOutDate(e.target.value)}
                            min={checkInDate || today}
                            className={`date-input ${!checkOutDate && checkInDate ? 'invalid' : ''}`}
                            required
                            aria-label="Select check-out date"
                        />
                    </div>
                </div>
            </div>

            <div className="room-list">
                <h2 className="section-title">Available Rooms</h2>
                <div className="room-list-container">
                    {rooms.map((room, idx) => (
                        <RoomCard
                            key={room.roomId || idx}
                            room={room}
                            onBook={handleBookRoom}
                            isDisabled={isBookingDisabled}
                            image={imagePaths[idx % imagePaths.length]}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default RoomSelection;
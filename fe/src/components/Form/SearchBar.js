import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import GuestSelector from './GuestSelector';
import 'react-datepicker/dist/react-datepicker.css';

function SearchBar({ onSearch }) {
    const [destination, setDestination] = useState('');
    const [checkIn, setCheckIn] = useState(null);
    const [checkOut, setCheckOut] = useState(null);
    const [showGuests, setShowGuests] = useState(false);
    const [guests, setGuests] = useState({ rooms: 1, adults: 2, children: 0 });

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch({
            destination,
            checkIn: checkIn?.toISOString().split('T')[0],
            checkOut: checkOut?.toISOString().split('T')[0],
            guests,
        });
    };

    return (
        <form className="search-bar" onSubmit={handleSubmit} onClick={() => setShowGuests(false)}>
            <div className="input destination">
                <input
                    type="text"
                    placeholder="Bạn muốn đi đâu?"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                />
            </div>

            <div className="input date" onClick={(e) => e.stopPropagation()}>
                <DatePicker
                    selected={checkIn}
                    onChange={(date) => setCheckIn(date)}
                    selectsStart
                    startDate={checkIn}
                    endDate={checkOut}
                    placeholderText="Ngày nhận phòng"
                    dateFormat="dd/MM/yyyy"
                />
                <DatePicker
                    selected={checkOut}
                    onChange={(date) => setCheckOut(date)}
                    selectsEnd
                    startDate={checkIn}
                    endDate={checkOut}
                    minDate={checkIn}
                    placeholderText="Ngày trả phòng"
                    dateFormat="dd/MM/yyyy"
                />
            </div>

            <div className="input guest" onClick={(e) => { e.stopPropagation(); setShowGuests(!showGuests); }}>
        <span>
          {guests.adults} người lớn · {guests.children} trẻ em · {guests.rooms} phòng
        </span>
                {showGuests && (
                    <GuestSelector guests={guests} setGuests={setGuests} onClose={() => setShowGuests(false)} />
                )}
            </div>

            <button type="submit">Tìm</button>
        </form>
    );
}

export default SearchBar;
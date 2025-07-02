import React from 'react';

function GuestSelector({ guests, setGuests, onClose }) {
    const handleChange = (type, delta) => {
        setGuests((prev) => {
            const updated = { ...prev, [type]: Math.max(0, prev[type] + delta) };
            if (type === 'adults' && updated.adults < 1) updated.adults = 1;
            if (type === 'rooms' && updated.rooms < 1) updated.rooms = 1;
            console.log('Updated guests:', updated);
            return updated;
        });
    };

    return (
        <div className="guest-selector" onClick={(e) => e.stopPropagation()}>
            <div className="guest-row">
                <div className="label-stepper">
                    <div className="label">Phòng</div>
                    <div className="stepper">
                        <button onClick={() => handleChange('rooms', -1)}>-</button>
                        <span>{guests.rooms}</span>
                        <button onClick={() => handleChange('rooms', 1)}>+</button>
                    </div>
                </div>
            </div>

            <div className="guest-row">
                <div className="label-stepper">
                    <div className="label">Người lớn</div>
                    <div className="stepper">
                        <button onClick={() => handleChange('adults', -1)}>-</button>
                        <span>{guests.adults}</span>
                        <button onClick={() => handleChange('adults', 1)}>+</button>
                    </div>
                </div>
                <div className="note">18 tuổi trở lên</div>
            </div>

            <div className="guest-row">
                <div className="label-stepper">
                    <div className="label">Trẻ em</div>
                    <div className="stepper">
                        <button onClick={() => handleChange('children', -1)}>-</button>
                        <span>{guests.children}</span>
                        <button onClick={() => handleChange('children', 1)}>+</button>
                    </div>
                </div>
                <div className="note">0-17 tuổi</div>
            </div>
        </div>
    );
}

export default GuestSelector;
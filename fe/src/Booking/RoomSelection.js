import React, { useState } from 'react';

const RoomSelection = ({ onRoomSelect, defaultDates = {} }) => {
    const [checkInDate, setCheckInDate] = useState(defaultDates.checkInDate || '');
    const [checkOutDate, setCheckOutDate] = useState(defaultDates.checkOutDate || '');

    const rooms = [
        {
            id: 1,
            type: "Deluxe Ocean View",
            capacity: "2 adults, 1 child",
            price: "1.200.000 đ/night",
            amenities: ["Ocean view", "King bed", "Free Wi-Fi", "Breakfast included"],
        },
        {
            id: 2,
            type: "Superior Room",
            capacity: "2 adults",
            price: "900.000 đ/night",
            amenities: ["City view", "Queen bed", "Free Wi-Fi"],
        },
        {
            id: 3,
            type: "Family Suite",
            capacity: "4 adults, 2 children",
            price: "2.500.000 đ/night",
            amenities: ["Two bedrooms", "Ocean view", "Free Wi-Fi", "Breakfast included"],
        },
    ];

    const handleBookRoom = (room) => {
        if (!checkInDate || !checkOutDate) {
            alert('Please select check-in and check-out dates.');
            return;
        }
        onRoomSelect({
            roomType: room.type,
            price: room.price,
            checkInDate,
            checkOutDate,
            capacity: room.capacity,
            amenities: room.amenities,
        });
    };

    return (
        <div className="max-w-[1140px] mx-auto p-6">
            <div className="mb-6 flex space-x-4">
                <div className="w-1/2">
                    <label className="block text-lg font-medium text-gray-700">Check-in Date</label>
                    <input
                        type="date"
                        value={checkInDate}
                        onChange={(e) => setCheckInDate(e.target.value)}
                        min={new Date().toISOString().split('T')[0]}
                        className="mt-1 block w-full border rounded-md p-2 border-gray-300"
                    />
                </div>
                <div className="w-1/2">
                    <label className="block text-lg font-medium text-gray-700">Check-out Date</label>
                    <input
                        type="date"
                        value={checkOutDate}
                        onChange={(e) => setCheckOutDate(e.target.value)}
                        min={checkInDate || new Date().toISOString().split('T')[0]}
                        className="mt-1 block w-full border rounded-md p-2 border-gray-300"
                    />
                </div>
            </div>

            <div className="space-y-6">
                <h2 className="text-2xl font-bold">Select Your Room</h2>
                {rooms.map((room) => (
                    <div key={room.id} className="p-4 border rounded-lg shadow-sm hover:shadow-md">
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="text-xl font-semibold">{room.type}</h3>
                                <p className="text-gray-600">{room.capacity}</p>
                                <ul className="mt-2 list-disc list-inside text-gray-700">
                                    {room.amenities.map((amenity, index) => (
                                        <li key={index}>{amenity}</li>
                                    ))}
                                </ul>
                            </div>
                            <div className="text-right">
                                <p className="text-xl font-bold text-red-600">{room.price}</p>
                                <button
                                    onClick={() => handleBookRoom(room)}
                                    className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                                >
                                    Book Now
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RoomSelection;
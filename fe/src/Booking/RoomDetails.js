import React from 'react';

const RoomDetails = ({ roomData = {} }) => {
    const {
        roomType,
        price,
        checkInDate,
        checkOutDate,
        capacity,
        amenities = [],
        hotelName,
        hotelAddress
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
    const pricePerNight = price ? parseInt(price.replace(/[^0-9]/g, '')) : 0;
    const originalTotalPrice = pricePerNight * totalNights;
    const discount = originalTotalPrice * 0.15; // 55% discount as per the original RoomDetails
    const discountedTotalPrice = originalTotalPrice - discount;

    // Format date for display
    const formatDate = (dateString) => {
        if (!dateString) return 'Not selected';
        return new Date(dateString).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
    };

    return (
        <div className="max-w-md mx-auto space-y-4">
            {/* Property Info */}
            <div className="bg-white p-4 rounded-lg shadow-md">
                <div className="flex items-center justify-between">
                    <span className="bg-yellow-100 text-yellow-800 text-xs font-semibold px-2.5 py-0.5 rounded">New to Booking.com</span>
                    <button className="text-gray-500 hover:text-gray-700">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                             xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                  d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 20.364l-7.682-7.682a4.5 4.5 0 01-1.318-3.182z"></path>
                        </svg>
                    </button>
                </div>
                <h2 className="text-lg font-bold mt-2">{hotelName}</h2>
                <p className="text-sm text-gray-600">{hotelAddress}</p>
                <div className="flex items-center mt-2">
                    <span className="bg-blue-600 text-white text-xs font-semibold px-2.5 py-0.5 rounded">9.9</span>
                    <span className="ml-2 text-sm text-gray-600">Exceptional • 20 reviews</span>
                </div>
                <div className="flex items-center mt-2 text-sm text-gray-600">
                    <span className="mr-2">🅿 Parking</span>
                    {amenities.map((amenity, index) => (
                        <span key={index} className="mr-2">{amenity}</span>
                    ))}
                </div>
            </div>

            {/* Booking Details */}
            <div className="bg-white p-4 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold">Your booking details</h3>
                <div className="flex justify-between mt-2">
                    <div>
                        <p className="text-sm text-gray-600">Check-in</p>
                        <p className="font-medium">{formatDate(checkInDate)}</p>
                        <p className="text-sm text-gray-600">2:00 PM – 11:00 PM</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-600">Check-out</p>
                        <p className="font-medium">{formatDate(checkOutDate)}</p>
                        <p className="text-sm text-gray-600">12:00 AM – 12:00 PM</p>
                    </div>
                </div>
                <p className="mt-2 text-sm text-gray-600">Total length of stay:</p>
                <p className="font-medium">{totalNights} night{totalNights !== 1 ? 's' : ''}</p>
                <div className="mt-2">
                    <p className="text-sm text-gray-600">You selected</p>
                    <p className="font-medium">1 room ({roomType || 'Not selected'}) for {capacity || 'Not specified'}</p>
                    <button className="text-blue-500 text-sm hover:underline">Change your selection</button>
                </div>
            </div>

            {/* Price Summary */}
            <div className="bg-white p-4 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold">Your price summary</h3>
                <div className="mt-2">
                    <div className="flex justify-between text-sm">
                        <p>Original price</p>
                        <p>VND {originalTotalPrice.toLocaleString()}</p>
                    </div>
                    <div className="flex justify-between text-sm text-green-600">
                        <p>Limited-time Deal</p>
                        <p>-VND {discount.toLocaleString()}</p>
                    </div>
                    <p className="text-xs text-gray-600 mt-1">
                        You’re getting a discount because—for a limited time only—this property is offering reduced rates on rooms that match your search.
                    </p>
                    <div className="flex justify-between text-lg font-bold mt-4">
                        <p className="line-through text-gray-400">VND {originalTotalPrice.toLocaleString()}</p>
                        <p className="text-blue-600">VND {discountedTotalPrice.toLocaleString()}</p>
                    </div>
                    <p className="text-xs text-gray-600 mt-1">Includes taxes and fees</p>
                </div>
            </div>
        </div>
    );
};

export default RoomDetails;
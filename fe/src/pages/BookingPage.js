import React, { useState, useEffect } from 'react';
import axios from 'axios';
import HotelDetail from '../components/Booking/HotelDetail';
import BookingForm from '../components/Booking/BookingForm';
import LayoutContainer from '../components/Booking/LayoutContainer';
import RoomDetails from '../components/Booking/RoomDetails';
import PaymentForm from '../components/Booking/PaymentForm';
import ConfirmationPage from '../components/Booking/ConfirmationPage';
import BookingBreadcrumb from '../components/Booking/BookingBreadcrumb';
import '../components/Booking/global.scss';

const BookingPage = () => {
    const hotelId = 1; // Hardcode hotel ID to 1
    const [currentStep, setCurrentStep] = useState('hotel');
    const [selectedHotelId] = useState(hotelId);
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [selectedDates, setSelectedDates] = useState({ checkInDate: '', checkOutDate: '' });
    const [bookingData, setBookingData] = useState(null);
    const [paymentMethod, setPaymentMethod] = useState(null);
    const [hotelInfo, setHotelInfo] = useState(null);

    // Load hotel information
    useEffect(() => {
        if (hotelId) {
            axios.get(`/api/bookings/hotels/${hotelId}`)
                .then(res => {
                    setHotelInfo(res.data);
                })
                .catch(err => {
                    console.error('Error loading hotel:', err);
                });
        }
    }, [hotelId]);

    // Calculate total price
    const calculateTotalPrice = () => {
        if (!selectedRoom?.price || !selectedDates.checkInDate || !selectedDates.checkOutDate) return 0;
        
        // Parse price properly
        const parsePrice = (priceString) => {
            if (!priceString) return 0;
            const cleanPrice = priceString.toString().replace(/[^\d.]/g, '');
            return parseFloat(cleanPrice) || 0;
        };
        
        const pricePerNight = parsePrice(selectedRoom.price);
        const checkIn = new Date(selectedDates.checkInDate);
        const checkOut = new Date(selectedDates.checkOutDate);
        const nights = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));
        
        // Apply 10% discount like in RoomDetails
        const subtotal = pricePerNight * nights;
        return subtotal * 0.9; // 10% discount
    };

    // Step handlers
    const handleRoomSelect = (roomData) => {
        setSelectedRoom(roomData);
        setSelectedDates({
            checkInDate: roomData.checkInDate,
            checkOutDate: roomData.checkOutDate
        });
        setCurrentStep('booking');
    };

    const handleBookingSuccess = (bookingResponse, bookingPayload) => {
        const finalBookingData = { ...bookingPayload, ...bookingResponse };
        setBookingData(finalBookingData);

        // Merge ngày nhận/trả phòng và các trường cần thiết vào roomData
        const fullRoomData = {
            ...selectedRoom,
            checkInDate: selectedDates.checkInDate,
            checkOutDate: selectedDates.checkOutDate,
            hotelName: hotelInfo?.name || selectedRoom.hotelName,
            hotelId: hotelInfo?.id || selectedRoom.hotelId,
            // Thêm các trường khác nếu cần
        };

        localStorage.setItem('bookingData', JSON.stringify(finalBookingData));
        localStorage.setItem('roomData', JSON.stringify(fullRoomData));
        setCurrentStep('payment');
    };

    const handlePaymentConfirm = (method) => {
        setPaymentMethod(method);
        setCurrentStep('confirm');
    };

    return (
        <>
            <BookingBreadcrumb currentStep={currentStep} setCurrentStep={setCurrentStep} />

            {currentStep === 'confirm' && (
                <ConfirmationPage
                    bookingData={bookingData}
                    roomData={selectedRoom}
                    paymentMethod={paymentMethod}
                />
            )}

            {currentStep === 'payment' && (
                <LayoutContainer
                    leftComponent={
                        <PaymentForm
                            bookingData={bookingData}
                            roomData={selectedRoom}
                            onPaymentConfirm={handlePaymentConfirm}
                            totalPrice={calculateTotalPrice()}
                        />
                    }
                    rightComponent={<RoomDetails roomData={selectedRoom} hotelInfo={hotelInfo} />}
                />
            )}

            {currentStep === 'booking' && (
                <LayoutContainer
                    leftComponent={
                        <BookingForm
                            roomId={selectedRoom?.roomId}
                            checkInDate={selectedDates.checkInDate}
                            checkOutDate={selectedDates.checkOutDate}
                            onBookingSuccess={handleBookingSuccess}
                        />
                    }
                    rightComponent={<RoomDetails roomData={selectedRoom} hotelInfo={hotelInfo} />}
                />
            )}

            {currentStep === 'hotel' && selectedHotelId && (
                <HotelDetail
                    hotelId={selectedHotelId}
                    onRoomSelect={handleRoomSelect}
                    defaultDates={selectedDates}
                />
            )}
        </>
    );
};

export default BookingPage;

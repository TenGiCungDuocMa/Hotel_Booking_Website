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
import { useParams } from 'react-router-dom';

const BookingPage = () => {
    const { hotelId } = useParams();
    const [currentStep, setCurrentStep] = useState('hotel');
    const [selectedHotelId] = useState(hotelId);
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [selectedDates, setSelectedDates] = useState({ checkInDate: '', checkOutDate: '' });
    const [bookingData, setBookingData] = useState(null);
    const [paymentMethod, setPaymentMethod] = useState(null);

    // Calculate total price
    const calculateTotalPrice = () => {
        if (!selectedRoom?.pricePerNight || !selectedDates.checkInDate || !selectedDates.checkOutDate) return 0;
        const pricePerNight = parseInt(selectedRoom.pricePerNight);
        const checkIn = new Date(selectedDates.checkInDate);
        const checkOut = new Date(selectedDates.checkOutDate);
        const nights = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));
        return pricePerNight * nights;
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
        setBookingData({ ...bookingPayload, ...bookingResponse });
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
                    rightComponent={<RoomDetails roomData={selectedRoom} />}
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
                    rightComponent={<RoomDetails roomData={selectedRoom} />}
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

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
import Header from "../components/Header";
import Footer from "../components/Footer";

const BookingPage = () => {
    const banners = [
        "/bg_1.jpg", "/bg_2.jpg", "/bg_4.jpg"
    ];
    const titles1 = [
        "More than a hotel... an experience",
        "Where luxury meets comfort",
        "Unwind in style and elegance"
    ];
    const titles2 = [
        "Discover the perfect blend of luxury and comfort",
        "Experience the ultimate in hospitality",
        "Your dream vacation starts here"
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);
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
            <Header/>
            <Header />
            <div className="banner" style={{ position: "relative", textAlign: "center" }}>
                <img
                    style={{
                        maxWidth: "100%",
                        filter: "brightness(55%)",
                        height: "auto"
                    }}
                    src={banners[currentIndex]}
                    alt="BookingOT"
                />
                <div
                    className="banner-text"
                    style={{
                        position: "absolute",
                        left: "50%",
                        top: "35%",
                        transform: "translateX(-50%)",
                        textAlign: "center"
                    }}
                >
                    <h1
                        style={{
                            color: "#f1905b",
                            fontSize: "16px",
                            textTransform: "uppercase",
                            letterSpacing: "2px",
                            fontWeight: 700
                        }}
                    >
                        {titles1[currentIndex]}
                    </h1>
                    <h2
                        style={{
                            color: "white",
                            fontSize: "6vw",
                            fontWeight: 700,
                            lineHeight: 1
                        }}
                    >
                        {titles2[currentIndex]}
                    </h2>
                </div>
            </div>
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
                            roomData={selectedRoom}
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
            <Footer/>
        </>
    );
};

export default BookingPage;

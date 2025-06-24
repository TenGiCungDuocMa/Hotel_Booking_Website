import React, { useState } from 'react';
import HotelDetail from './HotelDetail';
import BookingForm from '../components/Form/BookingForm';
import LayoutContainer from '../components/LayoutContainer';
import RoomDetails from './RoomDetails';
import PaymentForm from '../components/Form/PaymentForm';
import ConfirmationPage from './ConfirmationPage';
import BookingBreadcrumb from '../components/BookingBreadcrumb'; // new!
import '../assets/style/global.scss';

const sampleHotelData = {
    title: "The Sóng Apartment Vũng Tàu - Green House",
    address: "No. 28, Thi Sách Street, The Sóng, Thắng Tam, Vũng Tàu, Việt Nam, 78000 - TRÊN BÃI BIỂN",
    description: "Cách Bãi Sau chưa đến 1 km, The Song Apartment Vũng Tàu có hồ bơi ngoài trời, khu vườn, điều hòa, ban công và Wi-Fi miễn phí. Chỗ đậu xe riêng có sẵn trong khuôn viên.\n" +
        "\n" +
        "Căn hộ có sân hiên, khu vực ghế ngồi, TV màn hình phẳng truyền hình vệ tinh, bếp đầy đủ tiện nghi gồm tủ lạnh và lò vi sóng, cùng phòng tắm riêng được trang bị vòi xịt/chậu rửa vệ sinh và đồ vệ sinh cá nhân miễn phí. Bếp và ấm đun nước đều được cung cấp.\n" +
        "\n" +
        "The Song Apartment Vũng Tàu có sân chơi trẻ em, cùng khu vực bãi biển riêng.\n" +
        "\n" +
        "Chỗ nghỉ cách Tượng Chúa Ki-tô 3.3 km. Sân bay Quốc tế Tân Sơn Nhất cách 101 km, đồng thời chỗ nghỉ có cung cấp dịch vụ đưa đón sân bay mất phí.",
    rating: "8.6",
    reviews: "2.205",
    price: "399.531 đ"
};

const BookingPage = () => {
    const [currentStep, setCurrentStep] = useState('hotel');
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [selectedDates, setSelectedDates] = useState({ checkInDate: '', checkOutDate: '' });
    const [bookingData, setBookingData] = useState(null);
    const [paymentMethod, setPaymentMethod] = useState(null);

    const calculateTotalPrice = () => {
        if (!selectedRoom?.price || !selectedDates.checkInDate || !selectedDates.checkOutDate) return 0;

        const pricePerNight = parseInt(selectedRoom.price.replace(/[^0-9]/g, ""));
        const checkIn = new Date(selectedDates.checkInDate);
        const checkOut = new Date(selectedDates.checkOutDate);
        const nights = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));

        return pricePerNight * nights;
    };

    const handleRoomSelect = (roomData) => {
        const fullRoomData = {
            ...roomData,
            hotelName: sampleHotelData.title,
            hotelAddress: sampleHotelData.address,
        };
        setSelectedRoom(fullRoomData);
        setSelectedDates({
            checkInDate: roomData.checkInDate,
            checkOutDate: roomData.checkOutDate
        });
        setCurrentStep('booking');
    };

    const handleBookingSubmit = (formData) => {
        setBookingData(formData);
        setCurrentStep('payment');
    };

    const handlePaymentConfirm = (method) => {
        setPaymentMethod(method);
        setCurrentStep('confirm');
    };

    return (
        <>
            {/* Breadcrumb bar ở đầu */}
            <BookingBreadcrumb currentStep={currentStep} setCurrentStep={setCurrentStep} />

            {/* Logic render các bước */}
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
                    rightComponent={<RoomDetails roomData={selectedRoom}
                    />}
                />
            )}

            {currentStep === 'booking' && (
                <LayoutContainer
                    leftComponent={<BookingForm onBookingSubmit={handleBookingSubmit} />}
                    rightComponent={<RoomDetails roomData={selectedRoom}
                    />}
                />
            )}

            {currentStep === 'hotel' && (
                <HotelDetail
                    {...sampleHotelData}
                    onRoomSelect={handleRoomSelect}
                    defaultDates={selectedDates}
                />
            )}
        </>
    );
};

export default BookingPage;

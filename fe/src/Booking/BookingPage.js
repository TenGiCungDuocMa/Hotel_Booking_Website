import React, { useState } from 'react';
import HotelDetail from './HotelDetail';
import BookingForm from './BookingForm';
import LayoutContainer from './LayoutContainer';
import RoomDetails from './RoomDetails';
import PaymentForm from './PaymentForm';
import ConfirmationPage from './ConfirmationPage';

const sampleHotelData = {
    title: "The Sóng Apartment Vũng Tàu - Green House",
    address: "No. 28, Thi Sách Street, The Sóng, Thắng Tam, Vũng Tàu, Việt Nam, 78000 - TRÊN BÃI BIỂN",
    description: "Hãy đến chuyến đi của quý khách có một khởi đầu tuyệt vời khi ở lại khách sạn này, " +
        "nơi có Wi-Fi miễn phí trong tất cả các phòng. Nằm ở vị trí trung tâm tại Thắng Tam của Vũng Tàu, " +
        "chỗ nghỉ này đặt quý khách ở gần các điểm thu hút và tùy chọn ăn uống thú vị. " +
        "Hãy nhớ đánh một chút thời gian để tham quan Hải đăng Vũng Tàu cũng như Bãi Trước gần đó. " +
        "Được xếp hạng 5 sao, chỗ nghỉ chất lượng cao này cho phép khách nghỉ sử dụng phòng tập và nhà hàng ngay trong khuôn viên.\n",
    rating: "8.6",
    reviews: "2.205",
    price: "399.531 đ"
};

const BookingPage = () => {
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [confirmationData, setConfirmationData] = useState(null);

    const [selectedDates, setSelectedDates] = useState({
        checkInDate: '',
        checkOutDate: ''
    });
    const handlePaymentConfirm = (paymentMethod) => {
        setConfirmationData({
            bookingData,
            roomData: selectedRoom,
            paymentMethod,
        });
    };

    const [bookingData, setBookingData] = useState(null); // 👉 lưu thông tin người dùng

    const handleRoomSelect = (roomData) => {
        setSelectedRoom({
            ...roomData,
            hotelName: sampleHotelData.title,
            hotelAddress: sampleHotelData.address,
        });

        setSelectedDates({
            checkInDate: roomData.checkInDate,
            checkOutDate: roomData.checkOutDate
        });
    };

    const handleBack = () => {
        setSelectedRoom(null);
        setBookingData(null);
    };

    const handleBookingSubmit = (formData) => {
        setBookingData(formData); // 👉 lưu thông tin booking để chuyển sang payment
    };

    return (
        <div>
            {confirmationData ? (
                <ConfirmationPage
                    bookingData={confirmationData.bookingData}
                    roomData={confirmationData.roomData}
                    paymentMethod={confirmationData.paymentMethod}
                />
            ) : selectedRoom ? (
                <div>
                    {!bookingData && (
                        <button
                            onClick={handleBack}
                            className="ml-8 mt-6 text-blue-600 hover:underline text-lg"
                        >
                            ← Quay lại chọn phòng
                        </button>
                    )}
                    <LayoutContainer
                        leftComponent={
                            bookingData ? (
                                <PaymentForm
                                    bookingData={bookingData}
                                    roomData={selectedRoom}
                                    onPaymentConfirm={handlePaymentConfirm}
                                />
                            ) : (
                                <BookingForm onBookingSubmit={handleBookingSubmit} />
                            )
                        }
                        rightComponent={<RoomDetails roomData={selectedRoom} />}
                    />
                </div>
            ) : (
                <HotelDetail
                    {...sampleHotelData}
                    onRoomSelect={handleRoomSelect}
                    defaultDates={selectedDates}
                />
            )}
        </div>
    );

};

export default BookingPage;

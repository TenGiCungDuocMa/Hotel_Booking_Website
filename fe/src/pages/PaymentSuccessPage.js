import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ConfirmationPage from '../components/Booking/ConfirmationPage';

const PaymentSuccessPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [bookingData, setBookingData] = useState(null);
    const [roomData, setRoomData] = useState(null);
    const [paymentMethod, setPaymentMethod] = useState('PayOS');
    const [transactionId, setTransactionId] = useState(null);
    const [paymentDescription, setPaymentDescription] = useState('');

    useEffect(() => {
        // Get transaction ID and orderCode/paymentDescription from URL parameters
        const urlParams = new URLSearchParams(location.search);
        const txId = urlParams.get('transactionId') || urlParams.get('txId') || urlParams.get('id');
        const orderCode = urlParams.get('orderCode') || '';
        if (txId) setTransactionId(txId);
        if (orderCode) {
            setPaymentDescription(orderCode);
            localStorage.setItem('paymentDescription', orderCode);
        } else {
            setPaymentDescription(localStorage.getItem('paymentDescription') || '');
        }

        // Get booking data from localStorage
        const storedBookingData = localStorage.getItem('bookingData');
        const storedRoomData = localStorage.getItem('roomData');
        if (storedBookingData && storedRoomData) {
            try {
                setBookingData(JSON.parse(storedBookingData));
                setRoomData(JSON.parse(storedRoomData));
            } catch (error) {
                console.error('Error parsing stored data:', error);
                navigate('/booking/1');
            }
        } else {
            // If no booking data, redirect to hotel detail
            navigate('/booking/1');
        }
    }, [navigate, location.search]);

    if (!bookingData || !roomData) {
        return (
            <div style={{
                minHeight: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontSize: '1.2rem',
                color: '#6b7280'
            }}>
                Loading...
            </div>
        );
    }

    return (
        <ConfirmationPage
            bookingData={bookingData}
            roomData={roomData}
            paymentMethod={paymentMethod}
            transactionId={transactionId}
            paymentDescription={paymentDescription}
        />
    );
};

export default PaymentSuccessPage; 
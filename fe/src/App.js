// App.jsx
import {Routes, Route, Navigate} from "react-router-dom";
import BookingPage from "./pages/BookingPage";
import CheckoutMessage from "./components/Booking/CheckoutMessage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import ManageBookingsPage from "./pages/ManageBookingsPage";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import Header from "./components/Header";
import React from "react";
import ReviewPage from "./pages/ReviewPage";
import PaymentSuccessPage from "./pages/PaymentSuccessPage";
import HotelDetail from "./components/Booking/HotelDetail";
import PaymentCancelPage from "./pages/PaymentCancelPage";
import ConfirmationPage from "./components/Booking/ConfirmationPage";
import AdminDashboard from "./pages/AdminDashboard";
import ReviewSpamPage from "./pages/ReviewSpamPage";


function App() {
    return (
        <Routes>
            {/*<UserList/>*/}
            <Route path="/" element={<Home />} />
            <Route path="/booking" element={<BookingPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/review" element={<ReviewPage />} />
            <Route path="/manager-booking" element={<ManageBookingsPage />} />
            <Route path="/payment-success" element={<CheckoutMessage />} />
            <Route path="/payment-cancel" element={<CheckoutMessage />} />
            <Route path="/booking/:hotelId" element={<BookingPage />} />
            <Route path="/booking/1" element={<BookingPage />} />
            <Route path="/booking/confirm" element={<ConfirmationPage />} />
            <Route path="/booking/checkout-message" element={<CheckoutMessage />} />
            <Route path="/booking/hotel/:hotelId" element={<HotelDetail />} />
            <Route path="/payment-success" element={<PaymentSuccessPage />} />
            <Route path="/payment-cancel" element={<PaymentCancelPage />} />

                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/admin/reviews/spam" element={<ReviewSpamPage />} />


                {/*<Route path="/" element={<Navigate to="/booking/1" replace />} />*/}
            {/*<Route path="*" element={<Navigate to="/booking" replace />} />*/}
        </Routes>
    );
}

export default App;

import { Routes, Route} from "react-router-dom";
import BookingPage from "./pages/BookingPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import ManageBookingsPage from "./pages/ManageBookingsPage";
import Home from "./pages/Home";
import React from "react";
import SearchBar from "./components/Form/SearchBar";
import ReviewPage from "./pages/ReviewPage";
import PaymentSuccessPage from "./pages/PaymentSuccessPage";
import HotelDetail from "./components/Booking/HotelDetail";
import PaymentCancelPage from "./pages/PaymentCancelPage";
import ConfirmationPage from "./components/Booking/ConfirmationPage";
import AdminDashboard from "./pages/AdminDashboard";
import ReviewSpamPage from "./pages/ReviewSpamPage";
import { getCurrentUser } from "./utils/auth";
import Policy from "./pages/Policy";

export default function App() {
    return (
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/booking" element={<BookingPage/>}/>
            <Route path="/register" element={<RegisterPage/>}/>
            <Route path="/login" element={<LoginPage/>}/>
            <Route path="/profile" element={<ProfilePage/>}/>
            <Route path="/review" element={<ReviewPage/>}/>
            <Route path="/manager-booking" element={<ManageBookingsPage role='user'/>}/>
            <Route path="/search" element={<SearchBar/>}/>
            <Route path="/booking/1" element={<BookingPage/>}/>
            <Route path="/booking/confirm" element={<ConfirmationPage/>}/>
            <Route path="/booking/hotel/:hotelId" element={<HotelDetail/>}/>
            <Route path="/payment-success" element={<PaymentSuccessPage/>}/>
            <Route path="/payment-cancel" element={<PaymentCancelPage/>}/>
            <Route path="/admin" element={<AdminDashboard/>}/>
            <Route path="/admin/reviews/spam" element={<ReviewSpamPage/>}/>
                <Route path="/policy" element={<Policy/>}/>
        </Routes>
    );
}

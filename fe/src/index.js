import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import BookingPage from "./pages/BookingPage";
import ConfirmationPage from "./components/Booking/ConfirmationPage";
import CheckoutMessage from "./components/Booking/CheckoutMessage";
import HotelDetail from "./components/Booking/HotelDetail";
import PaymentSuccessPage from "./pages/PaymentSuccessPage";
import PaymentCancelPage from "./pages/PaymentCancelPage";
import Footer from "./components/Footer";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <BrowserRouter>
        <Routes>
            <Route path="/booking/:hotelId" element={<BookingPage />} />
            <Route path="/booking/1" element={<BookingPage />} />
            <Route path="/booking/confirm" element={<ConfirmationPage />} />
            <Route path="/booking/checkout-message" element={<CheckoutMessage />} />
            <Route path="/booking/hotel/:hotelId" element={<HotelDetail />} />
            <Route path="/payment-success" element={<PaymentSuccessPage />} />
            <Route path="/payment-cancel" element={<PaymentCancelPage />} />
            <Route path="/" element={<Navigate to="/booking/1" replace />} />
            {/*<Route path="*" element={<Navigate to="/booking" replace />} />*/}
        </Routes>
        <Footer />
    </BrowserRouter>
);

reportWebVitals();
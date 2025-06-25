import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import BookingPage from "./pages/BookingPage";
import ConfirmationPage from "./components/Booking/ConfirmationPage";
import CheckoutMessage from "./components/Booking/CheckoutMessage";
import HotelDetail from "./components/Booking/HotelDetail";
import Footer from "./components/Footer";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <BrowserRouter>
        <Routes>
            <Route path="/booking" element={<BookingPage />} />
            <Route path="/booking/confirm" element={<ConfirmationPage />} />
            <Route path="/booking/checkout-message" element={<CheckoutMessage />} />
            <Route path="/booking/hotel/:hotelId" element={<HotelDetail />} />
            <Route path="*" element={<Navigate to="/booking" replace />} />
        </Routes>
        <Footer />
    </BrowserRouter>
);

reportWebVitals();

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import BookingPage from "./pages/BookingPage";
import CheckoutMessage from "./components/Booking/CheckoutMessage"; // Component mới để xử lý callback
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from './App';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<BookingPage />} />
            <Route path="/payment-success" element={<CheckoutMessage />} />
            <Route path="/payment-cancel" element={<CheckoutMessage />} />
        </Routes>
    </BrowserRouter>
);

reportWebVitals();
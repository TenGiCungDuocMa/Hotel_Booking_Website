// App.jsx
import { Routes, Route } from "react-router-dom";
import BookingPage from "./pages/BookingPage";
import CheckoutMessage from "./components/CheckoutMessage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import ManageBookingsPage from "./pages/ManageBookingsPage";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import Header from "./components/Header";
import React from "react";
import SearchBar from "./components/Form/SearchBar";


function App() {
    return (
        <Routes>
            {/*<UserList/>*/}
            <Route path="/" element={<Home />} />
            <Route path="/booking" element={<BookingPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/manager-booking" element={<ManageBookingsPage />} />
            <Route path="/payment-success" element={<CheckoutMessage />} />
            <Route path="/payment-cancel" element={<CheckoutMessage />} />
            <Route path="/search" element={<SearchBar />} />
        </Routes>
    );
}

export default App;

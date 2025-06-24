// App.jsx
import { Routes, Route } from "react-router-dom";
import BookingPage from "./pages/BookingPage";
import CheckoutMessage from "./components/CheckoutMessage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import ManageBookingsPage from "./pages/ManageBookingsPage";

function App() {
    return (
        <Routes>

            {/*<UserList/>*/}
            {/*<Footer/>*/}
            <Route path="/" element={<BookingPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/manager-booking" element={<ManageBookingsPage />} />
            <Route path="/payment-success" element={<CheckoutMessage />} />
            <Route path="/payment-cancel" element={<CheckoutMessage />} />
        </Routes>
    );
}

export default App;

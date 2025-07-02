import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from "react-router-dom";
// import reportWebVitals from "./reportWebVitals";
// import BookingPage from "./pages/BookingPage";
// import CheckoutMessage from "./components/CheckoutMessage"; // Component mới để xử lý callback
import App from './App';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <BrowserRouter>
        {/*<Routes>*/}
        {/*    <Route path="/" element={<BookingPage />} />*/}
        {/*    <Route path="/payment-success" element={<CheckoutMessage />} />*/}
        {/*    <Route path="/payment-cancel" element={<CheckoutMessage />} />*/}
        {/*</Routes>*/}
        <App />
        <ToastContainer />

    </BrowserRouter>
);

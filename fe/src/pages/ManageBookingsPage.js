import React, {useEffect, useState} from "react";
import {getBookings, getAllBookings, updateBooking, getUserById, updateBookingAdmin} from "../services/bookingService";
import {toast} from "react-toastify";
import Header from "../components/Header";
import Footer from "../components/Footer";

const ManageBookingsPage = ({role}) => {
    const banners = [
        "/bg_1.jpg", "/bg_2.jpg", "/bg_4.jpg"
    ];
    const titles1 = [
        "More than a hotel... an experience",
        "Where luxury meets comfort",
        "Unwind in style and elegance"
    ];
    const titles2 = [
        "Discover the perfect blend of luxury and comfort",
        "Experience the ultimate in hospitality",
        "Your dream vacation starts here"
    ];
    const [currentIndex, setCurrentIndex] = useState(0);
    const [bookings, setBookings] = useState([]);
    const [userInfoMap, setUserInfoMap] = useState({});
    const [showMoreHotel, setShowMoreHotel] = useState({});
    const [showMoreRequest, setShowMoreRequest] = useState({});
    const maxLen = 30;

    const statusOptions = [
        "Pending",
        "Booked",
        "CheckIn",
        "CheckOut",
        "Complete",
        "Canceled"
    ];

    const fetchBookings = async () => {
        try {
            let data;
            if (role === "admin") {
                data = await getAllBookings();
                setBookings(data);
                // Fetch user info for all unique userIds
                const userIds = [...new Set(data.map(b => b.userId).filter(Boolean))];
                const userInfoResults = await Promise.all(userIds.map(id => getUserById(id)));
                const newMap = {};
                userIds.forEach((id, idx) => {
                    newMap[id] = userInfoResults[idx];
                });
                setUserInfoMap(newMap);
            } else {
                data = await getBookings();
                setBookings(data);
            }
        } catch (error) {
            toast.error("❌ Failed to load bookings");
        }
    };

    useEffect(() => {
        fetchBookings();
        // eslint-disable-next-line
    }, [role]);

    // For user: fetch missing user info if needed (legacy, can be skipped for admin)
    useEffect(() => {
        if (role === "admin") return;
        const fetchMissingUserInfo = async () => {
            const missingUserIds = bookings
                .filter(b => (!b.guestName || !b.phoneNumber) && b.userId && !userInfoMap[b.userId])
                .map(b => b.userId);
            const uniqueUserIds = [...new Set(missingUserIds)];
            if (uniqueUserIds.length === 0) return;
            const userInfoResults = await Promise.all(uniqueUserIds.map(id => getUserById(id)));
            const newMap = {...userInfoMap};
            uniqueUserIds.forEach((id, idx) => {
                newMap[id] = userInfoResults[idx];
            });
            setUserInfoMap(newMap);
        };
        if (bookings.length > 0) fetchMissingUserInfo();
        // eslint-disable-next-line
    }, [bookings, role]);

    const handleStatusChange = async (bookingId, status) => {
        try {
            await updateBookingAdmin(bookingId, status);
            setBookings(prev =>
                prev.map(b =>
                    b.bookingId === bookingId ? {...b, status} : b
                )
            );
            toast.success("✅ Status updated successfully");
        } catch (error) {
            toast.error("❌ Failed to update status");
        }
    };

    // Show more/less logic cho từng booking
    const renderShowMore = (text, showFull, setShowFull, key) => {
        if (!text) return <span className="text-muted">—</span>;
        if (text.length <= maxLen) return <span>{text}</span>;
        return (
            <span>
                {showFull[key] ? text : text.slice(0, maxLen) + "..."}
                <button
                    className="btn btn-link btn-sm p-0 ms-1"
                    style={{fontSize: "0.85em"}}
                    onClick={() => setShowFull(prev => ({...prev, [key]: !prev[key]}))}
                >
                    {showFull[key] ? "Ẩn bớt" : "Xem thêm"}
                </button>
            </span>
        );
    };

    // Sắp xếp bookings theo bookingId tăng dần
    const sortedBookings = [...bookings].sort((a, b) => a.bookingId - b.bookingId);

    // Returns valid next statuses for a given current status
    const getValidNextStatuses = (current) => {
        switch (current) {
            case "Pending":
                return ["Booked", "Canceled"];
            case "Booked":
                return ["CheckedIn", "Canceled"];
            case "CheckedIn":
                return ["CheckedOut"];
            case "CheckedOut":
                return ["Completed"];
            default:
                return [];
        }
    };

    return (
        <>
            {/*<Header/>*/}
            {/*<div className="banner" style={{position: "relative", textAlign: "center"}}>*/}
            {/*    <img*/}
            {/*        style={{*/}
            {/*            maxWidth: "100%",*/}
            {/*            filter: "brightness(55%)",*/}
            {/*            height: "auto"*/}
            {/*        }}*/}
            {/*        src={banners[currentIndex]}*/}
            {/*        alt="BookingOT"*/}
            {/*    />*/}
            {/*    <div*/}
            {/*        className="banner-text"*/}
            {/*        style={{*/}
            {/*            position: "absolute",*/}
            {/*            left: "50%",*/}
            {/*            top: "35%",*/}
            {/*            transform: "translateX(-50%)",*/}
            {/*            textAlign: "center"*/}
            {/*        }}*/}
            {/*    >*/}
            {/*        <h1*/}
            {/*            style={{*/}
            {/*                color: "#f1905b",*/}
            {/*                fontSize: "16px",*/}
            {/*                textTransform: "uppercase",*/}
            {/*                letterSpacing: "2px",*/}
            {/*                fontWeight: 700*/}
            {/*            }}*/}
            {/*        >*/}
            {/*            {titles1[currentIndex]}*/}
            {/*        </h1>*/}
            {/*        <h2*/}
            {/*            style={{*/}
            {/*                color: "white",*/}
            {/*                fontSize: "6vw",*/}
            {/*                fontWeight: 700,*/}
            {/*                lineHeight: 1*/}
            {/*            }}*/}
            {/*        >*/}
            {/*            {titles2[currentIndex]}*/}
            {/*        </h2>*/}
            {/*    </div>*/}
            {/*</div>*/}
            <div className="container py-5">
                <h2 className="text-center display-5 fw-bold text-primary mb-4">
                    <i className="bi bi-calendar-check-fill me-2"></i>
                    Manage Your Hotel Bookings
                    <div className="mx-auto mt-2" style={{
                        width: "80px",
                        height: "4px",
                        backgroundColor: "#fca311",
                        borderRadius: "10px"
                    }}></div>
                </h2>

                <div className="table-responsive shadow rounded-3 border">
                    <table className="table table-hover table-bordered align-middle mb-0">
                        <thead className="table-primary">
                        <tr>
                            <th>Order ID</th>
                            <th>Guest Name</th>
                            <th>Phone</th>
                            <th style={{width: 189}}>Hotel</th>
                            <th>Room</th>
                            <th>Check-in</th>
                            <th>Check-out</th>
                            <th>Status</th>
                            <th style={{width: 150}}>Special Request</th>
                        </tr>
                        </thead>
                        <tbody>
                        {sortedBookings.length > 0 ? (
                            sortedBookings.map((booking) => (
                                <tr key={booking.bookingId} style={{height: 65}}>
                                    <td>{booking.bookingId}</td>
                                    <td style={{backgroundColor: "#f8f9fa"}}>
                                        {role === "admin"
                                            ? (userInfoMap[booking.userId]?.fullName ||
                                                <span className="text-muted">—</span>)
                                            : (booking.userFullName || <span className="text-muted">—</span>)}
                                    </td>
                                    <td style={{backgroundColor: "#f8f9fa"}}>
                                        {role === "admin"
                                            ? (userInfoMap[booking.userId]?.phone ||
                                                <span className="text-muted">—</span>)
                                            : (booking.userPhone || <span className="text-muted">—</span>)}
                                    </td>
                                    <td style={{width: 189, maxWidth: 189, wordBreak: 'break-word'}}>
                                        <div className="fw-bold">{booking.hotelName}</div>
                                        <small className="text-muted">
                                            {role === "admin"
                                                ? (booking.hotelAddress ? renderShowMore(booking.hotelAddress, showMoreHotel, setShowMoreHotel, booking.bookingId) :
                                                    <span className="text-muted">456 Mountain Ave, Da Lat</span>)
                                                : renderShowMore(booking.hotelAddress, showMoreHotel, setShowMoreHotel, booking.bookingId)}
                                        </small>
                                    </td>
                                    <td>{booking.roomNumber}</td>
                                    <td>{booking.checkInDate}</td>
                                    <td>{booking.checkOutDate}</td>
                                    <td>
                                        <select
                                            className="form-select form-select-sm"
                                            value={booking.status}
                                            onChange={(e) => handleStatusChange(booking.bookingId, e.target.value)}
                                            disabled={getValidNextStatuses(booking.status).length === 0}
                                        >
                                            <option value={booking.status}>{booking.status}</option>
                                            {getValidNextStatuses(booking.status).map(option => (
                                                <option key={option} value={option}>
                                                    {option}
                                                </option>
                                            ))}
                                        </select>
                                    </td>
                                    <td style={{width: 150, maxWidth: 150, wordBreak: 'break-word'}}>
                                        {renderShowMore(booking.request, showMoreRequest, setShowMoreRequest, booking.bookingId)}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="9" className="text-muted py-4 text-center">
                                    No bookings found
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
            </div>
            {/*<Footer/>*/}
        </>
    )
        ;
};

export default ManageBookingsPage;
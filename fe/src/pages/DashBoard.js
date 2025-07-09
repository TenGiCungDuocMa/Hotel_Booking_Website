// import React, { useEffect, useState } from "react";
// import { FiDollarSign, FiShoppingBag, FiHome } from "react-icons/fi";
// import { getStatistics } from "../services/statisticsService";
// import "../assets/style/DashBoard.css";
//
// const DashboardPage = () => {
//     const [stats, setStats] = useState(null);
//     const [loading, setLoading] = useState(true);
//
//     useEffect(() => {
//         const fetchStats = async () => {
//             try {
//                 const data = await getStatistics();
//                 setStats(data);
//             } catch (error) {
//                 console.error("Error fetching statistics:", error);
//             } finally {
//                 setLoading(false);
//             }
//         };
//
//         fetchStats();
//     }, []);
//
//     if (loading) return <div className="text-center p-5">Loading...</div>;
//     if (!stats) return <div className="text-center p-5 text-danger">No data available</div>;
//
//     return (
//         <div className="dashboard-wrapper">
//             <div className="dashboard-container">
//                 <h1 className="dashboard-title">Dashboard Overview</h1>
//
//                 <div className="dashboard-cards">
//                     {/* Revenue */}
//                     <div className="card bg-orange">
//                         <div className="card-content">
//                             <FiDollarSign className="card-icon" size={32} />
//                             <div>
//                                 <p>Revenue</p>
//                                 <h2>{stats.totalRevenue?.toLocaleString()} VND</h2>
//                             </div>
//                         </div>
//                     </div>
//
//                     {/* Booking Orders */}
//                     <div className="card bg-green">
//                         <div className="card-content">
//                             <FiShoppingBag className="card-icon" size={32} />
//                             <div>
//                                 <p>Booking Orders</p>
//                                 <h2>{stats.totalBookings}</h2>
//                             </div>
//                         </div>
//                     </div>
//
//                     {/* Rooms Booked */}
//                     <div className="card bg-blue">
//                         <div className="card-content">
//                             <FiHome className="card-icon" size={32} />
//                             <div>
//                                 <p>Rooms Booked</p>
//                                 <h2>{stats.roomsBooked ?? "—"}</h2>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//
//                 {/* Recent Activity (giữ nguyên layout mẫu) */}
//                 <div className="dashboard-activity">
//                     <h3>Recent Activity</h3>
//                     <ul>
//                         <li>Customer A booked a VIP room</li>
//                         <li>Customer B completed payment</li>
//                         <li>Room 203 was checked out</li>
//                     </ul>
//                 </div>
//             </div>
//         </div>
//     );
// };
//
// export default DashboardPage;

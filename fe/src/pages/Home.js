import React, {useEffect, useRef, useState} from 'react';
import Header from "../components/Header";
import Footer from "../components/Footer";
import '../assets/style/Home.css';
import ReviewPage from "./ReviewPage";
import axios from 'axios';
import Lightbox from "yet-another-react-lightbox";
import 'yet-another-react-lightbox/styles.css';

const formatVND = (value) => {
  if (!value) return "0 ₫";
  let number = typeof value === "string" ? parseInt(value.replace(/[^0-9]/g, "")) : value;
  return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(number);
};

function Home() {
    const banners = [
        "/bg_1.jpg", "/bg_2.jpg", "/bg_4.jpg"
    ]
    const titles1 = [
        "More than a hotel... an experience",
        "Where luxury meets comfort",
        "Unwind in style and elegance"
    ]
    const titles2 = [
        "Discover the perfect blend of luxury and comfort",
        "Experience the ultimate in hospitality",
        "Your dream vacation starts here"
    ]
    const [currentIndex, setCurrentIndex] = useState(0);
    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex(prevIndex => (prevIndex + 1) % banners.length);
        }, 3000); // Change image every 3 seconds
        return () => clearInterval(interval); // Cleanup on unmount
    }, []);

    // Fetch rooms from hotel id 1
    useEffect(() => {
        axios.get('/api/bookings/hotels/1/rooms')
            .then(res => setRooms(res.data))
            .catch(err => {
                console.error('Error fetching rooms:', err);
                setRooms([]);
            });
    }, []);

    const scrollRef = useRef(null);

    const scroll = (direction) => {
        scrollRef.current.scrollBy({
            left: direction,
            behavior: 'smooth',
        });
    }
    const [open, setOpen] = useState(false);

    const slides = [
        {src: '/insta-1.jpg'},
        {src: '/insta-2.jpg'},
        {src: '/insta-3.jpg'},
        {src: '/insta-4.jpg'},
        {src: '/insta-5.jpg'},
    ];
    return (
        <div style={{
            backgroundColor: "#ffffff",
        }}>
            <Header/>
            <div className="banner">
                <img style={{
                    maxWidth: "-webkit-fill-available",
                    filter: "brightness(55%)"
                }} src={banners[currentIndex]} alt='BookingOT'/>
                <div className="banner-text" style={{
                    position: "absolute",
                    left: "46%",
                    top: "35%",
                }}>
                    <h1 style={{
                        color: "#f1905b",
                        fontSize: "16px",
                        textTransform: "uppercase",
                        letterSpacing: "2px",
                        fontWeight: 700
                    }}>{titles1[currentIndex]} </h1>
                    <h2 style={{
                        color: "white",
                        fontSize: "6vw",
                        fontWeight: 700,
                        lineHeight: 1
                    }}>{titles2[currentIndex]}</h2>
                </div>
            </div>
            <div className="container">
                <div className="row">
                    <p style={{
                        marginTop: "1rem",
                        textAlign: "center",
                        fontSize: "1rem",
                        color: "#4fa4e7",
                    }}>WELCOME TO BOOKINGOT HOTEL</p>
                </div>
                <div className="row">
                    <h1 style={{
                        textAlign: "center",
                        fontSize: "3.5rem",
                        fontWeight: 700,
                        color: "#f1905b",
                        marginBottom: "1rem"
                    }}>You'll Never Want To Leave</h1>
                </div>
                <div className="row" style={{
                    textAlign: "center",
                    marginTop: "3rem",
                    alignItems: "center",
                }}>
                    <div className="col mission" style={{
                        backgroundColor: "rgb(0, 0, 0,0.05)",
                        borderBottomRightRadius: "8px",
                        borderBottomLeftRadius: "8px",
                        padding: 0,
                        margin: "0 7.5px",
                        transition: "background-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease," +
                            "color 0.3s ease, filter 0.3s ease",
                    }}>
                        <div style={{
                            backgroundColor: "white",
                            padding: 25,
                            width: "fit-content",
                            borderRadius: "50%",
                            position: "relative",
                            left: "25%",
                            bottom: "2.5rem",
                        }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width={54} height={54} viewBox="0 0 24 24">
                                <path fill="currentColor" fillRule="evenodd"
                                      d="M11.25 6.022V4.5H9.5c-.41 0-.75-.34-.75-.75S9.09 3 9.5 3h5c.41 0 .75.34.75.75s-.34.75-.75.75h-1.75v1.522c4.076.349 7.42 3.509 7.929 7.628c.03.21.27.49.66.72c.61.4 1.02 1.03 1.14 1.72l.24.97a.754.754 0 0 1-.73.93l.01.01h-20a.754.754 0 0 1-.73-.93l.25-1.02c.11-.64.52-1.27 1.12-1.66c0 0 .01 0 .02-.01c.39-.24.63-.51.66-.73c.51-4.11 3.854-7.28 7.931-7.628M21.049 16.5H2.96l.028-.13c.05-.29.22-.54.47-.71c.8-.49 1.26-1.12 1.35-1.81c.45-3.61 3.54-6.34 7.2-6.34s6.75 2.72 7.2 6.34c.09.69.56 1.32 1.34 1.8c.25.16.42.42.48.76zm1.701 4.25c0 .41-.34.75-.75.75H2c-.41 0-.75-.34-.75-.75S1.59 20 2 20h20c.41 0 .75.34.75.75M20.5 9.5c-.28 0-.54-.15-.67-.42a.745.745 0 0 1 .34-1.01l1-.5c.37-.18.82-.04 1.01.34c.19.37.04.82-.34 1.01l-1 .5a.8.8 0 0 1-.33.08zm-2-2c-.11 0-.23-.03-.33-.08a.763.763 0 0 1-.34-1.01l.5-1c.19-.37.64-.52 1.01-.34c.37.19.52.64.34 1.01l-.5 1c-.13.26-.4.42-.67.42zM3.17 9.42c.1.05.22.08.33.08h.01c.27 0 .54-.16.67-.42c.18-.37.03-.82-.34-1.01l-1-.5a.763.763 0 0 0-1.01.34c-.18.37-.03.82.34 1.01zm1.66-2.34c.13.27.39.42.67.42h.01a.8.8 0 0 0 .33-.08c.38-.19.53-.64.34-1.01l-.5-1a.745.745 0 0 0-1.01-.34c-.38.19-.53.64-.34 1.01z"
                                      color="#4fa4e7"></path>
                            </svg>
                        </div>
                        <p>
                            Friendly Service
                        </p>
                    </div>
                    <div className="col mission" style={{
                        backgroundColor: "rgb(0, 0, 0,0.05)",
                        borderBottomRightRadius: "8px",
                        borderBottomLeftRadius: "8px",
                        padding: 0,
                        margin: "0 7.5px",
                        transition: "background-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease," +
                            "color 0.3s ease, filter 0.3s ease",
                    }}>
                        <div style={{
                            backgroundColor: "white",
                            padding: 25,
                            width: "fit-content",
                            borderRadius: "50%",
                            position: "relative",
                            left: "25%",
                            bottom: "2.5rem",
                        }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width={54} height={54} viewBox="0 0 24 24">
                                <path fill="currentColor" fillRule="evenodd"
                                      d="M5.768 11.676c0 .41-.34.75-.75.75s-.75-.34-.75-.75c0-4.57 3.52-8.34 8-8.72v-.78c0-.41.34-.75.75-.75s.75.34.75.75v.78c4.48.38 8 4.15 8 8.72c0 .41-.34.75-.75.75s-.75-.34-.75-.75c0-4-3.25-7.25-7.25-7.25s-7.25 3.25-7.25 7.25m-1.751 1.75h17.96c.41 0 .75.34.75.75s-.34.75-.75.75h-1.67l-2.59 2.85c-1.14 1.24-1.74 1.89-2.56 2.28c-.83.4-1.73.46-3.37.56l-3.25.21c-.67.04-.98.07-1.19.16c-.2.09-.4.29-.9.79l-.93.93c-.15.15-.34.22-.53.22s-.38-.07-.53-.22a.754.754 0 0 1 0-1.06l.93-.93c.55-.55.88-.88 1.35-1.09c.46-.21.93-.25 1.72-.29l3.25-.21l.172-.012c1.386-.092 2.1-.14 2.648-.408c.552-.257 1.036-.785 1.99-1.826l.04-.044l1.74-1.91h-1.49l-1.57 1.57q-.085.08-.142.136a2 2 0 0 1-.158.144c-.42.37-.96.6-1.55.64c-.07.01-.18.01-.39.01h-3.5c-.41 0-.75-.34-.75-.75s.34-.75.75-.75h2.73c-.1-.49-.48-.87-.98-.97c-.12-.03-.35-.03-.74-.03h-.78c-.97 0-1.46 0-1.86.1c-.32.07-.6.19-.84.34c-.37.22-.71.56-1.4 1.25l-3.08 3.09c-.29.29-.77.29-1.06 0a.754.754 0 0 1 0-1.06l3.08-3.08c.25-.25.46-.46.65-.64h-1.2c-.41 0-.75-.34-.75-.75s.34-.75.75-.75m10.105 2.076l.065-.066l.51-.51h-1.24c.11.22.2.46.25.71c.02.05.03.11.03.16c.09-.05.17-.1.25-.17a1 1 0 0 0 .135-.124"
                                      color="#4fa4e7"></path>
                            </svg>
                        </div>
                        <p>
                            Get Breakfast
                        </p>
                    </div>
                    <div className="col mission" style={{
                        backgroundColor: "rgb(0, 0, 0,0.05)",
                        borderBottomRightRadius: "8px",
                        borderBottomLeftRadius: "8px",
                        padding: 0,
                        margin: "0 7.5px",
                        transition: "background-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease," +
                            "color 0.3s ease, filter 0.3s ease",
                    }}>
                        <div style={{
                            backgroundColor: "white",
                            padding: 25,
                            width: "fit-content",
                            borderRadius: "50%",
                            position: "relative",
                            left: "25%",
                            bottom: "2.5rem",
                        }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="54px" height="54px" viewBox="0 0 24 24">
                                <g fill="none" stroke="#4fa4e7" strokeWidth={1}>
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                          d="m2.993 6.881l1.741-3.88a2.24 2.24 0 0 1 2.1-1.454h8.841a2.24 2.24 0 0 1 2.1 1.454l1.742 3.882M1.549 13.294v1.692a1.493 1.493 0 1 0 2.986 0v-1.493"></path>
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                          d="M21.307 8.267a2.99 2.99 0 0 0-2.588-1.493H3.785A2.986 2.986 0 0 0 .8 9.76V12a1.493 1.493 0 0 0 1.493 1.493h5.973"></path>
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                          d="M17.227 22.452a5.973 5.973 0 1 0 0-11.945a5.973 5.973 0 0 0 0 11.945"></path>
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                          d="m19.89 14.743l-2.893 3.856a.748.748 0 0 1-1.126.08l-1.493-1.493"></path>
                                    <path d="M4.162 10.507a.373.373 0 1 1 0-.747m0 .747a.373.373 0 1 0 0-.747"></path>
                                </g>
                            </svg>
                        </div>
                        <p>
                            Transfer Services
                        </p>
                    </div>
                    <div className="col mission" style={{
                        backgroundColor: "rgb(0, 0, 0,0.05)",
                        borderBottomRightRadius: "8px",
                        borderBottomLeftRadius: "8px",
                        padding: 0,
                        margin: "0 7.5px",
                        transition: "background-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease," +
                            "color 0.3s ease, filter 0.3s ease",
                    }}>
                        <div style={{
                            backgroundColor: "white",
                            padding: 25,
                            width: "fit-content",
                            borderRadius: "50%",
                            position: "relative",
                            left: "25%",
                            bottom: "2.5rem",
                        }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="54px" height="54px" viewBox="0 0 50 50">
                                <path fill="#4fa4e7"
                                      d="M47.231 41H31v4h16.397A1.58 1.58 0 0 0 49 43.825v-.97S48.988 41 47.231 41m-2.245-.79A4.02 4.02 0 0 0 49 36.188c0-2.227-1.8-4.023-4.014-4.023a4.013 4.013 0 0 0-4.006 4.023c0 2.219 1.795 4.022 4.006 4.022M36.532 40c2.106 0 3.8-1.484 3.8-3.587c-.001-2.099-1.701-3.2-3.791-3.216L31 33.899V40zM18.523 13.933c2.459 0 4.448-2 4.448-4.467S20.982 5 18.523 5c-2.457 0-4.449 1.999-4.449 4.466s1.992 4.467 4.449 4.467m-4.542 14.456l-.04-.058l-2.016-4.694L11.922 33h6.025l1.316-1.4l-3.569-1.374c-.846-.318-1.447-1.038-1.713-1.837m1.277-.421c.195.438.556.793 1.01.956l6.877 2.549a1.74 1.74 0 0 0 2.294-.898a1.76 1.76 0 0 0-.896-2.311l-6.345-2.396l-1.96-4.701l1.278-.476l1.661 4.028L24 26.507v-4.922l2.56 1.523l1.276 6.428a1.737 1.737 0 0 0 2.218 1.084a1.76 1.76 0 0 0 1.075-2.229l-1.43-6.191a1.75 1.75 0 0 0-.562-.877c-.733-.812-4.44-4.957-4.704-5.234c-.387-.388-1.272-1.089-2.944-1.089h-6c-3.41 0-4.066 3.48-3.369 5.25zM30 34H2.967C1.983 34 1 34.555 1 35.776V45h29z"
                                      strokeWidth={0.7} stroke="#4fa4e7"></path>
                            </svg>
                        </div>
                        <p>
                            Suits & SPA
                        </p>
                    </div>
                    <div className="col mission" style={{
                        backgroundColor: "rgb(0, 0, 0,0.05)",
                        borderBottomRightRadius: "8px",
                        borderBottomLeftRadius: "8px",
                        padding: 0,
                        margin: "0 7.5px",
                        transition: "background-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease," +
                            "color 0.3s ease, filter 0.3s ease",
                    }}>
                        <div style={{
                            backgroundColor: "white",
                            padding: 25,
                            width: "fit-content",
                            borderRadius: "50%",
                            position: "relative",
                            left: "25%",
                            bottom: "2.5rem",
                        }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width={55} height={55} viewBox="0 0 24 24">
                                <path fill="#4fa4e7"
                                      d="M3 17.5V13q0-.444.256-.946T4 11.3V9q0-.846.577-1.423T6 7h4.5q.517 0 .883.213q.365.212.617.587q.252-.375.617-.587Q12.983 7 13.5 7H18q.846 0 1.423.577T20 9v2.3q.489.252.744.754q.256.502.256.946v4.5q0 .213-.144.356t-.357.144t-.356-.144T20 17.5V16H4v1.5q0 .213-.144.356T3.499 18t-.356-.144T3 17.5m9.5-6.5H19V9q0-.425-.288-.712T18 8h-4.5q-.425 0-.712.288T12.5 9zM5 11h6.5V9q0-.425-.288-.712T10.5 8H6q-.425 0-.712.288T5 9z"></path>
                            </svg>
                        </div>
                        <p>
                            Cozy Rooms
                        </p>
                    </div>
                </div>
            </div>
            <div className="container"
                 style={{
                     marginTop: "3rem",
                 }}
            >
                <div className="row">
                    <div className="col">
                        <div className="row">
                            <h5 style={{
                                fontSize: "15px",
                                color: "#4fa4e7",
                                marginBottom: "1rem",
                                letterSpacing: "2px",
                                fontWeight: 700,
                            }}>ABOUT BOOKINGOT HOTEL</h5>
                        </div>
                        <div className="row">
                            <h1 style={{
                                fontSize: "38px",
                                fontWeight: 700,
                                letterSpacing: "2px",
                                lineHeight: "50px",
                                marginBottom: "1rem",
                            }}>BookingOT Hotel is the Most Recommended Hotel All Over the World</h1>
                        </div>
                        <div className="row">
                            <p
                                style={
                                    {
                                        color: "#00000057",
                                        marginBottom: "1.5rem",
                                    }
                                }
                            >Far far away, behind the word mountains, far from the countries Vokalia
                                and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right
                                at
                                the coast of the Semantics, a large language ocean.</p>
                        </div>
                        <div className="row">
                            <button className="btn-reserve"
                                    style={
                                        {
                                            color: "rgb(255, 255, 255)",
                                            padding: "0.375rem 0.75rem",
                                            width: "fit-content",
                                            background: "rgb(241, 144, 91)",
                                            borderWidth: "1px",
                                            borderStyle: "solid",
                                            borderColor: "rgb(241, 144, 91)",
                                            borderRadius: "0.25rem",
                                            fontWeight: 400,
                                            textAlign: "center",
                                            verticalAlign: "middle",
                                            fontSize: "1rem",
                                            lineHeight: "1.5rem",
                                            transition: "" +
                                                "color 0.15s ease-in-out, " +
                                                "background-color 0.15s ease-in-out, " +
                                                "border-color 0.15s ease-in-out, " +
                                                "box-shadow 0.15s ease-in-out, " +
                                                "-webkit-box-shadow 0.15s ease-in-out",
                                        }
                                    }
                            >Reserve Your Room Now
                            </button>
                        </div>
                    </div>
                    <div className="col-4">
                        <img src="/about-1.jpg" alt=""
                             style={{
                                 width: "-webkit-fill-available",
                                 height: "-webkit-fill-available",
                                 borderRadius: "8px",
                             }}
                        />
                    </div>
                    <div className="col-4">
                        <img src="/about-2.jpg" alt=""
                             style={{
                                 width: "-webkit-fill-available",
                                 height: "-webkit-fill-available",
                                 borderRadius: "8px",
                             }}
                        />
                    </div>
                </div>
            </div>
            <div className="container" style={{
                marginTop: "3rem",
            }}>
                <div className="row">
                    <div className="col-5">
                        <img src="/testimony-img.jpg" alt=""
                             style={{
                                 width: "-webkit-fill-available",
                                 height: "-webkit-fill-available",
                                 borderRadius: "8px",
                             }}
                        />
                    </div>
                    <div className="col">
                        <div className="row">
                            <h4
                                style={{
                                    fontSize: "15px",
                                    color: "#4fa4e7",
                                    marginBottom: "1rem",
                                    letterSpacing: "2px",
                                    fontWeight: 700,
                                    textTransform: "uppercase",
                                    marginTop: "6rem",
                                }}
                            >Testimony</h4>
                        </div>
                        <div className="row">
                            <h2
                                style={{
                                    fontSize: "38px",
                                    fontWeight: 700,
                                    letterSpacing: "2px",
                                    lineHeight: "50px",
                                    marginBottom: "1rem",
                                }}
                            >Happy Customer</h2>
                        </div>
                        <div className="row">
                            <div className="row">
                                <p style={{
                                    color: "#00000057",
                                    marginBottom: "1.5rem",
                                }}>Far far away, behind the word mountains, far from the countries Vokalia
                                    and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove
                                    right
                                    at
                                    the coast of the Semantics, a large language ocean.</p>
                            </div>
                            <div className="row">
                                <div className="col-2">
                                    <img src="/person_4.jpg" alt=""
                                         style={{
                                             width: "80px",
                                             height: "80px",
                                             borderRadius: "50%",
                                             boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
                                             backgroundSize: "cover",
                                             backgroundPosition: "center",

                                         }}
                                    />
                                </div>
                                <div className="col">
                                    <div className="row">
                                        <h5 style={{
                                            fontSize: "20px",
                                            color: "rgb(241, 144, 91)",
                                            fontWeight: 700,
                                        }}>John Doe</h5>
                                    </div>
                                    <div className="row">
                                        <p style={{
                                            fontSize: "14px",
                                            color: "rgba(0, 0, 0, 0.3)",
                                            marginBottom: "0.5rem",
                                            textTransform: "uppercase",
                                            letterSpacing: "1px",
                                            fontWeight: 700,
                                        }}>Businessman</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container-fluid">
                <div className="row">
                    <p style={{
                        marginTop: "3rem",
                        textAlign: "center",
                        fontSize: "1rem",
                        color: "#4fa4e7",

                    }}>BOOKINGOT HOTEL ROOMS</p>
                </div>
                <div className="row">
                    <h1 style={{
                        textAlign: "center",
                        fontSize: "3.5rem",
                        fontWeight: 700,
                        color: "#f1905b",
                        marginBottom: "4rem"
                    }}>Hotel Master's Rooms</h1>
                </div>
                <div className="row">
                    <div className="col position-relative row_room">
                        <div className="col" style={{
                            paddingRight: 0,
                        }}>
                            <img src="/room-6.jpg" alt="" style={{
                                width: "100%",
                                height: "360px",
                                display: "block",
                            }}/>
                        </div>
                        <div style={{
                            display: "block",
                            position: "absolute",
                            left: "48.7%",
                            top: "50%",
                            width: "40px",
                            height: "40px",
                            backgroundColor: "#ffffff",
                            transform: "rotate(45deg)",
                            transition: "all 0.3s ease-in-out",
                        }} className="square"></div>
                        <div className="col details" style={{
                            textAlign: "center",
                            paddingTop: "2.5rem",
                            paddingLeft: 0,
                            transition: "all 0.3s ease-in-out",
                        }}>
                            <p style={{
                                display: "flex",
                                justifyContent: "center",
                                color: "#4fa4e7",
                            }} className="star_room">
                            <span>
                                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
                                    <path fill="currentColor"
                                          d="m12 17.27l4.15 2.51c.76.46 1.69-.22 1.49-1.08l-1.1-4.72l3.67-3.18c.67-.58.31-1.68-.57-1.75l-4.83-.41l-1.89-4.46c-.34-.81-1.5-.81-1.84 0L9.19 8.63l-4.83.41c-.88.07-1.24 1.17-.57 1.75l3.67 3.18l-1.1 4.72c-.2.86.73 1.54 1.49 1.08z"></path>
                                </svg>
                            </span>
                                <span>
                                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
                                    <path fill="currentColor"
                                          d="m12 17.27l4.15 2.51c.76.46 1.69-.22 1.49-1.08l-1.1-4.72l3.67-3.18c.67-.58.31-1.68-.57-1.75l-4.83-.41l-1.89-4.46c-.34-.81-1.5-.81-1.84 0L9.19 8.63l-4.83.41c-.88.07-1.24 1.17-.57 1.75l3.67 3.18l-1.1 4.72c-.2.86.73 1.54 1.49 1.08z"></path>
                                </svg>
                            </span>
                                <span>
                                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
                                    <path fill="currentColor"
                                          d="m12 17.27l4.15 2.51c.76.46 1.69-.22 1.49-1.08l-1.1-4.72l3.67-3.18c.67-.58.31-1.68-.57-1.75l-4.83-.41l-1.89-4.46c-.34-.81-1.5-.81-1.84 0L9.19 8.63l-4.83.41c-.88.07-1.24 1.17-.57 1.75l3.67 3.18l-1.1 4.72c-.2.86.73 1.54 1.49 1.08z"></path>
                                </svg>
                            </span>
                                <span>
                                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
                                    <path fill="currentColor"
                                          d="m12 17.27l4.15 2.51c.76.46 1.69-.22 1.49-1.08l-1.1-4.72l3.67-3.18c.67-.58.31-1.68-.57-1.75l-4.83-.41l-1.89-4.46c-.34-.81-1.5-.81-1.84 0L9.19 8.63l-4.83.41c-.88.07-1.24 1.17-.57 1.75l3.67 3.18l-1.1 4.72c-.2.86.73 1.54 1.49 1.08z"></path>
                                </svg>
                            </span>
                                <span>
                                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
                                    <path fill="currentColor"
                                          d="m12 17.27l4.15 2.51c.76.46 1.69-.22 1.49-1.08l-1.1-4.72l3.67-3.18c.67-.58.31-1.68-.57-1.75l-4.83-.41l-1.89-4.46c-.34-.81-1.5-.81-1.84 0L9.19 8.63l-4.83.41c-.88.07-1.24 1.17-.57 1.75l3.67 3.18l-1.1 4.72c-.2.86.73 1.54 1.49 1.08z"></path>
                                </svg>
                            </span>
                            </p>
                            <p style={{
                                display: "flex",
                                color: "#4fa4e7",
                                fontSize: "1.5rem",
                                justifyContent: "center",
                            }} className="price_room">
                                $120.00 &nbsp;
                                <p style={{
                                    color: "#00000057",
                                    fontSize: "1rem",
                                    marginTop: "0.5rem",
                                }} className="per_night">per night</p>
                            </p>
                            <h3>King Room</h3>
                            <button style={{
                                padding: "16px",
                                borderRadius: "5px",
                                border: "2px solid rgba(0, 0, 0, 0.1)",
                                backgroundColor: "white",
                                marginTop: "1rem",
                            }}>View Details
                                <svg xmlns="http://www.w3.org/2000/svg" width={16} height={9} viewBox="0 0 16 9">
                                    <path fill="currentColor"
                                          d="M12.5 5h-9c-.28 0-.5-.22-.5-.5s.22-.5.5-.5h9c.28 0 .5.22.5.5s-.22.5-.5.5"></path>
                                    <path fill="currentColor"
                                          d="M10 8.5a.47.47 0 0 1-.35-.15c-.2-.2-.2-.51 0-.71l3.15-3.15l-3.15-3.15c-.2-.2-.2-.51 0-.71s.51-.2.71 0l3.5 3.5c.2.2.2.51 0 .71l-3.5 3.5c-.1.1-.23.15-.35.15Z"></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div className="col position-relative row_room">
                        <div className="col" style={{
                            paddingRight: 0,
                        }}>
                            <img src="/room-1.jpg" alt="" style={{
                                width: "100%",
                                height: "360px",
                                display: "block",
                            }}/>
                        </div>
                        <div style={{
                            display: "block",
                            position: "absolute",
                            left: "48.7%",
                            top: "50%",
                            width: "40px",
                            height: "40px",
                            backgroundColor: "#ffffff",
                            transform: "rotate(45deg)",
                            transition: "all 0.3s ease-in-out",
                        }} className="square"></div>
                        <div className="col details" style={{
                            textAlign: "center",
                            paddingTop: "2.5rem",
                            paddingLeft: 0,
                            transition: "all 0.3s ease-in-out",
                        }}>
                            <p style={{
                                display: "flex",
                                justifyContent: "center",
                                color: "#4fa4e7",
                            }} className="star_room">
                            <span>
                                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
                                    <path fill="currentColor"
                                          d="m12 17.27l4.15 2.51c.76.46 1.69-.22 1.49-1.08l-1.1-4.72l3.67-3.18c.67-.58.31-1.68-.57-1.75l-4.83-.41l-1.89-4.46c-.34-.81-1.5-.81-1.84 0L9.19 8.63l-4.83.41c-.88.07-1.24 1.17-.57 1.75l3.67 3.18l-1.1 4.72c-.2.86.73 1.54 1.49 1.08z"></path>
                                </svg>
                            </span>
                                <span>
                                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
                                    <path fill="currentColor"
                                          d="m12 17.27l4.15 2.51c.76.46 1.69-.22 1.49-1.08l-1.1-4.72l3.67-3.18c.67-.58.31-1.68-.57-1.75l-4.83-.41l-1.89-4.46c-.34-.81-1.5-.81-1.84 0L9.19 8.63l-4.83.41c-.88.07-1.24 1.17-.57 1.75l3.67 3.18l-1.1 4.72c-.2.86.73 1.54 1.49 1.08z"></path>
                                </svg>
                            </span>
                                <span>
                                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
                                    <path fill="currentColor"
                                          d="m12 17.27l4.15 2.51c.76.46 1.69-.22 1.49-1.08l-1.1-4.72l3.67-3.18c.67-.58.31-1.68-.57-1.75l-4.83-.41l-1.89-4.46c-.34-.81-1.5-.81-1.84 0L9.19 8.63l-4.83.41c-.88.07-1.24 1.17-.57 1.75l3.67 3.18l-1.1 4.72c-.2.86.73 1.54 1.49 1.08z"></path>
                                </svg>
                            </span>
                                <span>
                                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
                                    <path fill="currentColor"
                                          d="m12 17.27l4.15 2.51c.76.46 1.69-.22 1.49-1.08l-1.1-4.72l3.67-3.18c.67-.58.31-1.68-.57-1.75l-4.83-.41l-1.89-4.46c-.34-.81-1.5-.81-1.84 0L9.19 8.63l-4.83.41c-.88.07-1.24 1.17-.57 1.75l3.67 3.18l-1.1 4.72c-.2.86.73 1.54 1.49 1.08z"></path>
                                </svg>
                            </span>
                                <span>
                                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
                                    <path fill="currentColor"
                                          d="m12 17.27l4.15 2.51c.76.46 1.69-.22 1.49-1.08l-1.1-4.72l3.67-3.18c.67-.58.31-1.68-.57-1.75l-4.83-.41l-1.89-4.46c-.34-.81-1.5-.81-1.84 0L9.19 8.63l-4.83.41c-.88.07-1.24 1.17-.57 1.75l3.67 3.18l-1.1 4.72c-.2.86.73 1.54 1.49 1.08z"></path>
                                </svg>
                            </span>
                            </p>
                            <p style={{
                                display: "flex",
                                color: "#4fa4e7",
                                fontSize: "1.5rem",
                                justifyContent: "center",
                            }} className="price_room">
                                $120.00 &nbsp;
                                <p style={{
                                    color: "#00000057",
                                    fontSize: "1rem",
                                    marginTop: "0.5rem",
                                }} className="per_night">per night</p>
                            </p>
                            <h3>Suite Room</h3>
                            <button style={{
                                padding: "16px",
                                borderRadius: "5px",
                                border: "2px solid rgba(0, 0, 0, 0.1)",
                                backgroundColor: "white",
                                marginTop: "1rem",
                            }}>View Details
                                <svg xmlns="http://www.w3.org/2000/svg" width={16} height={9} viewBox="0 0 16 9">
                                    <path fill="currentColor"
                                          d="M12.5 5h-9c-.28 0-.5-.22-.5-.5s.22-.5.5-.5h9c.28 0 .5.22.5.5s-.22.5-.5.5"></path>
                                    <path fill="currentColor"
                                          d="M10 8.5a.47.47 0 0 1-.35-.15c-.2-.2-.2-.51 0-.71l3.15-3.15l-3.15-3.15c-.2-.2-.2-.51 0-.71s.51-.2.71 0l3.5 3.5c.2.2.2.51 0 .71l-3.5 3.5c-.1.1-.23.15-.35.15Z"></path>
                                </svg>
                            </button>
                        </div>
                    </div>

                </div>
                <div className="row">
                    <div className="col position-relative row_room">
                        <div style={{
                            display: "block",
                            position: "absolute",
                            left: "47%",
                            top: "50%",
                            width: "40px",
                            height: "40px",
                            backgroundColor: "#ffffff",
                            transform: "rotate(45deg)",
                            transition: "all 0.3s ease-in-out",
                        }} className="square"></div>
                        <div className="col details" style={{
                            textAlign: "center",
                            paddingTop: "2.5rem",
                            paddingLeft: 0,
                            transition: "all 0.3s ease-in-out",
                        }}>
                            <p style={{
                                display: "flex",
                                justifyContent: "center",
                                color: "#4fa4e7",
                            }} className="star_room">
                            <span>
                                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
                                    <path fill="currentColor"
                                          d="m12 17.27l4.15 2.51c.76.46 1.69-.22 1.49-1.08l-1.1-4.72l3.67-3.18c.67-.58.31-1.68-.57-1.75l-4.83-.41l-1.89-4.46c-.34-.81-1.5-.81-1.84 0L9.19 8.63l-4.83.41c-.88.07-1.24 1.17-.57 1.75l3.67 3.18l-1.1 4.72c-.2.86.73 1.54 1.49 1.08z"></path>
                                </svg>
                            </span>
                                <span>
                                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
                                    <path fill="currentColor"
                                          d="m12 17.27l4.15 2.51c.76.46 1.69-.22 1.49-1.08l-1.1-4.72l3.67-3.18c.67-.58.31-1.68-.57-1.75l-4.83-.41l-1.89-4.46c-.34-.81-1.5-.81-1.84 0L9.19 8.63l-4.83.41c-.88.07-1.24 1.17-.57 1.75l3.67 3.18l-1.1 4.72c-.2.86.73 1.54 1.49 1.08z"></path>
                                </svg>
                            </span>
                                <span>
                                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
                                    <path fill="currentColor"
                                          d="m12 17.27l4.15 2.51c.76.46 1.69-.22 1.49-1.08l-1.1-4.72l3.67-3.18c.67-.58.31-1.68-.57-1.75l-4.83-.41l-1.89-4.46c-.34-.81-1.5-.81-1.84 0L9.19 8.63l-4.83.41c-.88.07-1.24 1.17-.57 1.75l3.67 3.18l-1.1 4.72c-.2.86.73 1.54 1.49 1.08z"></path>
                                </svg>
                            </span>
                                <span>
                                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
                                    <path fill="currentColor"
                                          d="m12 17.27l4.15 2.51c.76.46 1.69-.22 1.49-1.08l-1.1-4.72l3.67-3.18c.67-.58.31-1.68-.57-1.75l-4.83-.41l-1.89-4.46c-.34-.81-1.5-.81-1.84 0L9.19 8.63l-4.83.41c-.88.07-1.24 1.17-.57 1.75l3.67 3.18l-1.1 4.72c-.2.86.73 1.54 1.49 1.08z"></path>
                                </svg>
                            </span>
                                <span>
                                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
                                    <path fill="currentColor"
                                          d="m12 17.27l4.15 2.51c.76.46 1.69-.22 1.49-1.08l-1.1-4.72l3.67-3.18c.67-.58.31-1.68-.57-1.75l-4.83-.41l-1.89-4.46c-.34-.81-1.5-.81-1.84 0L9.19 8.63l-4.83.41c-.88.07-1.24 1.17-.57 1.75l3.67 3.18l-1.1 4.72c-.2.86.73 1.54 1.49 1.08z"></path>
                                </svg>
                            </span>
                            </p>
                            <p style={{
                                display: "flex",
                                color: "#4fa4e7",
                                fontSize: "1.5rem",
                                justifyContent: "center",
                            }} className="price_room">
                                $120.00 &nbsp;
                                <p style={{
                                    color: "#00000057",
                                    fontSize: "1rem",
                                    marginTop: "0.5rem",
                                }} className="per_night">per night</p>
                            </p>
                            <h3>Family Room</h3>
                            <button style={{
                                padding: "16px",
                                borderRadius: "5px",
                                border: "2px solid rgba(0, 0, 0, 0.1)",
                                backgroundColor: "white",
                                marginTop: "1rem",
                            }}>View Details
                                <svg xmlns="http://www.w3.org/2000/svg" width={16} height={9} viewBox="0 0 16 9">
                                    <path fill="currentColor"
                                          d="M12.5 5h-9c-.28 0-.5-.22-.5-.5s.22-.5.5-.5h9c.28 0 .5.22.5.5s-.22.5-.5.5"></path>
                                    <path fill="currentColor"
                                          d="M10 8.5a.47.47 0 0 1-.35-.15c-.2-.2-.2-.51 0-.71l3.15-3.15l-3.15-3.15c-.2-.2-.2-.51 0-.71s.51-.2.71 0l3.5 3.5c.2.2.2.51 0 .71l-3.5 3.5c-.1.1-.23.15-.35.15Z"></path>
                                </svg>
                            </button>
                        </div>
                        <div className="col" style={{
                            paddingRight: 0,
                        }}>
                            <img src="/room-2.jpg" alt="" style={{
                                width: "100%",
                                height: "360px",
                                display: "block",
                            }}/>
                        </div>
                    </div>
                    <div className="col position-relative row_room">

                        <div style={{
                            display: "block",
                            position: "absolute",
                            left: "47%",
                            top: "50%",
                            width: "40px",
                            height: "40px",
                            backgroundColor: "#ffffff",
                            transform: "rotate(45deg)",
                            transition: "all 0.3s ease-in-out",
                        }} className="square"></div>
                        <div className="col details" style={{
                            textAlign: "center",
                            paddingTop: "2.5rem",
                            paddingLeft: 0,
                            transition: "all 0.3s ease-in-out",
                        }}>
                            <p style={{
                                display: "flex",
                                justifyContent: "center",
                                color: "#4fa4e7",
                            }} className="star_room">
                            <span>
                                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
                                    <path fill="currentColor"
                                          d="m12 17.27l4.15 2.51c.76.46 1.69-.22 1.49-1.08l-1.1-4.72l3.67-3.18c.67-.58.31-1.68-.57-1.75l-4.83-.41l-1.89-4.46c-.34-.81-1.5-.81-1.84 0L9.19 8.63l-4.83.41c-.88.07-1.24 1.17-.57 1.75l3.67 3.18l-1.1 4.72c-.2.86.73 1.54 1.49 1.08z"></path>
                                </svg>
                            </span>
                                <span>
                                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
                                    <path fill="currentColor"
                                          d="m12 17.27l4.15 2.51c.76.46 1.69-.22 1.49-1.08l-1.1-4.72l3.67-3.18c.67-.58.31-1.68-.57-1.75l-4.83-.41l-1.89-4.46c-.34-.81-1.5-.81-1.84 0L9.19 8.63l-4.83.41c-.88.07-1.24 1.17-.57 1.75l3.67 3.18l-1.1 4.72c-.2.86.73 1.54 1.49 1.08z"></path>
                                </svg>
                            </span>
                                <span>
                                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
                                    <path fill="currentColor"
                                          d="m12 17.27l4.15 2.51c.76.46 1.69-.22 1.49-1.08l-1.1-4.72l3.67-3.18c.67-.58.31-1.68-.57-1.75l-4.83-.41l-1.89-4.46c-.34-.81-1.5-.81-1.84 0L9.19 8.63l-4.83.41c-.88.07-1.24 1.17-.57 1.75l3.67 3.18l-1.1 4.72c-.2.86.73 1.54 1.49 1.08z"></path>
                                </svg>
                            </span>
                                <span>
                                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
                                    <path fill="currentColor"
                                          d="m12 17.27l4.15 2.51c.76.46 1.69-.22 1.49-1.08l-1.1-4.72l3.67-3.18c.67-.58.31-1.68-.57-1.75l-4.83-.41l-1.89-4.46c-.34-.81-1.5-.81-1.84 0L9.19 8.63l-4.83.41c-.88.07-1.24 1.17-.57 1.75l3.67 3.18l-1.1 4.72c-.2.86.73 1.54 1.49 1.08z"></path>
                                </svg>
                            </span>
                                <span>
                                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
                                    <path fill="currentColor"
                                          d="m12 17.27l4.15 2.51c.76.46 1.69-.22 1.49-1.08l-1.1-4.72l3.67-3.18c.67-.58.31-1.68-.57-1.75l-4.83-.41l-1.89-4.46c-.34-.81-1.5-.81-1.84 0L9.19 8.63l-4.83.41c-.88.07-1.24 1.17-.57 1.75l3.67 3.18l-1.1 4.72c-.2.86.73 1.54 1.49 1.08z"></path>
                                </svg>
                            </span>
                            </p>
                            <p style={{
                                display: "flex",
                                color: "#4fa4e7",
                                fontSize: "1.5rem",
                                justifyContent: "center",
                            }} className="price_room">
                                $120.00 &nbsp;
                                <p style={{
                                    color: "#00000057",
                                    fontSize: "1rem",
                                    marginTop: "0.5rem",
                                }} className="per_night">per night</p>
                            </p>
                            <h3>Deluxe Room</h3>
                            <button style={{
                                padding: "16px",
                                borderRadius: "5px",
                                border: "2px solid rgba(0, 0, 0, 0.1)",
                                backgroundColor: "white",
                                marginTop: "1rem",
                            }}>View Details
                                <svg xmlns="http://www.w3.org/2000/svg" width={16} height={9} viewBox="0 0 16 9">
                                    <path fill="currentColor"
                                          d="M12.5 5h-9c-.28 0-.5-.22-.5-.5s.22-.5.5-.5h9c.28 0 .5.22.5.5s-.22.5-.5.5"></path>
                                    <path fill="currentColor"
                                          d="M10 8.5a.47.47 0 0 1-.35-.15c-.2-.2-.2-.51 0-.71l3.15-3.15l-3.15-3.15c-.2-.2-.2-.51 0-.71s.51-.2.71 0l3.5 3.5c.2.2.2.51 0 .71l-3.5 3.5c-.1.1-.23.15-.35.15Z"></path>
                                </svg>
                            </button>
                        </div>
                        <div className="col" style={{
                            paddingRight: 0,
                        }}>
                            <img src="/room-3.jpg" alt="" style={{
                                width: "100%",
                                height: "360px",
                                display: "block",
                            }}/>
                        </div>
                    </div>

                </div>
                <div className="row">
                    <div className="col position-relative row_room">
                        <div className="col" style={{
                            paddingRight: 0,
                        }}>
                            <img src="/room-4.jpg" alt="" style={{
                                width: "100%",
                                height: "360px",
                                display: "block",
                            }}/>
                        </div>
                        <div style={{
                            display: "block",
                            position: "absolute",
                            left: "48.7%",
                            top: "50%",
                            width: "40px",
                            height: "40px",
                            backgroundColor: "#ffffff",
                            transform: "rotate(45deg)",
                            transition: "all 0.3s ease-in-out",
                        }} className="square"></div>
                        <div className="col details" style={{
                            textAlign: "center",
                            paddingTop: "2.5rem",
                            paddingLeft: 0,
                            transition: "all 0.3s ease-in-out",
                        }}>
                            <p style={{
                                display: "flex",
                                justifyContent: "center",
                                color: "#4fa4e7",
                            }} className="star_room">
                            <span>
                                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
                                    <path fill="currentColor"
                                          d="m12 17.27l4.15 2.51c.76.46 1.69-.22 1.49-1.08l-1.1-4.72l3.67-3.18c.67-.58.31-1.68-.57-1.75l-4.83-.41l-1.89-4.46c-.34-.81-1.5-.81-1.84 0L9.19 8.63l-4.83.41c-.88.07-1.24 1.17-.57 1.75l3.67 3.18l-1.1 4.72c-.2.86.73 1.54 1.49 1.08z"></path>
                                </svg>
                            </span>
                                <span>
                                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
                                    <path fill="currentColor"
                                          d="m12 17.27l4.15 2.51c.76.46 1.69-.22 1.49-1.08l-1.1-4.72l3.67-3.18c.67-.58.31-1.68-.57-1.75l-4.83-.41l-1.89-4.46c-.34-.81-1.5-.81-1.84 0L9.19 8.63l-4.83.41c-.88.07-1.24 1.17-.57 1.75l3.67 3.18l-1.1 4.72c-.2.86.73 1.54 1.49 1.08z"></path>
                                </svg>
                            </span>
                                <span>
                                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
                                    <path fill="currentColor"
                                          d="m12 17.27l4.15 2.51c.76.46 1.69-.22 1.49-1.08l-1.1-4.72l3.67-3.18c.67-.58.31-1.68-.57-1.75l-4.83-.41l-1.89-4.46c-.34-.81-1.5-.81-1.84 0L9.19 8.63l-4.83.41c-.88.07-1.24 1.17-.57 1.75l3.67 3.18l-1.1 4.72c-.2.86.73 1.54 1.49 1.08z"></path>
                                </svg>
                            </span>
                                <span>
                                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
                                    <path fill="currentColor"
                                          d="m12 17.27l4.15 2.51c.76.46 1.69-.22 1.49-1.08l-1.1-4.72l3.67-3.18c.67-.58.31-1.68-.57-1.75l-4.83-.41l-1.89-4.46c-.34-.81-1.5-.81-1.84 0L9.19 8.63l-4.83.41c-.88.07-1.24 1.17-.57 1.75l3.67 3.18l-1.1 4.72c-.2.86.73 1.54 1.49 1.08z"></path>
                                </svg>
                            </span>
                                <span>
                                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
                                    <path fill="currentColor"
                                          d="m12 17.27l4.15 2.51c.76.46 1.69-.22 1.49-1.08l-1.1-4.72l3.67-3.18c.67-.58.31-1.68-.57-1.75l-4.83-.41l-1.89-4.46c-.34-.81-1.5-.81-1.84 0L9.19 8.63l-4.83.41c-.88.07-1.24 1.17-.57 1.75l3.67 3.18l-1.1 4.72c-.2.86.73 1.54 1.49 1.08z"></path>
                                </svg>
                            </span>
                            </p>
                            <p style={{
                                display: "flex",
                                color: "#4fa4e7",
                                fontSize: "1.5rem",
                                justifyContent: "center",
                            }} className="price_room">
                                $120.00 &nbsp;
                                <p style={{
                                    color: "#00000057",
                                    fontSize: "1rem",
                                    marginTop: "0.5rem",
                                }} className="per_night">per night</p>
                            </p>
                            <h3>Luxury Room</h3>
                            <button style={{
                                padding: "16px",
                                borderRadius: "5px",
                                border: "2px solid rgba(0, 0, 0, 0.1)",
                                backgroundColor: "white",
                                marginTop: "1rem",
                            }}>View Details
                                <svg xmlns="http://www.w3.org/2000/svg" width={16} height={9} viewBox="0 0 16 9">
                                    <path fill="currentColor"
                                          d="M12.5 5h-9c-.28 0-.5-.22-.5-.5s.22-.5.5-.5h9c.28 0 .5.22.5.5s-.22.5-.5.5"></path>
                                    <path fill="currentColor"
                                          d="M10 8.5a.47.47 0 0 1-.35-.15c-.2-.2-.2-.51 0-.71l3.15-3.15l-3.15-3.15c-.2-.2-.2-.51 0-.71s.51-.2.71 0l3.5 3.5c.2.2.2.51 0 .71l-3.5 3.5c-.1.1-.23.15-.35.15Z"></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div className="col position-relative row_room">
                        <div className="col" style={{
                            paddingRight: 0,
                        }}>
                            <img src="/room-5.jpg" alt="" style={{
                                width: "100%",
                                height: "360px",
                                display: "block",
                            }}/>
                        </div>
                        <div style={{
                            display: "block",
                            position: "absolute",
                            left: "48.7%",
                            top: "50%",
                            width: "40px",
                            height: "40px",
                            backgroundColor: "#ffffff",
                            transform: "rotate(45deg)",
                            transition: "all 0.3s ease-in-out",
                        }} className="square"></div>
                        <div className="col details" style={{
                            textAlign: "center",
                            paddingTop: "2.5rem",
                            paddingLeft: 0,
                            transition: "all 0.3s ease-in-out",
                        }}>
                            <p style={{
                                display: "flex",
                                justifyContent: "center",
                                color: "#4fa4e7",
                            }} className="star_room">
                            <span>
                                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
                                    <path fill="currentColor"
                                          d="m12 17.27l4.15 2.51c.76.46 1.69-.22 1.49-1.08l-1.1-4.72l3.67-3.18c.67-.58.31-1.68-.57-1.75l-4.83-.41l-1.89-4.46c-.34-.81-1.5-.81-1.84 0L9.19 8.63l-4.83.41c-.88.07-1.24 1.17-.57 1.75l3.67 3.18l-1.1 4.72c-.2.86.73 1.54 1.49 1.08z"></path>
                                </svg>
                            </span>
                                <span>
                                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
                                    <path fill="currentColor"
                                          d="m12 17.27l4.15 2.51c.76.46 1.69-.22 1.49-1.08l-1.1-4.72l3.67-3.18c.67-.58.31-1.68-.57-1.75l-4.83-.41l-1.89-4.46c-.34-.81-1.5-.81-1.84 0L9.19 8.63l-4.83.41c-.88.07-1.24 1.17-.57 1.75l3.67 3.18l-1.1 4.72c-.2.86.73 1.54 1.49 1.08z"></path>
                                </svg>
                            </span>
                                <span>
                                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
                                    <path fill="currentColor"
                                          d="m12 17.27l4.15 2.51c.76.46 1.69-.22 1.49-1.08l-1.1-4.72l3.67-3.18c.67-.58.31-1.68-.57-1.75l-4.83-.41l-1.89-4.46c-.34-.81-1.5-.81-1.84 0L9.19 8.63l-4.83.41c-.88.07-1.24 1.17-.57 1.75l3.67 3.18l-1.1 4.72c-.2.86.73 1.54 1.49 1.08z"></path>
                                </svg>
                            </span>
                                <span>
                                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
                                    <path fill="currentColor"
                                          d="m12 17.27l4.15 2.51c.76.46 1.69-.22 1.49-1.08l-1.1-4.72l3.67-3.18c.67-.58.31-1.68-.57-1.75l-4.83-.41l-1.89-4.46c-.34-.81-1.5-.81-1.84 0L9.19 8.63l-4.83.41c-.88.07-1.24 1.17-.57 1.75l3.67 3.18l-1.1 4.72c-.2.86.73 1.54 1.49 1.08z"></path>
                                </svg>
                            </span>
                                <span>
                                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
                                    <path fill="currentColor"
                                          d="m12 17.27l4.15 2.51c.76.46 1.69-.22 1.49-1.08l-1.1-4.72l3.67-3.18c.67-.58.31-1.68-.57-1.75l-4.83-.41l-1.89-4.46c-.34-.81-1.5-.81-1.84 0L9.19 8.63l-4.83.41c-.88.07-1.24 1.17-.57 1.75l3.67 3.18l-1.1 4.72c-.2.86.73 1.54 1.49 1.08z"></path>
                                </svg>
                            </span>
                            </p>
                            <p style={{
                                display: "flex",
                                color: "#4fa4e7",
                                fontSize: "1.5rem",
                                justifyContent: "center",
                            }} className="price_room">
                                $120.00 &nbsp;
                                <p style={{
                                    color: "#00000057",
                                    fontSize: "1rem",
                                    marginTop: "0.5rem",
                                }} className="per_night">per night</p>
                            </p>
                            <h3>Superior Room</h3>
                            <button style={{
                                padding: "16px",
                                borderRadius: "5px",
                                border: "2px solid rgba(0, 0, 0, 0.1)",
                                backgroundColor: "white",
                                marginTop: "1rem",
                            }}>View Details
                                <svg xmlns="http://www.w3.org/2000/svg" width={16} height={9} viewBox="0 0 16 9">
                                    <path fill="currentColor"
                                          d="M12.5 5h-9c-.28 0-.5-.22-.5-.5s.22-.5.5-.5h9c.28 0 .5.22.5.5s-.22.5-.5.5"></path>
                                    <path fill="currentColor"
                                          d="M10 8.5a.47.47 0 0 1-.35-.15c-.2-.2-.2-.51 0-.71l3.15-3.15l-3.15-3.15c-.2-.2-.2-.51 0-.71s.51-.2.71 0l3.5 3.5c.2.2.2.51 0 .71l-3.5 3.5c-.1.1-.23.15-.35.15Z"></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

            </div>
            <div className="container-fluid">
                <div className="row">
                    <p style={{
                        marginTop: "3rem",
                        textAlign: "center",
                        fontSize: "1rem",
                        color: "#4fa4e7",
                        textTransform: "uppercase",
                    }}>Restaurant</p>
                </div>
                <div className="row">
                    <h1 style={{
                        textAlign: "center",
                        fontSize: "3.5rem",
                        fontWeight: 700,
                        color: "#f1905b",
                        marginBottom: "4rem"
                    }}>Restaurant</h1>
                </div>
                <div className='row'>
                    <div className="row">
                        <div className="col d-flex pie_home" style={{
                            transform: "translate3d(0px, 0px, 0px)",
                            opacity: 1,
                            visibility: "visible",
                            boxShadow: "0px 15px 24px 5px rgba(0, 0, 0, 0.18)",
                            borderRadius: "10px",
                            transition: "all 0.3s ease-in-out",
                            paddingLeft: 0,
                            margin: "15px",
                        }}>
                            <div className="col">
                                <img src="/menu-1.jpg" alt="" style={{
                                    width: "180px",
                                    height: "100%",
                                    borderBottomLeftRadius: "10px",
                                    borderTopLeftRadius: "10px",
                                }}/>
                            </div>
                            <div className="col">
                                <div className="row" style={{
                                    paddingTop: "2rem",
                                    paddingBottom: "2rem",
                                }}>
                                    <div className="col-7">
                                        <span style={{
                                            fontWeight: "500",
                                            fontSize: "20px",

                                        }}>Grilled Crab with Onion</span>
                                    </div>
                                    <div className="col">
                                        <span style={{
                                            width: "80px",
                                            color: "#2f89fc",
                                            textAlign: "right",
                                            fontSize: "20px",
                                            fontWeight: 600,
                                        }} className="pie_price">$20.00</span>
                                    </div>
                                </div>
                                <div className="row">
                                    <p style={{
                                        fontSize: "16px",
                                        lineHeight: "1.8",
                                        fontWeight: 400,
                                        color: "#999999",
                                    }} className="pie_des">A small river named Duden flows by their place and
                                        supplies</p>
                                </div>
                            </div>
                        </div>
                        <div className="col d-flex pie_home" style={{
                            transform: "translate3d(0px, 0px, 0px)",
                            opacity: 1,
                            visibility: "visible",
                            boxShadow: "0px 15px 24px 5px rgba(0, 0, 0, 0.18)",
                            borderRadius: "10px",
                            transition: "all 0.3s ease-in-out",
                            paddingLeft: 0,
                            margin: "15px",
                        }}>
                            <div className="col">
                                <img src="/menu-2.jpg" alt="" style={{
                                    width: "180px",
                                    height: "100%",
                                    borderBottomLeftRadius: "10px",
                                    borderTopLeftRadius: "10px",
                                }}/>
                            </div>
                            <div className="col">
                                <div className="row" style={{
                                    paddingTop: "2rem",
                                    paddingBottom: "2rem",
                                }}>
                                    <div className="col-7">
                                        <span style={{
                                            fontWeight: "500",
                                            fontSize: "20px",

                                        }}>Grilled Crab with Onion</span>
                                    </div>
                                    <div className="col">
                                        <span style={{
                                            width: "80px",
                                            color: "#2f89fc",
                                            textAlign: "right",
                                            fontSize: "20px",
                                            fontWeight: 600,
                                        }} className="pie_price">$20.00</span>
                                    </div>
                                </div>
                                <div className="row">
                                    <p style={{
                                        fontSize: "16px",
                                        lineHeight: "1.8",
                                        fontWeight: 400,
                                        color: "#999999",
                                    }} className="pie_des">A small river named Duden flows by their place and
                                        supplies</p>
                                </div>
                            </div>
                        </div>
                        <div className="col d-flex pie_home" style={{
                            transform: "translate3d(0px, 0px, 0px)",
                            opacity: 1,
                            visibility: "visible",
                            boxShadow: "0px 15px 24px 5px rgba(0, 0, 0, 0.18)",
                            borderRadius: "10px",
                            transition: "all 0.3s ease-in-out",
                            paddingLeft: 0,
                            margin: "15px",
                        }}>
                            <div className="col">
                                <img src="/menu-3.jpg" alt="" style={{
                                    width: "180px",
                                    height: "100%",
                                    borderBottomLeftRadius: "10px",
                                    borderTopLeftRadius: "10px",
                                }}/>
                            </div>
                            <div className="col">
                                <div className="row" style={{
                                    paddingTop: "2rem",
                                    paddingBottom: "2rem",
                                }}>
                                    <div className="col-7">
                                        <span style={{
                                            fontWeight: "500",
                                            fontSize: "20px",

                                        }}>Grilled Crab with Onion</span>
                                    </div>
                                    <div className="col">
                                        <span style={{
                                            width: "80px",
                                            color: "#2f89fc",
                                            textAlign: "right",
                                            fontSize: "20px",
                                            fontWeight: 600,
                                        }} className="pie_price">$20.00</span>
                                    </div>
                                </div>
                                <div className="row">
                                    <p style={{
                                        fontSize: "16px",
                                        lineHeight: "1.8",
                                        fontWeight: 400,
                                        color: "#999999",
                                    }} className="pie_des">A small river named Duden flows by their place and
                                        supplies</p>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
                <div className='row'>
                    <div className="row">
                        <div className="col d-flex pie_home" style={{
                            transform: "translate3d(0px, 0px, 0px)",
                            opacity: 1,
                            visibility: "visible",
                            boxShadow: "0px 15px 24px 5px rgba(0, 0, 0, 0.18)",
                            borderRadius: "10px",
                            transition: "all 0.3s ease-in-out",
                            paddingLeft: 0,
                            margin: "15px",
                        }}>
                            <div className="col">
                                <img src="/menu-4.jpg" alt="" style={{
                                    width: "180px",
                                    height: "100%",
                                    borderBottomLeftRadius: "10px",
                                    borderTopLeftRadius: "10px",
                                }}/>
                            </div>
                            <div className="col">
                                <div className="row" style={{
                                    paddingTop: "2rem",
                                    paddingBottom: "2rem",
                                }}>
                                    <div className="col-7">
                                        <span style={{
                                            fontWeight: "500",
                                            fontSize: "20px",

                                        }}>Grilled Crab with Onion</span>
                                    </div>
                                    <div className="col">
                                        <span style={{
                                            width: "80px",
                                            color: "#2f89fc",
                                            textAlign: "right",
                                            fontSize: "20px",
                                            fontWeight: 600,
                                        }} className="pie_price">$20.00</span>
                                    </div>
                                </div>
                                <div className="row">
                                    <p style={{
                                        fontSize: "16px",
                                        lineHeight: "1.8",
                                        fontWeight: 400,
                                        color: "#999999",
                                    }} className="pie_des">A small river named Duden flows by their place and
                                        supplies</p>
                                </div>
                            </div>
                        </div>
                        <div className="col d-flex pie_home" style={{
                            transform: "translate3d(0px, 0px, 0px)",
                            opacity: 1,
                            visibility: "visible",
                            boxShadow: "0px 15px 24px 5px rgba(0, 0, 0, 0.18)",
                            borderRadius: "10px",
                            transition: "all 0.3s ease-in-out",
                            paddingLeft: 0,
                            margin: "15px",
                        }}>
                            <div className="col">
                                <img src="/menu-5.jpg" alt="" style={{
                                    width: "180px",
                                    height: "100%",
                                    borderBottomLeftRadius: "10px",
                                    borderTopLeftRadius: "10px",
                                }}/>
                            </div>
                            <div className="col">
                                <div className="row" style={{
                                    paddingTop: "2rem",
                                    paddingBottom: "2rem",
                                }}>
                                    <div className="col-7">
                                        <span style={{
                                            fontWeight: "500",
                                            fontSize: "20px",

                                        }}>Grilled Crab with Onion</span>
                                    </div>
                                    <div className="col">
                                        <span style={{
                                            width: "80px",
                                            color: "#2f89fc",
                                            textAlign: "right",
                                            fontSize: "20px",
                                            fontWeight: 600,
                                        }} className="pie_price">$20.00</span>
                                    </div>
                                </div>
                                <div className="row">
                                    <p style={{
                                        fontSize: "16px",
                                        lineHeight: "1.8",
                                        fontWeight: 400,
                                        color: "#999999",
                                    }} className="pie_des">A small river named Duden flows by their place and
                                        supplies</p>
                                </div>
                            </div>
                        </div>
                        <div className="col d-flex pie_home" style={{
                            transform: "translate3d(0px, 0px, 0px)",
                            opacity: 1,
                            visibility: "visible",
                            boxShadow: "0px 15px 24px 5px rgba(0, 0, 0, 0.18)",
                            borderRadius: "10px",
                            transition: "all 0.3s ease-in-out",
                            paddingLeft: 0,
                            margin: "15px",
                        }}>
                            <div className="col">
                                <img src="/menu-6.jpg" alt="" style={{
                                    width: "180px",
                                    height: "100%",
                                    borderBottomLeftRadius: "10px",
                                    borderTopLeftRadius: "10px",
                                }}/>
                            </div>
                            <div className="col">
                                <div className="row" style={{
                                    paddingTop: "2rem",
                                    paddingBottom: "2rem",
                                }}>
                                    <div className="col-7">
                                        <span style={{
                                            fontWeight: "500",
                                            fontSize: "20px",

                                        }}>Grilled Crab with Onion</span>
                                    </div>
                                    <div className="col">
                                        <span style={{
                                            width: "80px",
                                            color: "#2f89fc",
                                            textAlign: "right",
                                            fontSize: "20px",
                                            fontWeight: 600,
                                        }} className="pie_price">$20.00</span>
                                    </div>
                                </div>
                                <div className="row">
                                    <p style={{
                                        fontSize: "16px",
                                        lineHeight: "1.8",
                                        fontWeight: 400,
                                        color: "#999999",
                                    }} className="pie_des">A small river named Duden flows by their place and
                                        supplies</p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <div className="row" style={{
                    justifyContent: "center",
                }}>
                    <button style={
                        {
                            color: "rgb(255, 255, 255)",
                            padding: "0.375rem 0.75rem",
                            width: "fit-content",
                            background: "rgb(241, 144, 91)",
                            borderWidth: "1px",
                            borderStyle: "solid",
                            borderColor: "rgb(241, 144, 91)",
                            borderRadius: "0.25rem",
                            fontWeight: 400,
                            textAlign: "center",
                            verticalAlign: "middle",
                            fontSize: "1rem",
                            lineHeight: "1.5rem",
                            transition: "" +
                                "color 0.15s ease-in-out, " +
                                "background-color 0.15s ease-in-out, " +
                                "border-color 0.15s ease-in-out, " +
                                "box-shadow 0.15s ease-in-out, " +
                                "-webkit-box-shadow 0.15s ease-in-out",
                        }
                    } className="btn-reserve">View All Menu
                    </button>
                </div>
            </div>
            <div className="container">
                <div className="row">
                    <p style={{
                        marginTop: "10rem",
                        textAlign: "center",
                        fontSize: "1rem",
                        color: "#4fa4e7",
                        textTransform: "uppercase",
                    }}>Read Blog</p>
                </div>
                <div className="row">
                    <h1 style={{
                        textAlign: "center",
                        fontSize: "3.5rem",
                        fontWeight: 700,
                        color: "#f1905b",
                        marginBottom: "4rem"
                    }}>Recent Blog</h1>
                </div>
                <div className="row">
                    <div className="col">
                        <div className="row">
                            <img src="/image_1.jpg" alt="" style={{
                                height: "250px",
                                borderRadius: "6%",
                            }}/>
                        </div>
                        <div className="row " style={{
                            textAlign: "center",
                            fontSize: "14px",
                            fontWeight: 500,
                            color: "#4fa4e7",
                            justifyContent: "center",
                            marginTop: "1.5rem",
                            marginBottom: "1.5rem",
                            transition: "all 0.3s ease-in-out",
                        }}>
                            <div className="col-3" style={{
                                padding: 0,
                            }}><a href="/" className="blog_text" style={{transition: "all 0.3s ease-in-out",}}>Oct. 30,
                                2019</a></div>
                            <div className="col-2" style={{
                                padding: 0,
                            }}><a href="/" className="blog_text" style={{transition: "all 0.3s ease-in-out",}}>Admin</a>
                            </div>
                            <div className="col-3" style={{
                                padding: 0,
                            }}><a href="/" className="blog_text" style={{transition: "all 0.3s ease-in-out",}}>
                                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
                                    <path fill="currentColor"
                                          d="M3 20.077V4.616q0-.691.463-1.153T4.615 3h14.77q.69 0 1.152.463T21 4.616v10.769q0 .69-.463 1.153T19.385 17H6.077zM6.5 13.5h7v-1h-7zm0-3h11v-1h-11zm0-3h11v-1h-11z"></path>
                                </svg>
                                3
                            </a></div>
                        </div>
                        <div className="row">
                            <div style={{
                                fontSize: "20px",
                                fontWeight: 600,
                                lineHeight: "1.5",
                                textAlign: "center",
                                transition: "all 0.3s ease-in-out",
                            }}><a href="/" style={{
                                color: "#000000",
                                transition: "all 0.3s ease-in-out",
                            }} className="blog_des">Even the all-powerful Pointing has no control about the blind
                                texts</a></div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="row">
                            <img src="/image_2.jpg" alt="" style={{
                                height: "250px",
                                borderRadius: "6%",
                            }}/>
                        </div>
                        <div className="row " style={{
                            textAlign: "center",
                            fontSize: "14px",
                            fontWeight: 500,
                            color: "#4fa4e7",
                            justifyContent: "center",
                            marginTop: "1.5rem",
                            marginBottom: "1.5rem",
                            transition: "all 0.3s ease-in-out",
                        }}>
                            <div className="col-3" style={{
                                padding: 0,
                            }}><a href="/" className="blog_text" style={{transition: "all 0.3s ease-in-out",}}>Oct. 30,
                                2019</a></div>
                            <div className="col-2" style={{
                                padding: 0,
                            }}><a href="/" className="blog_text" style={{transition: "all 0.3s ease-in-out",}}>Admin</a>
                            </div>
                            <div className="col-3" style={{
                                padding: 0,
                            }}><a href="/" className="blog_text" style={{transition: "all 0.3s ease-in-out",}}>
                                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
                                    <path fill="currentColor"
                                          d="M3 20.077V4.616q0-.691.463-1.153T4.615 3h14.77q.69 0 1.152.463T21 4.616v10.769q0 .69-.463 1.153T19.385 17H6.077zM6.5 13.5h7v-1h-7zm0-3h11v-1h-11zm0-3h11v-1h-11z"></path>
                                </svg>
                                3
                            </a></div>
                        </div>
                        <div className="row">
                            <div style={{
                                fontSize: "20px",
                                fontWeight: 600,
                                lineHeight: "1.5",
                                textAlign: "center",
                                transition: "all 0.3s ease-in-out",
                            }}><a href="/" style={{
                                color: "#000000",
                                transition: "all 0.3s ease-in-out",
                            }} className="blog_des">Even the all-powerful Pointing has no control about the blind
                                texts</a></div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="row">
                            <img src="/image_3.jpg" alt="" style={{
                                height: "250px",
                                borderRadius: "6%",
                            }}/>
                        </div>
                        <div className="row " style={{
                            textAlign: "center",
                            fontSize: "14px",
                            fontWeight: 500,
                            color: "#4fa4e7",
                            justifyContent: "center",
                            marginTop: "1.5rem",
                            marginBottom: "1.5rem",
                            transition: "all 0.3s ease-in-out",
                        }}>
                            <div className="col-3" style={{
                                padding: 0,
                            }}><a href="/" className="blog_text" style={{transition: "all 0.3s ease-in-out",}}>Oct. 30,
                                2019</a></div>
                            <div className="col-2" style={{
                                padding: 0,
                            }}><a href="/" className="blog_text" style={{transition: "all 0.3s ease-in-out",}}>Admin</a>
                            </div>
                            <div className="col-3" style={{
                                padding: 0,
                            }}><a href="/" className="blog_text" style={{transition: "all 0.3s ease-in-out",}}>
                                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
                                    <path fill="currentColor"
                                          d="M3 20.077V4.616q0-.691.463-1.153T4.615 3h14.77q.69 0 1.152.463T21 4.616v10.769q0 .69-.463 1.153T19.385 17H6.077zM6.5 13.5h7v-1h-7zm0-3h11v-1h-11zm0-3h11v-1h-11z"></path>
                                </svg>
                                3
                            </a></div>
                        </div>
                        <div className="row">
                            <div style={{
                                fontSize: "20px",
                                fontWeight: 600,
                                lineHeight: "1.5",
                                textAlign: "center",
                                transition: "all 0.3s ease-in-out",
                            }}><a href="/" style={{
                                color: "#000000",
                                transition: "all 0.3s ease-in-out",
                            }} className="blog_des">Even the all-powerful Pointing has no control about the blind
                                texts</a></div>
                        </div>
                    </div>

                </div>
            </div>
            <div className="container-fluid">
                <div className="row">
                    <p style={{
                        marginTop: "3rem",
                        textAlign: "center",
                        fontSize: "1rem",
                        color: "#4fa4e7",
                        textTransform: "uppercase",
                    }}>Photos</p>
                </div>
                <div className="row">
                    <h1 style={{
                        textAlign: "center",
                        fontSize: "3.5rem",
                        fontWeight: 700,
                        color: "#f1905b",
                        marginBottom: "4rem"
                    }}>Instagram</h1>
                </div>
                <div className="row">
                    <div className="col ins" style={{padding: 0, margin: 0}} onClick={() => setOpen(true)}>
                        <img src="/insta-1.jpg" alt="" style={{
                        height: "280px",
                        width: "100%",
                    }} className="w-96"/>
                    </div>

                    <div className="col ins" style={{padding: 0, margin: 0}} onClick={() => setOpen(true)}>
                        <img src="/insta-2.jpg" alt="" style={{
                            height: "280px",
                            width: "100%",
                        }} className="w-96"/></div>
                    <div className="col ins" style={{padding: 0, margin: 0}} onClick={() => setOpen(true)}>
                        <img src="/insta-3.jpg" alt="" style={{
                            height: "280px",
                            width: "100%",
                        }} className="w-96"/></div>
                    <div className="col ins" style={{padding: 0, margin: 0}} onClick={() => setOpen(true)}>
                        <img src="/insta-4.jpg" alt="" style={{
                            height: "280px",
                            width: "100%",
                        }} className="w-96"/></div>
                    <div className="col ins" style={{padding: 0, margin: 0}} onClick={() => setOpen(true)}>
                        <img src="/insta-5.jpg" alt="" style={{
                            height: "280px",
                            width: "100%",
                        }} className="w-96"/></div>
                    <Lightbox
                        open={open}
                        close={() => setOpen(false)}
                        slides={slides}
                    />
                </div>
            </div>
<ReviewPage />
            <Footer/>
        </div>
    );
}

export default Home;
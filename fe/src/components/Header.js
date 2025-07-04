import React, {useEffect, useState} from 'react';
import {NavLink} from 'react-router-dom';
import "../assets/style/Header.css";

function Header() {
    const [change, setChange] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        // Kiểm tra token/user trong localStorage
        const user = localStorage.getItem("token");
        setIsLoggedIn(!!user);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            setChange(window.scrollY > 700);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinkStyle = ({isActive}) => ({
        color: isActive ? '#c4784f' : 'inherit',
        textDecoration: 'none',
        backgroundColor: 'unset',
        border: 'unset',
        fontWeight: isActive ? '600' : 'normal',
    });

    return (
        <div>
            <div
                className={`${change ? 'container-fluid show header-transition' : 'container'} z-3 fixed-top `}
                style={{
                    backgroundColor: change ? 'white' : 'transparent',
                    boxShadow: change && "rgb(0 0 0 / 12%) 0px 0px 10px 5px",
                }}
            >
                <div className="row">
                    <div
                        className="row align-items-center"
                        style={{
                            color: change ? 'black' : 'white',
                            textAlign: 'center',
                        }}
                    >
                        <div
                            className="col"
                            style={{
                                fontWeight: 700,
                                fontSize: '24px',
                            }}
                        >
                            <p
                                className="d-flex"
                                style={{
                                    margin: 0,
                                    paddingTop: '15px',
                                    paddingLeft: '25%',
                                }}
                            >
                                Booking
                                <p style={{color: '#f5e4c3'}}>O</p>
                                <p style={{color: '#c4784f'}}>T</p>
                            </p>
                        </div>

                        <div className="col">
                            <div
                                className="row"
                                style={{
                                    fontSize: '14px',
                                    paddingTop: '15px',
                                }}
                            >
                                <div className="col navi">
                                    <NavLink to="/" style={navLinkStyle}>
                                        Home
                                    </NavLink>
                                </div>
                                <div className="col-3 navi">
                                    <NavLink to="/booking/1" style={navLinkStyle}>
                                        Our Rooms
                                    </NavLink>
                                </div>
                                <div className="col-2 navi">
                                    <NavLink to="/about" style={navLinkStyle}>
                                        About Us
                                    </NavLink>
                                </div>
                                {/*<div className="col navi">*/}
                                {/*    <NavLink to="/blog" style={navLinkStyle}>*/}
                                {/*        Blog*/}
                                {/*    </NavLink>*/}
                                {/*</div>*/}
                                {/*<div className="col navi">*/}
                                {/*    <NavLink to="/contact" style={navLinkStyle}>*/}
                                {/*        Contact*/}
                                {/*    </NavLink>*/}
                                {/*</div>*/}
                                <div className="col navi">
                                    <NavLink to="/review" style={navLinkStyle}>
                                        Review
                                    </NavLink>
                                </div>

                                <div className="col d-flex align-items-center justify-content-center gap-3" >
                                    {isLoggedIn ? (
                                        <>
                                            <div className="col navi">
                                                <NavLink to="/manager-booking" style={navLinkStyle} className="profile">
                                                    Manager Booking
                                                </NavLink>
                                            </div>
                                            <div className="col navi">
                                                <NavLink to="/profile" style={navLinkStyle} className="profile">
                                                    Profile
                                                </NavLink>
                                            </div>
                                            <div className="col navi">
                                                <NavLink style={navLinkStyle}
                                                         onClick={() => {
                                                             localStorage.removeItem("user");
                                                             localStorage.removeItem("token");
                                                             setIsLoggedIn(false);
                                                             window.location.href = "/login";
                                                         }}
                                                         className="logout"
                                                >
                                                    Logout
                                                </NavLink>
                                            </div>
                                        </>
                                    ) : (
                                        <div className="col navi">
                                            <NavLink to="/login" style={navLinkStyle}>
                                                Login
                                            </NavLink>
                                        </div>
                                    )}
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;

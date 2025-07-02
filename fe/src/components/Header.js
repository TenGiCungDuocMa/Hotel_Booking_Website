import React, {useEffect, useState} from 'react';
import {NavLink} from 'react-router-dom';
import "../assets/style/Header.css";

function Header() {
    const [change, setChange] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 700) {
                setChange(true);
            } else {
                setChange(false);
            }
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
                                    <NavLink to="/booking" style={navLinkStyle}>
                                        Our Rooms
                                    </NavLink>
                                </div>
                                <div className="col-2 navi">
                                    <NavLink to="/about" style={navLinkStyle}>
                                        About Us
                                    </NavLink>
                                </div>
                                <div className="col navi">
                                    <NavLink to="/blog" style={navLinkStyle}>
                                        Blog
                                    </NavLink>
                                </div>
                                <div className="col navi">
                                    <NavLink to="/contact" style={navLinkStyle}>
                                        Contact
                                    </NavLink>
                                </div>
                                <div className="col navi">
                                    <NavLink to="/profile" style={navLinkStyle}

                                    >
                                        Profile
                                    </NavLink>
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

import React from 'react';
// import "../assets/style/Footer.css";
import HotelMap from "./HotelMap";

const Footer = () => {

    return (

        <footer style={{
            background: 'linear-gradient(rgba(0, 119, 255, 0.2),rgba(0, 119, 255, 0.2)), url("/bg_4.jpg")',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',

        }}>
            <HotelMap></HotelMap>
            <div className="container">
                <div className="row" style={{
                    marginTop: '6rem',
                }}>
                    <div className="col">
                        <div className="row">
                            <h2 style={{
                                color: '#fff',
                                marginBottom: '40px',
                                fontSize: '24px',
                                fontWeight: '700',
                            }}>BookingOT</h2>
                        </div>
                        <div className="row">
                            <p style={{
                                color: "rgba(255, 255, 255, 0.7)",
                                marginTop: 0,
                                marginBottom: "1rem",
                                fontSize: '16px',
                            }}> Far far away, behind the word mountains, far from the countries Vokalia and Consonantia,
                                there live the blind texts.</p>
                        </div>
                        <div className="row" style={{
                            marginTop: '2rem',
                        }}>
                            <div className="col">
                                <span style={{
                                    display: 'flex',
                                    background: 'rgba(255, 255, 255, 0.05)',
                                    borderRadius: '50%',
                                    textAlign: 'center',
                                    alignItems: 'center',
                                    padding: '15px',
                                    justifyContent: 'center',
                                }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="30px" height="30px"
                                         viewBox="0 0 24 24">
                                        <path fill="#fff"
                                              d="M22.46 6c-.77.35-1.6.58-2.46.69c.88-.53 1.56-1.37 1.88-2.38c-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29c0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15c0 1.49.75 2.81 1.91 3.56c-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.2 4.2 0 0 1-1.93.07a4.28 4.28 0 0 0 4 2.98a8.52 8.52 0 0 1-5.33 1.84q-.51 0-1.02-.06C3.44 20.29 5.7 21 8.12 21C16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56c.84-.6 1.56-1.36 2.14-2.23"></path>
                                    </svg>
                                </span>
                            </div>
                            <div className="col">
                                <span style={{
                                    display: 'flex',
                                    background: 'rgba(255, 255, 255, 0.05)',
                                    borderRadius: '50%',
                                    textAlign: 'center',
                                    alignItems: 'center',
                                    padding: '15px',
                                    justifyContent: 'center',
                                }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="30px" height="30px"
                                         viewBox="0 0 24 24">
                                        <path fill="#fff"
                                              d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95"></path>
                                    </svg>
                                </span>
                            </div>
                            <div className="col">
                                <span style={{
                                    display: 'flex',
                                    background: 'rgba(255, 255, 255, 0.05)',
                                    borderRadius: '50%',
                                    textAlign: 'center',
                                    alignItems: 'center',
                                    padding: '15px',
                                    justifyContent: 'center',
                                }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="30px" height="30px"
                                         viewBox="0 0 24 24">
                                        <path fill="#fff"
                                              d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4zm9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8A1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5a5 5 0 0 1-5 5a5 5 0 0 1-5-5a5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3"></path>
                                    </svg>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="row">
                            <h2 style={{
                                color: '#fff',
                                marginBottom: '50px',
                                fontSize: '24px',
                                fontWeight: '700',
                            }}>Useful Links</h2>
                        </div>
                        <div className="row">
                            <h6 style={{fontSize: '16px',color: "rgba(255, 255, 255, 0.7)", marginBottom:"1.5rem"}}>Blog</h6>
                        </div>
                        <div className="row">
                            <h6 style={{fontSize: '16px',color: "rgba(255, 255, 255, 0.7)", marginBottom:"1.5rem"}}>Rooms</h6>
                        </div>
                        <div className="row">
                            <h6 style={{fontSize: '16px',color: "rgba(255, 255, 255, 0.7)", marginBottom:"1.5rem"}}>Amenities</h6>
                        </div>
                        <div className="row">
                            <h6 style={{fontSize: '16px',color: "rgba(255, 255, 255, 0.7)", marginBottom:"1.5rem"}}>Gift Card</h6>
                        </div>

                    </div>
                    <div className="col">
                        <div className="row">
                            <h2 style={{
                                color: '#fff',
                                marginBottom: '50px',
                                fontSize: '24px',
                                fontWeight: '700',
                            }}>Privacy</h2>
                        </div>
                        <div className="row">
                            <h6 style={{fontSize: '16px',color: "rgba(255, 255, 255, 0.7)", marginBottom:"1.5rem"}}>Career</h6>
                        </div>
                        <div className="row">
                            <h6 style={{fontSize: '16px',color: "rgba(255, 255, 255, 0.7)", marginBottom:"1.5rem"}}>About Us</h6>
                        </div>
                        <div className="row">
                            <h6 style={{fontSize: '16px',color: "rgba(255, 255, 255, 0.7)", marginBottom:"1.5rem"}}>Contact Us</h6>
                        </div>
                        <div className="row">
                            <h6 style={{fontSize: '16px',color: "rgba(255, 255, 255, 0.7)", marginBottom:"1.5rem"}}>Service</h6>
                        </div>

                    </div>
                    <div className="col">
                        <div className="row">
                            <h2 style={{
                                color: '#fff',
                                marginBottom: '50px',
                                fontSize: '24px',
                                fontWeight: '700',
                            }}>Have a Questions?</h2>
                        </div>
                        <div className="row">
                            <div className="col-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="26px" height="26px"
                                     viewBox="0 0 512 512">
                                    <path fill="#fff"
                                          d="M256 17.108c-75.73 0-137.122 61.392-137.122 137.122c.055 23.25 6.022 46.107 11.58 56.262L256 494.892l119.982-274.244h-.063a137.1 137.1 0 0 0 17.202-66.418C393.122 78.5 331.73 17.108 256 17.108m0 68.56a68.56 68.56 0 0 1 68.56 68.562A68.56 68.56 0 0 1 256 222.79a68.56 68.56 0 0 1-68.56-68.56A68.56 68.56 0 0 1 256 85.67z"></path>
                                </svg>
                            </div>
                            <div className="col">
                                <h6 style={{
                                    fontSize: '16px',
                                    color: "rgba(255, 255, 255, 0.7)",
                                    marginBottom: "1.5rem"
                                }}>phường 7, Quận 11, Hồ Chí Minh</h6>

                            </div>
                        </div>
                        <div className="row">
                            <div className="col-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="26px" height="26px" viewBox="0 0 20 20">
                                    <path fill="#fff"
                                          d="M6.987 2.066a2 2 0 0 1 2.327.946l.074.149l.662 1.471a2.5 2.5 0 0 1-.442 2.718l-.133.132l-1.043.973c-.188.178-.047.867.633 2.045c.612 1.06 1.11 1.555 1.355 1.582h.043l.053-.01l2.05-.627a1.5 1.5 0 0 1 1.564.441l.091.115l1.357 1.88a2 2 0 0 1-.125 2.497l-.122.126l-.542.514a3.5 3.5 0 0 1-3.715.705c-1.935-.78-3.693-2.562-5.29-5.328c-1.6-2.773-2.265-5.19-1.968-7.26a3.5 3.5 0 0 1 2.261-2.789l.193-.064z"></path>
                                </svg>
                            </div>
                            <div className="col">
                                <h6 style={{
                                    fontSize: '16px',
                                    color: "rgba(255, 255, 255, 0.7)",
                                    marginBottom: "1.5rem"
                                }}>+2 392 3929 210</h6>

                            </div>
                        </div>
                        <div className="row">
                            <div className="col-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="26px" height="26px" viewBox="0 0 24 24">
                                    <path fill="#fff"
                                          d="M4 20q-.825 0-1.412-.587T2 18V6q0-.825.588-1.412T4 4h16q.825 0 1.413.588T22 6v12q0 .825-.587 1.413T20 20zm8-7.175q.125 0 .263-.038t.262-.112L19.6 8.25q.2-.125.3-.312t.1-.413q0-.5-.425-.75T18.7 6.8L12 11L5.3 6.8q-.45-.275-.875-.012T4 7.525q0 .25.1.438t.3.287l7.075 4.425q.125.075.263.113t.262.037"></path>
                                </svg>
                            </div>
                            <div className="col">
                                <h6 style={{
                                    fontSize: '16px',
                                    color: "rgba(255, 255, 255, 0.7)",
                                    marginBottom: "1.5rem"
                                }}>wintranit@zanslay.com</h6>

                            </div>
                        </div>

                    </div>


                </div>

                <div className="row">

                </div>
            </div>


        </footer>
    );
};
export default Footer;
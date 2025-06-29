import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RoomSelection from './RoomSelection';

const HotelDetail = ({ hotelId, onRoomSelect, defaultDates }) => {
    const [hotel, setHotel] = useState(null);
    const [mainImage, setMainImage] = useState(null);
    const [images, setImages] = useState([]);

    useEffect(() => {
            axios.get(`/api/bookings/hotels/${hotelId}`)
                .then(res => {
                    const found = res.data;
                    setHotel(found);
                    if (found && found.img) {
                        const imgArr = found.img.split(',').map(url => url.trim()).filter(Boolean);
                        setImages(imgArr);
                        setMainImage(imgArr[0] || null);
                    } else if (found && found.img) {
                        setImages([found.img]);
                        setMainImage(found.img);
                    } else {
                        setImages([]);
                        setMainImage(null);
                    }
                });
    }, [hotelId]);

    const handleThumbnailClick = (image) => setMainImage(image);

    const handleAddressClick = () => {
        if (hotel && hotel.address) {
            const encoded = encodeURIComponent(hotel.address);
            window.open(`https://www.google.com/maps/search/?api=1&query=${encoded}`, '_blank');
        }
    };

    if (!hotel) return <div>Loading hotel details...</div>;

    return (
        <div className="container hotel-detail">
            <div className="hotel-detail__images">
                <div className="hotel-detail__main-image">
                    {mainImage ? (
                        <img
                            loading="lazy"
                            src={mainImage}
                            alt="Main Hotel"
                            className="hotel-detail__img"
                        />
                    ) : (
                        <div className="hotel-detail__img no-image">No image available</div>
                    )}
                </div>
                <div className="hotel-detail__thumbnails">
                    {images.map((img, i) => (
                        <div
                            key={i}
                            className="hotel-detail__thumb"
                            onClick={() => handleThumbnailClick(img)}
                        >
                            <img
                                loading="lazy"
                                src={img}
                                alt={`Thumbnail ${i + 1}`}
                                className="hotel-detail__img"
                            />
                        </div>
                    ))}
                </div>
            </div>

            <div className="hotel-detail__info">
                <h2 className="hotel-detail__title">{hotel.name}</h2>
                <p className="hotel-detail__address text-primary" onClick={handleAddressClick}>{hotel.address}</p>
                <div className="hotel-detail__badges">
                    <span className="badge badge--hot">Bán chạy nhất</span>
                    <span className="badge badge--year">2024</span>
                    <span className="badge badge--preferred">Agoda Preferred</span>
                </div>
                <div className="hotel-detail__rating">
                    <span className="hotel-detail__stars">★★★★★</span>
                    <span className="badge badge--blue">8.6 <span className="rating-text">Tuyệt vời</span></span>
                    <span className="hotel-detail__reviews text-primary">(2205 đánh giá)</span>
                </div>
                <p className="hotel-detail__desc text-muted">{hotel.description}</p>
                <div className="hotel-detail__scores">
                    <span className="score-item">Vị trí: 8.9</span>
                    <span className="score-item">Độ sạch sẽ: 8.8</span>
                    <span className="score-item">Cơ sở vật chất: 8.8</span>
                    <span className="score-item">Giá trị tiện ích: 8.8</span>
                </div>
                <div className="hotel-detail__tags">
                    <button className="tag-link text-primary">Đọc mọi bài đánh giá</button>
                    <button className="tag-link text-primary">Còn lại rất đẹp, tiện ích, nhân viên lịch sự</button>
                    <button className="tag-link text-primary">Nóng hơn</button>
                </div>
            </div>

            <RoomSelection
                onRoomSelect={onRoomSelect}
                defaultDates={defaultDates}
                imagePaths={images}
                hotelId={hotelId}
                hotel={hotel}
            />
        </div>
    );
};

export default HotelDetail;
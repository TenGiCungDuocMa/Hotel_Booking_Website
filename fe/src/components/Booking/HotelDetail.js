import React, { useState } from 'react';
import RoomSelection from './RoomSelection';

// Import images
import image1 from '../../assets/img-thumb/1.webp';
import image2 from '../../assets/img-thumb/2.webp';
import image3 from '../../assets/img-thumb/3.webp';
import image4 from '../../assets/img-thumb/4.webp';
import image5 from '../../assets/img-thumb/5.webp';
import image6 from '../../assets/img-thumb/6.webp';

const HotelDetail = ({ title, address, description, rating, reviews, onRoomSelect, defaultDates }) => {
    const imagePaths = [image1, image2, image3, image4, image5, image6];
    const [mainImage, setMainImage] = useState(imagePaths[0]);

    const handleThumbnailClick = (image) => setMainImage(image);

    const handleAddressClick = () => {
        if (address) {
            const encoded = encodeURIComponent(address);
            window.open(`https://www.google.com/maps/search/?api=1&query=${encoded}`, '_blank');
        }
    };

    return (
        <div className="container hotel-detail">
            <div className="hotel-detail__images">
                <div className="hotel-detail__main-image">
                    <img
                        loading="lazy"
                        src={mainImage}
                        alt="Main Hotel"
                        className="hotel-detail__img"
                    />
                </div>
                <div className="hotel-detail__thumbnails">
                    {imagePaths.map((img, i) => (
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
                <h2 className="hotel-detail__title">{title}</h2>
                <p className="hotel-detail__address text-primary" onClick={handleAddressClick}>{address}</p>
                <div className="hotel-detail__badges">
                    <span className="badge badge--hot">Bán chạy nhất</span>
                    <span className="badge badge--year">2024</span>
                    <span className="badge badge--preferred">Agoda Preferred</span>
                </div>
                <div className="hotel-detail__rating">
                    <span className="hotel-detail__stars">★★★★★</span>
                    <span className="badge badge--blue">{rating} <span className="rating-text">Tuyệt vời</span></span>
                    <span className="hotel-detail__reviews text-primary">({reviews} đánh giá)</span>
                </div>
                <p className="hotel-detail__desc text-muted">{description}</p>
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

            <RoomSelection onRoomSelect={onRoomSelect} defaultDates={defaultDates} imagePaths={imagePaths}/></div>
    );
};

export default HotelDetail;
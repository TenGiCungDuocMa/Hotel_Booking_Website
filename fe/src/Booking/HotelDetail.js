import React, { useState } from 'react';
import RoomSelection from "./RoomSelection";

const HotelDetail = ({ title, address, description, rating, reviews, onRoomSelect, defaultDates }) => {
    // List of image paths from the img folder
    const imagePaths = [
        '1.webp',
        '2.webp',
        '3.webp',
        '4.webp',
        '5.webp',
        '6.webp',
    ];

    const [mainImage, setMainImage] = useState(imagePaths[0]);

    const handleThumbnailClick = (image) => {
        setMainImage(image);
    };

    const handleAddressClick = () => {
        if (address) {
            const encodedAddress = encodeURIComponent(address);
            window.open(`https://www.google.com/maps/search/?api=1&query=${encodedAddress}`, '_blank');
        }
    };

    return (
        <div className="max-w-[1140px] mx-auto p-6">
            {/* Image Display Section */}
            <div className="mb-6 flex space-x-4">
                {/* Main Image (70%) */}
                <div className="w-3/5 h-[400px] rounded-lg overflow-hidden">
                    <img
                        loading="lazy"
                        src={require(`./img/${mainImage}`)}
                        alt="Main Hotel"
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Thumbnail Column (30%) */}
                <div className="w-2/5 h-[400px] overflow-y-auto rounded-lg">
                    {imagePaths.map((image, index) => (
                        <div
                            key={index}
                            className="w-full h-1/3 rounded-lg overflow-hidden mb-2 cursor-pointer hover:opacity-80"
                            onClick={() => handleThumbnailClick(image)}
                        >
                            <img
                                loading="lazy"
                                src={require(`./img/${image}`)}
                                alt={`Thumbnail ${index + 1}`}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Detail Section */}
            <div className="space-y-6">
                <div className="flex justify-between items-start">
                    <div>
                        <h2 className="text-2xl font-bold">{title}</h2>
                        <p
                            className="text-lg text-blue-600 underline cursor-pointer mt-2"
                            onClick={handleAddressClick}
                        >
                            {address}
                        </p>
                        <div className="flex space-x-2 mt-2">
                            <span className="bg-red-100 text-red-800 text-sm font-semibold px-2.5 py-0.5 rounded">Bán chạy nhất</span>
                            <span className="bg-green-100 text-green-800 text-sm font-semibold px-2.5 py-0.5 rounded">2024</span>
                            <span className="bg-blue-100 text-blue-800 text-sm font-semibold px-2.5 py-0.5 rounded">Agoda Preferred</span>
                        </div>
                    </div>
                </div>
                <div className="flex items-center space-x-2">
                    <span className="text-yellow-500">★★★★★</span>
                    <span className="bg-blue-100 text-blue-800 text-sm font-semibold px-2.5 py-0.5 rounded">
            {rating} Tuyệt vời
          </span>
                    <span className="text-blue-600 text-sm">{reviews} bài đánh giá</span>
                </div>
                <p className="text-gray-700">
                    {description}
                </p>
                <div className="flex space-x-2">
          <span className="bg-gray-100 text-gray-800 text-sm font-medium px-2.5 py-0.5 rounded">
            Vị trí 8.9
          </span>
                    <span className="bg-gray-100 text-gray-800 text-sm font-medium px-2.5 py-0.5 rounded">
            Độ sạch sẽ 8.8
          </span>
                    <span className="bg-gray-100 text-gray-800 text-sm font-medium px-2.5 py-0.5 rounded">
            Có số vật chất 8.8
          </span>
                    <span className="bg-gray-100 text-gray-800 text-sm font-medium px-2.5 py-0.5 rounded">
            Đáng giá tiện 8.8
          </span>
                </div>
                <div className="flex items-center space-x-2">
                    <button className="text-blue-600 hover:underline">Đọc mọi bài đánh giá</button>
                    <button className="text-blue-600 hover:underline">Còn lại rất đẹp, tiện ích, nhân viên lịch sự</button>
                    <button className="text-blue-600 hover:underline">Nóng hơn</button>
                </div>
            </div>
            <RoomSelection
                onRoomSelect={onRoomSelect}
                defaultDates={defaultDates}
            />
        </div>
    );
};

export default HotelDetail;
-- Bảng Users
CREATE TABLE users (
    userId SERIAL PRIMARY KEY,
    fullName VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    passwordHash TEXT NOT NULL,
    phone VARCHAR(20),
    role VARCHAR(20) DEFAULT 'user',
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Bảng Hotels
CREATE TABLE hotels (
    hotelId SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    address TEXT NOT NULL,
    description TEXT,
    latitude DECIMAL(9,6),
    longitude DECIMAL(9,6)
);

-- Bảng Rooms
CREATE TABLE rooms (
    roomId SERIAL PRIMARY KEY,
    hotelId INT,  -- Chưa khai báo khóa ngoại theo yêu cầu
    roomNumber VARCHAR(20),
    pricePerNight DECIMAL(10,2) NOT NULL,
    capacity INT NOT NULL,
    description TEXT,
    isAvailable BOOLEAN DEFAULT TRUE
);

-- Bảng Reviews
CREATE TABLE reviews (
    reviewId SERIAL PRIMARY KEY,
    userId INT,   -- Chưa khai báo khóa ngoại theo yêu cầu
    hotelId INT,  -- Chưa khai báo khóa ngoại theo yêu cầu
    content TEXT NOT NULL,
    sentiment VARCHAR(20),  -- e.g. 'Positive', 'Negative', 'Spam'
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Bảng Bookings
CREATE TABLE bookings (
    bookingId SERIAL PRIMARY KEY,
    userId INT,   -- Chưa khai báo khóa ngoại theo yêu cầu
    roomId INT,   -- Chưa khai báo khóa ngoại theo yêu cầu
    checkInDate DATE NOT NULL,
    checkOutDate DATE NOT NULL,
    status VARCHAR(20) DEFAULT 'Booked',
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
ALTER TABLE bookings
ADD COLUMN hotelId INT;

ALTER TABLE hotels ADD COLUMN img TEXT;
ALTER TABLE rooms ADD COLUMN img TEXT;

-- 1. Xoá bảng cũ nếu tồn tại
DROP TABLE IF EXISTS reviews;

-- Tạo bảng review với tên cột camelCase
CREATE TABLE review (
    id SERIAL PRIMARY KEY,
    userId BIGINT NOT NULL,
    bookingId BIGINT NOT NULL,
    rating INT,
    comment TEXT NOT NULL,
    isSpam BOOLEAN DEFAULT FALSE,
    sentiment VARCHAR(20),
    confidenceScore FLOAT,
    language VARCHAR(10),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);




-- users
CREATE TABLE users (  
    user_id VARCHAR(32) PRIMARY KEY,  
    username VARCHAR(50) NOT NULL UNIQUE,  
    password VARCHAR(255) NOT NULL,  
    role ENUM('User', 'Admin') NOT NULL,  
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP  
);  

-- meeting_rooms  
CREATE TABLE meeting_rooms (  
    room_id VARCHAR(32) PRIMARY KEY,  
    room_name VARCHAR(100) NOT NULL,  
    capacity INT NOT NULL,  
    status ENUM('Available', 'Occupied') DEFAULT 'Available',  
    room_type VARCHAR(50),  
    available_time VARCHAR(255), 
    notes TEXT,  
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP  
);  

-- reservations  
CREATE TABLE reservations (  
    reservation_id VARCHAR(32) PRIMARY KEY,  
    user_id INT NOT NULL,  
    room_id INT NOT NULL,  
    start_time DATETIME NOT NULL,  
    end_time DATETIME NOT NULL,  
    meeting_topic VARCHAR(100),  
    participants TEXT,  
    status ENUM('InProgress', 'Complete', 'Cancelled') DEFAULT 'InProgress',  
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,  
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,  
    FOREIGN KEY (room_id) REFERENCES meeting_rooms(room_id) ON DELETE CASCADE,  
    UNIQUE KEY unique_reservation (room_id, start_time, end_time)
);  

-- index 
CREATE INDEX idx_user_id ON reservations(user_id);  
CREATE INDEX idx_room_id ON reservations(room_id);  
CREATE INDEX idx_reservation_status ON reservations(status);
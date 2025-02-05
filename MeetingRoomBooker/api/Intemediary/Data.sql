INSERT INTO users (username, password, role) VALUES ('admin', '123456', 'Admin');
INSERT INTO users (username, password, role) VALUES ('user', '123456', 'User');

INSERT INTO meeting_rooms (room_name, capacity, status, room_type, available_time, notes)   
VALUES ('会议室A', 10, 'Available', '小型会议室', '09:00-18:00', '配备投影仪和白板');
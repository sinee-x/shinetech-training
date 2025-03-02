const rooms = [
  {
    "id": 1,
    "roomName": "会议室A",
    "capacity": 10,
    "status": "Available",
    "roomType": "小型会议室",
    "availableTime": "09:00-18:00",
    "notes": "配备投影仪和白板",
    "createdAt": "2025-02-08T15:22:35.583662",
    "lastModifiedAt": "2025-03-02T13:38:57.503Z"
  },
  {
    "id": 2,
    "roomName": "会议室B",
    "capacity": 20,
    "status": "Available",
    "roomType": "大型会议室",
    "availableTime": "09:00-18:00",
    "notes": "配备投影仪和白板",
    "createdAt": "2025-02-08T15:22:35.583671",
    "lastModifiedAt": "2025-03-02T13:38:57.503Z"
  },
  {
    "id": 3,
    "roomName": "会议室C",
    "capacity": 8,
    "status": "Available",
    "roomType": "小型会议室",
    "availableTime": "09:00-18:00",
    "notes": "配备视频会议系统",
    "createdAt": "2025-02-08T15:23:35.583671",
    "lastModifiedAt": "2025-03-02T13:38:57.503Z"
  },
  {
    "id": 4,
    "roomName": "会议室D",
    "capacity": 15,
    "status": "Available",
    "roomType": "中型会议室",
    "availableTime": "09:00-18:00",
    "notes": "配备音响系统",
    "createdAt": "2025-02-08T15:24:35.583671",
    "lastModifiedAt": "2025-03-02T13:38:57.503Z"
  },
  {
    "id": 5,
    "roomName": "会议室E",
    "capacity": 30,
    "status": "Available",
    "roomType": "大型会议室",
    "availableTime": "09:00-18:00",
    "notes": "配备全套视听设备",
    "createdAt": "2025-02-08T15:25:35.583671",
    "lastModifiedAt": "2025-03-02T13:38:57.503Z"
  },
  {
    "id": 6,
    "roomName": "培训室A",
    "capacity": 25,
    "status": "Available",
    "roomType": "培训室",
    "availableTime": "09:00-20:00",
    "notes": "配备电脑和培训设备",
    "createdAt": "2025-02-08T15:26:35.583671",
    "lastModifiedAt": "2025-03-02T13:38:57.503Z"
  },
  {
    "id": 7,
    "roomName": "培训室B",
    "capacity": 35,
    "status": "Available",
    "roomType": "培训室",
    "availableTime": "09:00-20:00",
    "notes": "配备电脑和培训设备",
    "createdAt": "2025-02-08T15:27:35.583671",
    "lastModifiedAt": "2025-03-02T13:38:57.503Z"
  },
  {
    "id": 8,
    "roomName": "会议室F",
    "capacity": 12,
    "status": "Available",
    "roomType": "中型会议室",
    "availableTime": "09:00-18:00",
    "notes": "配备投影仪和白板",
    "createdAt": "2025-02-08T15:28:35.583671",
    "lastModifiedAt": "2025-03-02T13:38:57.503Z"
  },
  {
    "id": 9,
    "roomName": "会议室G",
    "capacity": 6,
    "status": "Available",
    "roomType": "小型会议室",
    "availableTime": "09:00-18:00",
    "notes": "适合小组讨论",
    "createdAt": "2025-02-08T15:29:35.583671",
    "lastModifiedAt": "2025-03-02T13:38:57.503Z"
  },
  {
    "id": 10,
    "roomName": "会议室H",
    "capacity": 40,
    "status": "Available",
    "roomType": "大型会议室",
    "availableTime": "09:00-18:00",
    "notes": "配备高级视听设备",
    "createdAt": "2025-02-08T15:30:35.583671",
    "lastModifiedAt": "2025-03-02T13:38:57.503Z"
  },
  {
    "id": 11,
    "roomName": "视频会议室A",
    "capacity": 15,
    "status": "Available",
    "roomType": "视频会议室",
    "availableTime": "09:00-18:00",
    "notes": "配备高清视频会议系统",
    "createdAt": "2025-02-08T15:31:35.583671",
    "lastModifiedAt": "2025-03-02T13:38:57.503Z"
  },
  {
    "id": 12,
    "roomName": "视频会议室B",
    "capacity": 20,
    "status": "Available",
    "roomType": "视频会议室",
    "availableTime": "09:00-18:00",
    "notes": "配备高清视频会议系统",
    "createdAt": "2025-02-08T15:32:35.583671",
    "lastModifiedAt": "2025-03-02T13:38:57.503Z"
  },
  {
    "id": 13,
    "roomName": "会议室I",
    "capacity": 10,
    "status": "Available",
    "roomType": "小型会议室",
    "availableTime": "09:00-18:00",
    "notes": "配备投影仪和白板",
    "createdAt": "2025-02-08T15:33:35.583671",
    "lastModifiedAt": "2025-03-02T13:38:57.503Z"
  },
  {
    "id": 14,
    "roomName": "会议室J",
    "capacity": 18,
    "status": "Available",
    "roomType": "中型会议室",
    "availableTime": "09:00-18:00",
    "notes": "配备投影仪和白板",
    "createdAt": "2025-02-08T15:34:35.583671",
    "lastModifiedAt": "2025-03-02T13:38:57.503Z"
  },
  {
    "id": 15,
    "roomName": "会议室K",
    "capacity": 25,
    "status": "Available",
    "roomType": "大型会议室",
    "availableTime": "09:00-18:00",
    "notes": "配备投影仪和白板",
    "createdAt": "2025-02-08T15:35:35.583671",
    "lastModifiedAt": "2025-03-02T13:38:57.503Z"
  },
  {
    "id": 16,
    "roomName": "讨论室A",
    "capacity": 5,
    "status": "Available",
    "roomType": "讨论室",
    "availableTime": "09:00-20:00",
    "notes": "适合小组讨论",
    "createdAt": "2025-02-08T15:36:35.583671",
    "lastModifiedAt": "2025-03-02T13:38:57.503Z"
  },
  {
    "id": 17,
    "roomName": "讨论室B",
    "capacity": 6,
    "status": "Available",
    "roomType": "讨论室",
    "availableTime": "09:00-20:00",
    "notes": "适合小组讨论",
    "createdAt": "2025-02-08T15:37:35.583671",
    "lastModifiedAt": "2025-03-02T13:38:57.503Z"
  },
  {
    "id": 18,
    "roomName": "会议室L",
    "capacity": 15,
    "status": "Available",
    "roomType": "中型会议室",
    "availableTime": "09:00-18:00",
    "notes": "配备投影仪和白板",
    "createdAt": "2025-02-08T15:38:35.583671",
    "lastModifiedAt": "2025-03-02T13:38:57.503Z"
  },
  {
    "id": 19,
    "roomName": "多功能厅A",
    "capacity": 50,
    "status": "Available",
    "roomType": "多功能厅",
    "availableTime": "09:00-22:00",
    "notes": "适合大型活动和演讲",
    "createdAt": "2025-02-08T15:39:35.583671",
    "lastModifiedAt": "2025-03-02T13:38:57.503Z"
  },
  {
    "id": 20,
    "roomName": "多功能厅B",
    "capacity": 80,
    "status": "Available",
    "roomType": "多功能厅",
    "availableTime": "09:00-22:00",
    "notes": "适合大型活动和演讲",
    "createdAt": "2025-02-08T15:40:35.583671",
    "lastModifiedAt": "2025-03-02T13:38:57.503Z"
  }
];

export default rooms;
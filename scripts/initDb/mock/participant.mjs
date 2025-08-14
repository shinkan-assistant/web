const mockParticipants = [
  {
    "user_email": "jumpei141107@gmail.com",
    "event_id": "69d37355-98c7-4db8-afd6-635bed805d39", // 対面新歓①
    "is_organizer": true,
    "schedules": [
      {
        "id": "b3484f0e-36c1-4039-9d7a-1f81d113426e",
        "attendance": {
          "issued_at": "2025/03/29 14:55:00 JST",
        },
        "payment": {
          "issued_at": "2025/03/29 17:20:00 JST",
          "method": "PayPay",
        },
        "created_at": "2025/03/20 18:19:00 JST",
      },
      {
        "id": "84a1e944-884d-4950-8b01-382a93b5d263",
        "attendance": {
          "issued_at": "2025/03/29 18:07:00 JST",
        },
        "created_at": "2025/03/20 18:19:00 JST",
      },
    ],
  },
  {
    "user_email": "career.jumpei@gmail.com",
    "event_id": "69d37355-98c7-4db8-afd6-635bed805d39", // 対面新歓①
    "is_organizer": false,
    "schedules": [
      {
        "id": "b3484f0e-36c1-4039-9d7a-1f81d113426e",
        "attendance": {
          "issued_at": "2025/03/29 15:10:00 JST",
        },
        "payment": {
          "issued_at": "2025/03/29 17:25:00 JST",
          "method": "PayPay",
        },
        "created_at": "2025/03/24 20:12:00 JST",
      },
    ]
  },
  {
    "user_email": "jumpei141107@gmail.com",
    "event_id": "a9c3aaa9-da6e-4650-b7e5-f9dcbf62793d", // Zoom新歓①
    "is_organizer": true,
    "schedules": [
      {
        "id": "4d1b8089-08a6-419b-a32b-3e5a7b0d9124",
        "created_at": "2025/03/22 10:15:00 JST",
      }
    ]
  },
  {
    "user_email": "career.jumpei@gmail.com",
    "event_id": "a9c3aaa9-da6e-4650-b7e5-f9dcbf62793d", // Zoom新歓①
    "is_organizer": false,
    "schedules": [
      {
        "id": "4d1b8089-08a6-419b-a32b-3e5a7b0d9124",
        "created_at": "2025/03/26 12:57:00 JST",
        "cancel": {
          "issued_at": "2025/03/28 12:27:00 JST", 
        },
      }
    ]
  },
];

export default mockParticipants;
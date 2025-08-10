const mockParticipants = [
  {
    "user_email": "jumpei141107@gmail.com",
    "event_id": "69d37355-98c7-4db8-afd6-635bed805d39", // 対面新歓①
    "is_organizer": true,
    "schedules": [
      {
        "id": "b3484f0e-36c1-4039-9d7a-1f81d113426e",
        "attendance": {
          "status": "出席",
          "attend_at" :"",
        },
        "payment": {
          "is_completed": true,
          "paid_at": "",
          "method": "PayPay",
        },
      },
      {
        "id": "84a1e944-884d-4950-8b01-382a93b5d263",
        "attendance": {
          "status": "出席",
          "attend_at" :"",
        },
        "payment": {
          "is_completed": false,
        },
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
          "status": "出席",
          "attend_at" :"",
        },
        "payment": {
          "is_completed": true,
          "paid_at": "",
          "method": "現金",
        },
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
        "attendance": {
          "status": "未出席",
        },
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
        "attendance": {
          "status": "キャンセル",
        },
      }
    ]
  },
];

export default mockParticipants;
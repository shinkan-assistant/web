const mockParticipants = [
  {
    "user_email": "jumpei141107@gmail.com",
    "event_id": "69d37355-98c7-4db8-afd6-635bed805d39", // 対面新歓①
    "is_organizer": false,
    "attendance": {
      "status": "出席",
      "attend_at" :"",
    },
    "payment": {
      "status": "完了",
      "method": "PayPay",
    },
  },
  {
    "user_email": "career.jumpei@gmail.com",
    "event_id": "69d37355-98c7-4db8-afd6-635bed805d39", // 対面新歓①
    "is_organizer": true,
    "attendance": {
      "status": "出席",
      "attend_at" :"",
    },
    "payment": {
      "status": "未支払",
    },
  },
  {
    "user_email": "jumpei141107@gmail.com",
    "event_id": "a9c3aaa9-da6e-4650-b7e5-f9dcbf62793d", // Zoom新歓①
    "is_organizer": false,
    "attendance": {
      "status": "未出席",
      "canceled_at" :"",
    },
  },
  {
    "user_email": "career.jumpei@gmail.com",
    "event_id": "a9c3aaa9-da6e-4650-b7e5-f9dcbf62793d", // Zoom新歓①
    "is_organizer": true,
    "attendance": {
      "status": "キャンセル",
      "canceled_at" :"",
    },
  },
];

export default mockParticipants;
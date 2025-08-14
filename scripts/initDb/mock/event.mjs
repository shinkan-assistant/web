const mockEvents = [
  {
    "id": "69d37355-98c7-4db8-afd6-635bed805d39",
    "title": "対面新歓①",
    "type": "対面",
    "rough_location_name": "池袋駅",
    "is_public_detail_location": false,
    "contact_group": {
      "platform": "Lineオープンチャット",
      "url": "https://line.me/ti/g2/AbCdEfGhIjK_lMnOpQrStUvWxYz"
    },
    "schedules": [
      {
        "id": "b3484f0e-36c1-4039-9d7a-1f81d113426e",
        "type": "イベント",
        "title": "説明会＆交流会",
        "description": "サークルの説明を行った後、サークルメンバーとの交流会を行います。",
        "time_range": {
          "start_at": "2025/03/29 15:00:00 JST",
          "end_at": "2025/03/29 17:30:00 JST"
        },
        "location": {
          "name": "レンタルスペース池袋No.1",
          "address": "東京都豊島区池袋0丁目0-1",
          "map_url": "https://maps.app.goo.gl/ABCDEFGHIJKL00r001"
        },
        "fees_by_belong": [
          {
            "belong": {"is_member": true},
            "type": "割り勘",
            "comment": ""
          },
          {
            "belong": {"is_member": false},
            "type": "無料",
            "comment": ""
          }
        ]
      },
      {
        "id": "84a1e944-884d-4950-8b01-382a93b5d263",
        "type": "イベント",
        "title": "夕食会",
        "description": "希望者で夕食会に行ってさらに仲を深めます。",
        "time_range": {
          "start_at": "2025/03/29 18:00:00 JST",
          "end_at": "2025/03/29 20:00:00 JST"
        },
        "location": {
          "name": "ピザざんまい池袋店",
          "address": "東京都豊島区池袋0丁目0-2",
          "map_url": "https://maps.app.goo.gl/ABCDEFGHIJKL00d001"
        },
        "fees_by_belong": [
          {
            "belong": {"is_member": true},
            "type": "固定",
            "fixed": 2000,
            "comment": "変更の可能性があります"
          },
          {
            "belong": {"is_member": false},
            "type": "固定",
            "fixed": 1000,
            "comment": "変更の可能性があります"
          }
        ]
      }
    ]
  },
  {
    "id": "a9c3aaa9-da6e-4650-b7e5-f9dcbf62793d",
    "title": "Zoom新歓①",
    "type": "オンライン",
    "schedules": [
      {
        "id": "4d1b8089-08a6-419b-a32b-3e5a7b0d9124",
        "type": "イベント",
        "title": "団体説明&質問会",
        "description": "サークルの説明を行った後、質問会を行います。",
        "time_range": {
          "start_at": "2025/03/31 21:00:00 JST",
          "end_at": "2025/03/31 22:00:00 JST"
        }
      }
    ],
    "online_meeting_info": {
      "platform": "Zoom",
      "meeting_url": "https://zoom.us/j/9876543210?pwd=AbcdefGhijklMnopQrstuVwxyZ01234567",
      "meeting_id": "9876543210",
      "password": "AbcdefGhijklMnopQrstuVwxyZ01234567",
      "comment": ""
    }
  }
];
  
export default mockEvents;

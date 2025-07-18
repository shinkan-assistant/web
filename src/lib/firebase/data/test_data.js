const testData = {
  events: [
    {
      title: "対面新歓①", 
      date: "2025-3-29", 
      join_type: "対面",
      main_location: {
        name: "池袋駅周辺",
        is_public_detail: false,
      },
      line_open_chat_url: "https://line.me/ti/g2/AbCdEfGhIjK_lMnOpQrStUvWxYz",
      schedules: [
        {
          type: "集合",
          start_time: "14:15",
          location: {
            name: "池袋駅"
          }
        },
        {
          type: "イベント",
          title: "説明会＆交流会",
          description: "サークルの説明を行った後、サークルメンバーとの交流会を行います。",
          start_time: "15:00",
          end_time: "17:30",
          location: {
            name: "レンタルスペース池袋No.1",
            address: "東京都豊島区池袋0丁目0-1",
            map_url: "https://maps.app.goo.gl/ABCDEFGHIJKL00r001",
          },
          fees_by_belong: {
            "63期": {type: "割り勘", comment: ""},
            "64期": {type: "割り勘", comment: ""},
            "新入生": {type: "無料", comment: ""}
          },
        },
        {
          type: "イベント",
          title: "夕食会",
          description: "希望者で夕食会に行ってさらに仲を深めます。",
          start_at: "18:00",
          end_at: "20:00",
          location: {
            name: "ピザざんまい池袋店",
            address: "東京都豊島区池袋0丁目0-2",
            map_url: "https://maps.app.goo.gl/ABCDEFGHIJKL00d001",
          },
          fees_by_belong: {
            "63期": {type: "固定", fixed: 2000, comment: ""},
            "64期": {type: "固定", fixed: 2000, comment: ""},
            "新入生": {type: "固定", fixed: 1000, comment: ""}
          },
        }
      ],
    },
    {
      title: "Zoom新歓①", 
      description: "団体説明や質疑応答を行います。",
      date: "2025-3-31",
      start_time: "21:00",
      ebd_time: "21:00",
      join_type: "オンライン",
      online_meeting_info: {
        platform: "zoom",
        meeting_id: "9876543210",
        password: "AbcdefGhijklMnopQrstuVwxyZ01234567",
        meeting_url: "https://zoom.us/j/9876543210?pwd=AbcdefGhijklMnopQrstuVwxyZ01234567",
        comment: "",
      },
    },
  ],
};

export default testData;

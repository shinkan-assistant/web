const testData = {
  events: [
    {
      title: "対面新歓①", 
      type: "対面",
      // date: "2025-3-29", 
      rough_location_name: "池袋駅",
      is_public_detail_location: false,
      contact_group: {
        platform: "Lineオープンチャット", 
        url: "https://line.me/ti/g2/AbCdEfGhIjK_lMnOpQrStUvWxYz",
      },
      schedules: [
        {
          title: "集合",
          time_range: {
            start_at: "2025-03-29T14:45:00Z",
          },
          location: {
            name: "池袋駅"
          },
        },
        {
          type: "イベント",
          title: "説明会＆交流会",
          description: "サークルの説明を行った後、サークルメンバーとの交流会を行います。",
          time_range: {
            // start_time: "15:00",
            // end_time: "17:30",
            start_at: "2025-03-29T15:00:00Z",
            end_at: "2025-03-29T17:30:00Z",
          },
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
          time_range: {
            // start_time: "18:00",
            // end_time: "20:00",
            start_at: "2025-03-29T18:00:00Z",
            end_at: "2025-03-29T20:00:00Z",
          },
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
      type: "オンライン",
      schedules: [
        {
          type: "イベント",
          title: "団体説明&質問会",
          description: "サークルの説明を行った後、質問会を行います。",
          time_range: {
            start_at: "2025-03-31T21:00:00Z",
            end_at: "2025-03-31T22:00:00Z",
          },
        },
      ],
      online_meeting_info: {
        platform: "Zoom",
        meeting_url: "https://zoom.us/j/9876543210?pwd=AbcdefGhijklMnopQrstuVwxyZ01234567",
        comment: "",
      },
    },
  ],
};

export default testData;

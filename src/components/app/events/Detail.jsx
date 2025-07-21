import {EventTypeEnum, FeeTypeEnum} from "@/data/enums/event";
import {notFound} from "next/navigation";

// 日付と時刻をフォーマットするヘルパー関数
function formatScheduleTime(isoString) {
  const date = new Date(isoString)
  const hour = date.getHours();
  const minute = date.getMinutes();
  const minuteStr = minute >= 10 ? `${minute}` : `0${minute}`
  return `${hour}:${minuteStr}`;
};

function formatEventDate(isoString) {
  const date = new Date(isoString)
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // 月は0から始まるため+1
  const day = date.getDate();
  return `${year}年${month}月${day}日`;
};

const copyToClipboard = (text) => {
  // `document.execCommand('copy')` は非推奨ですが、
  // iframe環境で`navigator.clipboard.writeText`が動作しない場合があるため使用します。
  const textarea = document.createElement('textarea');
  textarea.value = text;
  document.body.appendChild(textarea);
  textarea.select();
  try {
    document.execCommand('copy');
  } catch (err) {
    console.error('コピーに失敗しました:', err);
    alert('コピーに失敗しました。手動でコピーしてください。');
  }
  document.body.removeChild(textarea);
};

// イベント詳細表示コンポーネント
export function EventDetail({ event, belongName, rollName }) {
  if (event == undefined) {
    notFound();
  }

  const eventDate = event.schedules && event.schedules[0] && event.schedules[0].time_range?.start_at
    ? formatEventDate(event.schedules[0].time_range.start_at): null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 sm:p-6 lg:p-8 font-inter text-gray-800">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-6 sm:p-8">
          {/* イベントタイトルとタイプ */}
          <div className="flex items-center mb-4">
            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
              event.type === EventTypeEnum.in_person ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
            }`}>
              {event.type}
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 ml-3">{event.title}</h1>
          </div>

          {/* 概要情報セクションを1つのフレーム内にまとめる */}
          <div className="bg-gray-50 p-6 rounded-lg shadow-md mb-8">
            <h3 className="font-bold text-xl text-gray-800 mb-4 border-b pb-2 border-gray-200">概要情報</h3>
            
            <div className="space-y-4"> {/* 各情報ブロック間のスペースを統一 */}
              {/* イベントの日にちを追加 */}
              {eventDate && (
                <div className="flex items-center text-gray-700 text-lg">
                  <span className="inline-flex items-center text-blue-600 mr-2">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                  </span>
                  <p><span className="font-semibold">開催日:</span> {eventDate}</p>
                </div>
              )}
              
              {/* イベントタイプに応じた場所情報 */}
              <div className="flex items-start text-gray-700 text-lg">
                <span className="inline-flex items-center text-red-600 mr-2 mt-0.5">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.828 0L6.343 16.657a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                </span>
                <div>
                  <p><span className="font-semibold">場所:</span> {event.type === '対面' ? event.rough_location_name : "オンライン開催"}</p>
                </div>
              </div>

              {/* オンライン会議情報 */}
              {event.type === 'オンライン' && event.online_meeting_info && (
                <div>
                  <h4 className="font-semibold text-lg text-gray-700 mb-2 mt-4 pt-4 border-t border-gray-200">オンライン会議情報</h4>
                  
                  {/* プラットフォーム表示をかっこよくする */}
                  <div className="flex items-center text-gray-600 mb-2">
                    <span className="font-medium mr-2">プラットフォーム:</span>
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-200 text-blue-800 text-sm font-semibold shadow-sm">
                      {/* アイコンを追加 */}
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.555-4.555A2 2 0 0017 3H7a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2v-2.555M15 10l-4.555 4.555M15 10l-4.555-4.555m0 0L4.555 15"></path></svg>
                      {event.online_meeting_info.platform}
                    </span>
                  </div>
                  
                  {event.online_meeting_info.meeting_id && (
                    <div className="flex items-center mt-2">
                      <p className="text-gray-600">
                        <span className="font-medium">ミーティングID:</span> <span className="font-semibold text-gray-800">{event.online_meeting_info.meeting_id}</span>
                      </p>
                      <button 
                        onClick={() => copyToClipboard(event.online_meeting_info.meeting_id)}
                        className="ml-2 p-1 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                        title="ミーティングIDをコピー"
                      >
                        <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1.5M9 3l2-2 2 2M10 4.5V1H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V9h-3.586a1 1 0 00-.707.293l-1.414 1.414a1 1 0 01-.707.293H12a2 2 0 01-2-2V4.5z"></path></svg>
                      </button>
                    </div>
                  )}
                  {event.online_meeting_info.password && (
                    <div className="flex items-center mt-1">
                      <p className="text-gray-600">
                        <span className="font-medium">パスワード:</span> <span className="font-semibold text-gray-800">{event.online_meeting_info.password}</span>
                      </p>
                      <button 
                        onClick={() => copyToClipboard(event.online_meeting_info.password)}
                        className="ml-2 p-1 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                        title="パスワードをコピー"
                      >
                        <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1.5M9 3l2-2 2 2M10 4.5V1H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V9h-3.586a1 1 0 00-.707.293l-1.414 1.414a1 1 0 01-.707.293H12a2 2 0 01-2-2V4.5z"></path></svg>
                      </button>
                    </div>
                  )}
                  <a 
                    href={event.online_meeting_info.meeting_url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-flex items-center justify-center px-4 py-2 bg-sky-500 text-white font-semibold rounded-md hover:bg-sky-600 transition-colors duration-200 shadow-md mt-3"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                    会議に参加
                  </a>
                  {event.online_meeting_info.comment && (
                    <p className="text-gray-600 mt-3 text-sm italic">コメント: {event.online_meeting_info.comment}</p>
                  )}
                </div>
              )}

              {/* 連絡先情報 */}
              {event.contact_group && (
                <div>
                  <h4 className="font-semibold text-lg text-gray-700 mb-2 mt-4 pt-4 border-t border-gray-200">連絡グループ</h4> {/* 上線とマージンを調整 */}
                  <a 
                    href={event.contact_group.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-flex items-center justify-center px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition-colors duration-200 shadow-md mt-3"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.24-.975M10 21h4a2 2 0 002-2V7a2 2 0 00-2-2H8a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                    {event.contact_group.platform}に参加
                  </a>
                </div>
              )}
            </div> {/* End of space-y-4 */}
          </div>

          {/* スケジュール詳細 */}
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 border-b-2 border-blue-200 pb-2">スケジュール</h2>
          {event.schedules && event.schedules.length > 0 ? (
            <div className="space-y-6">
              {event.schedules.map((schedule, index) => {
                return (
                  <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                    <h3 className="text-xl sm:text-2xl font-extrabold text-gray-900 mb-2">{schedule.title}</h3>
                    
                    {schedule.description && (
                      <p className="text-gray-700 mt-2 text-base leading-relaxed">{schedule.description}</p>
                    )}

                    <div className="mt-4 space-y-2">
                      {schedule.time_range && (
                        <div className="flex items-center text-gray-700 text-sm">
                          {/* 開始時間のアイコンを色付きに */}
                          <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                          <p>
                            {schedule.time_range.end_at && (<span className="font-semibold">開始:</span>)} {formatScheduleTime(schedule.time_range.start_at)}
                          </p>
                          {schedule.time_range.end_at && (
                            <p className="ml-4">
                              <span className="font-semibold">終了:</span> {
                                // isSameDayのロジックを削除し、常に完全な日付と時刻を表示
                                formatScheduleTime(schedule.time_range.end_at)
                              }
                            </p>
                          )}
                        </div>
                      )}

                      {schedule.location && (
                        <div className="flex items-start text-gray-700 text-sm">
                          {/* 場所のアイコンを色付きに */}
                          <svg className="w-5 h-5 mr-2 text-red-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.828 0L6.343 16.657a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                          <div>
                            <p><span className="font-semibold">場所:</span> {schedule.location.name}</p>
                            {schedule.location.address && (
                              <p><span className="font-semibold">住所:</span> {schedule.location.address}</p>
                            )}
                            {schedule.location.map_url && (
                              <a 
                                href={schedule.location.map_url} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="inline-block mt-1 px-3 py-1 bg-blue-500 text-white text-xs font-semibold rounded-md hover:bg-blue-600 transition-colors duration-200 shadow-md"
                              >
                                地図を見る
                              </a>
                            )}
                          </div>
                        </div>
                      )}

                      {schedule.fees_by_belong && schedule.fees_by_belong.length > 0 && (
                        <div className="flex items-start text-gray-700 text-sm">
                          {/* 参加費のアイコンを色付きに */}
                          <svg className="w-5 h-5 mr-2 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                          <div>
                            <h4 className="font-semibold inline-block mr-1">参加費:</h4> {/* inline-blockとmr-1で調整 */}
                            {/* すべてのbelongについてのfeeを表示 */}
                            {schedule.fees_by_belong.map((fee, feeIndex) => {
                              if (fee.belong === belongName) {
                                return (
                                  <div key={feeIndex}  className="inline-block mr-2"> {/* 各料金項目をinline-blockで横並びに */}
                                    {/* 所属名は表示せず、料金とコメントのみ */}
                                    {fee.type === '固定' ? (
                                      <span className="text-gray-700 font-bold">¥{fee.fixed}</span>
                                    ) : fee.type === '無料' ? (
                                      <span className="text-gray-700 font-bold">無料</span>
                                    ) : (
                                      <span className="text-gray-700 font-bold">{fee.type}</span>
                                    )}
                                    {fee.comment && `(${fee.comment})`}
                                  </div>
                                );
                              }
                            })}
                          </div>
                        </div>
                      )}
                    </div> {/* End of space-y-2 */}
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-gray-600">スケジュールの情報がありません。</p>
          )}
        </div>
      </div>
    </div>
  );
};

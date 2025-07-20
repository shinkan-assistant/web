import Link from "next/link";
import Dashboard from "@/components/templates/Dashboard";
import { EventTypeEnum } from "@/data/enums/event";

function formatEventDate(date) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // 月は0から始まるため+1
  const day = date.getDate();
  return `${year}年${month}月${day}日`;
};

function EventItem({event}) {
  // 最初のスケジュールから開始日時を取得
  const firstScheduleStartTime = event.schedules[0]?.time_range?.start_at;
  const formattedDate = formatEventDate(new Date(firstScheduleStartTime));

  // イベントの場所を決定
  const displayLocation = event.type === EventTypeEnum.in_person
    ? event.rough_location_name
    : 'オンライン開催';
  
  const detailUrl = `/events/${event.id}`;

  return (
    <div
      className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200"
    >
      <div className="p-6">
        {/* イベントタイトル */}
        <h2 className="text-2xl font-bold text-gray-900 mb-3 truncate" title={event.title}>
          {event.title}
        </h2>

        {/* イベントタイプ */}
        <div className="flex items-center text-sm text-gray-600 mb-2">
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            event.type === EventTypeEnum.in_person ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
          }`}>
            {event.type === EventTypeEnum.in_person ? (
              <svg className="-ml-0.5 mr-1.5 h-3 w-3 text-blue-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path></svg>
            ) : (
              <svg className="-ml-0.5 mr-1.5 h-3 w-3 text-green-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd"></path></svg>
            )}
            {event.type}
          </span>
        </div>

        {/* 日付 */}
        <p className="text-gray-700 text-base mb-2 flex items-center">
          <svg className="h-5 w-5 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
          {formattedDate}
        </p>

        {/* 場所 */}
        <p className="text-gray-700 text-base mb-4 flex items-center">
          <svg className="h-5 w-5 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.828 0L6.343 16.657a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
          {displayLocation}
        </p>

        {/* 詳細を見るリンク */}
        <Link 
          href={detailUrl}
          className="block text-center w-full bg-sky-600 text-white py-2.5 px-4 rounded-lg hover:bg-sky-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-opacity-50 font-medium text-lg"
        >
          詳細を見る
        </Link>
      </div>
    </div>
  );
}

export default function EventDashboard({events}) {
  return (
    <Dashboard>
      <div className="container mx-auto p-4 sm:p-6 lg:p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {events.map((event) => <EventItem key={event.id} event={event} />)}
      </div>
    </Dashboard>
  );
}

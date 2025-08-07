import {notFound} from "next/navigation";
import { ScheduleList } from "./schedules/List";
import { EventBadgeList, EventItemIcon } from "./ui";


function formatEventDate(isoString) {
  const date = new Date(isoString)
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // 月は0から始まるため+1
  const day = date.getDate();
  return `${year}年${month}月${day}日`;
}


function EventHeader({event}) {
  return (
    <div>
      <div className="mb-3">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
          {event.title}
        </h1>
      </div>
      <div className="mb-4">
        <EventBadgeList event={event} textSizeClass="text-sm" />
      </div>
    </div>
  );
}

function EventDate({event}) {
  const eventDate = formatEventDate(event.schedules[0].time_range.start_at);
  return (
    <div className="flex items-center text-gray-700 text-lg">
      {EventItemIcon.date({className: "w-6 h-6 inline-flex items-center mr-2"})}
      <p><span className="font-semibold">開催日:</span> {eventDate}</p>
    </div>
  );
}

function EventLocation({event}) {
  return (
    <div className="flex items-start text-gray-700 text-lg">
      {EventItemIcon.location({className: "w-6 h-6 inline-flex items-center mr-2 mt-0.5"})}
      <p><span className="font-semibold">場所:</span> {event.type === '対面' ? event.rough_location_name : "オンライン開催"}</p>
    </div>
  );
}

function EventSummary({event}) {
  return (
    <div className="bg-gray-50 p-6 rounded-lg shadow-md">
      <div className="mb-4 border-b pb-2 border-gray-200">
        <h3 className="font-bold text-xl text-gray-800">概要情報</h3>
      </div>

      <div className="space-y-4"> {/* 各情報ブロック間のスペースを統一 */}
        <EventDate event={event} />
        {event.rough_location_name && <EventLocation event={event} />}
      </div> {/* End of space-y-4 */}
    </div>
  );
}

// イベント申し込みコンポーネント
export default function EventApplyForm({ event, myUserMetadata }) {
  if (event == null) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 sm:p-6 lg:p-8 font-inter text-gray-800">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-6 sm:p-8">
          <div className="ml-3">
            <EventHeader event={event} />
          </div>

          <div className="mb-8">
            <EventSummary event={event} />
          </div>

          <ScheduleList schedules={event.schedules} belong={myUserMetadata["belong"]} publicLocation={false} />
        </div>
      </div>
    </div>
  );
};

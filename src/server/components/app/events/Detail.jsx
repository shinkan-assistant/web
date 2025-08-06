import {notFound} from "next/navigation";
import { BlankLink } from "@/server/components/ui/link";
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

function EventOnlineMeetingPlatform({platform}) {
  return (
    <div className="flex items-center text-gray-600">
      <span className="font-medium mr-2">プラットフォーム:</span>
      <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-200 text-blue-800 text-sm font-semibold shadow-sm">
        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.555-4.555A2 2 0 0017 3H7a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2v-2.555M15 10l-4.555 4.555M15 10l-4.555-4.555m0 0L4.555 15"></path></svg>
        {platform}
      </span>
    </div>
  );
}

function EventOnlineMeetingTextItem({label, text}) {
  return (
    <p className="text-gray-600">
      <span className="font-medium">{label}:</span> <span className="font-semibold text-gray-800">{text}</span>
    </p>
  );
}

function EventOnlineMeetingInfo({online_meeting_info}) {
  return (
    <div>
      <h4 className="font-semibold text-lg text-gray-700 mb-2 mt-4 pt-4 border-t border-gray-200">オンライン会議情報</h4>
      <div className="mb-2">
        <EventOnlineMeetingPlatform platform={online_meeting_info.platform} />
      </div>
      
      {online_meeting_info.meeting_id && 
        <div className="mt-2">
          <EventOnlineMeetingTextItem label={"ミーティングID"} text={online_meeting_info.meeting_id} />
        </div>
      }

      {online_meeting_info.password && 
        <div className="mt-1">
          <EventOnlineMeetingTextItem label={"パスワード"} text={online_meeting_info.password} />
        </div>
      }

      <div className="mt-3">
        <BlankLink href={online_meeting_info.meeting_url} paddingClassName={"px-4 py-2"} >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
          会議に参加
        </BlankLink>
      </div>

      {online_meeting_info.comment && (
        <div className="mt-3">
          <p className="text-gray-600 text-sm italic">コメント: {online_meeting_info.comment}</p>
        </div>
      )}
    </div>
  );
}

function EventContactGroup({contact_group}) {
  return (
    <div>
      <h4 className="font-semibold text-lg text-gray-700 pt-4 border-t border-gray-200">連絡グループ</h4>
      <div className="mt-3">
        <BlankLink href={contact_group.url} paddingClassName={"px-[12px] py-[6px]"} >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.24-.975M10 21h4a2 2 0 002-2V7a2 2 0 00-2-2H8a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
          {contact_group.platform}に参加
        </BlankLink>
      </div>
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
        {event.location && <EventLocation event={event} />}
        {event.contact_group && <EventContactGroup contact_group={event.contact_group} />}
        {event.online_meeting_info && <EventOnlineMeetingInfo online_meeting_info={event.online_meeting_info} />}
      </div> {/* End of space-y-4 */}
    </div>
  );
}

// イベント詳細表示コンポーネント
export function EventDetail({ event, myUser }) {
  if (event == undefined) {
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

          <ScheduleList schedules={event.schedules} belong={myUser["belong"]} />
        </div>
      </div>
    </div>
  );
};

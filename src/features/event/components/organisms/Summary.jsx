import { EventItemIcon } from "../atoms/TextItemIcon";
import { BlankLink } from "@/base/components/atoms/Link";
import { EventTypeEnum } from "@/features/event/enums/data";
import { formatDateTime } from "@/base/utils";
import Input from "@/base/components/atoms/FormInput";

class SummaryMetaInfo {
  constructor({pageMetaInfo, formHook}) {
    this.page = pageMetaInfo;
    this.formHook = formHook;
  }
}

function EventDate({event, metaInfo}) {
  const formattedDate = formatDateTime(event.schedules[0].time_range.start_at, ({year, month, date}) => `${year}年${month}月${date}日`)

  return (
    <div className={`flex items-center text-gray-700 ${metaInfo.page.isList ? "text-base" : "text-lg"}`}>
      {EventItemIcon.date({className: `mr-2 ${metaInfo.page.isList ? "h-5 w-5" : "w-6 h-6 inline-flex items-center"}`})}
      <div>
        {!metaInfo.page.isList && <span className="font-semibold">開催日: </span>}
        <span>{formattedDate}</span>
      </div>
    </div>
  );
}

function EventLocation({event, metaInfo}) {
  const value = event.type === EventTypeEnum.in_person ? event.rough_location_name : "オンライン開催";
  const canEdit = metaInfo.page.isManage && event.type === EventTypeEnum.in_person;

  return (
    <div className={`flex items-center text-gray-700 ${metaInfo.page.isList ? "text-base" : "text-lg"}`}>
      {EventItemIcon.location({className: `mr-2 ${metaInfo.page.isList ? "w-5 h-5" :"w-6 h-6 inline-flex items-center"}`})}
      <div>
        {!metaInfo.page.isList && <span className="font-semibold">場所: </span>}
        <span>
          {!canEdit
          ? <div>{value}</div>
          : <Input name="rough_location_name" formHook={metaInfo.formHook} />
          }
        </span>
      </div>
    </div>
  );
}

function EventContactGroup({contact_group, metaInfo}) {
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
function EventOnlineMeetingPlatform({platform, metaInfo}) {
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

function EventOnlineMeetingTextItem({label, text, metaInfo}) {
  return (
    <p className="text-gray-600">
      <span className="font-medium">{label}:</span> <span className="font-semibold text-gray-800">{text}</span>
    </p>
  );
}

function EventOnlineMeetingInfo({online_meeting_info, metaInfo}) {
  return (
    <div>
      <h4 className="font-semibold text-lg text-gray-700 mb-2 mt-4 pt-4 border-t border-gray-200">オンライン会議情報</h4>
      <div className="mb-2">
        <EventOnlineMeetingPlatform platform={online_meeting_info.platform} metaInfo={metaInfo} />
      </div>
      
      {online_meeting_info.meeting_id && 
        <div className="mt-2">
          <EventOnlineMeetingTextItem label={"ミーティングID"} text={online_meeting_info.meeting_id} metaInfo={metaInfo} />
        </div>
      }

      {online_meeting_info.password && 
        <div className="mt-1">
          <EventOnlineMeetingTextItem label={"パスワード"} text={online_meeting_info.password} metaInfo={metaInfo} />
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


export default function EventSummary({pageMetaInfo, event, formHook }) {
  const metaInfo = new SummaryMetaInfo({pageMetaInfo, formHook});

  return (
    <div className={metaInfo.page.isList ? "" : "bg-gray-50 p-6 rounded-lg shadow-md"}>
      {!metaInfo.page.isList &&
        <div className="mb-4 border-b pb-2 border-gray-200">
          <h3 className="font-bold text-xl text-gray-800">概要情報</h3>
        </div>
      }

      <div className={metaInfo.page.isList ? "space-y-2" : "space-y-4"}> {/* 各情報ブロック間のスペースを統一 */}
        <EventDate event={event} metaInfo={metaInfo} />
        <EventLocation event={event} metaInfo={metaInfo} />
        {(!metaInfo.page.isList || metaInfo.page.isManage || metaInfo.page.isBeforeApplying) && 
          <>
            {event.contact_group && <EventContactGroup contact_group={event.contact_group} />}
            {event.online_meeting_info && <EventOnlineMeetingInfo online_meeting_info={event.online_meeting_info} />}
          </>
        }
      </div> {/* End of space-y-4 */}
    </div>
  );
}

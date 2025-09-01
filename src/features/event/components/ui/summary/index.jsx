import RoughLocationName from "./RoughLocationName";
import HeldDate from "./HeldDate";
import ContactGroup from "../scheduleList/ContactGroup";
import OnlineMeetingInfo from "../scheduleList/OnlineMeetingInfo";
import { UI_SIZE } from "@/base/ui/const/enums/uiSize";
import { ContentTypeEnum } from "@/base/features/content/const/enums/type";

export default function EventSummary({pageInfo, event, formHook }) {
  return (
    <div className={pageInfo.contentType === ContentTypeEnum.list ? "" : "bg-gray-50 p-6 rounded-lg shadow-md"}>
      {pageInfo.contentType === ContentTypeEnum.item &&
        <div className="mb-4 border-b pb-2 border-gray-200">
          <h3 className="font-bold text-xl text-gray-800">概要情報</h3>
        </div>
      }

      <div className={pageInfo.contentType === ContentTypeEnum.list ? "space-y-2" : "space-y-4"}> {/* 各情報ブロック間のスペースを統一 */}
        <HeldDate
          schedules={event["schedules"]}
          size={UI_SIZE.LG}
        />
        <RoughLocationName
          roughLocationName={event["rough_location_name"]}
          size={UI_SIZE.LG}
        />
        {(pageInfo.contentType === ContentTypeEnum.item || pageInfo.isForManage || pageInfo.isBeforeApplying) && 
          <>
            {event["contact_group"] && 
              <ContactGroup contactGroup={event["contact_group"]}
            />}
            {event["online_meeting_info"] && 
              <OnlineMeetingInfo onlineMeetingInfo={event["online_meeting_info"]}
            />}
          </>
        }
      </div>
    </div>
  );
}

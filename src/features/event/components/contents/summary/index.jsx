import RoughLocationName from "./ui/RoughLocationName";
import HeldDate from "./ui/HeldDate";
import ContactGroup from "../schedules/ui/ContactGroup";
import OnlineMeetingInfo from "../schedules/ui/OnlineMeetingInfo";
import uiSizeEnum from "@/helpers/components/ui/uiSizeEnum";
import ContentTypeEnum from "@/helpers/components/layouts/templates/base/config/typeEnum";

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
          size={uiSizeEnum.LG}
        />
        <RoughLocationName
          roughLocationName={event["rough_location_name"]}
          size={uiSizeEnum.LG}
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

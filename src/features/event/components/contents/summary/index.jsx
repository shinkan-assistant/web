import RoughLocationName from "./RoughLocationName";
import HeldDate from "./HeldDate";
import ContactGroup from "../schedules/ContactGroup";
import OnlineMeetingInfo from "../schedules/OnlineMeetingInfo";

export default function Summary({event, myParticipant, isItemPage, editFormHook}) {
  return (
    <div className={isItemPage ? "bg-gray-50 p-6 rounded-lg shadow-md" : ""}>
      {isItemPage &&
        <div className="mb-4 border-b pb-2 border-gray-200">
          <h3 className="font-bold text-xl text-gray-800">概要情報</h3>
        </div>
      }

      <div className={isItemPage ? "space-y-4" : "space-y-2"}> {/* 各情報ブロック間のスペースを統一 */}
        <HeldDate
          event={event}
        />
        <RoughLocationName
          roughLocationName={event["rough_location_name"]}
        />
        {(isItemPage && (myParticipant || editFormHook)) && 
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

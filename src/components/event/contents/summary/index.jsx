import RoughLocationName from "./RoughLocationName";
import HeldDate from "./HeldDate";
import OnlineMeetingInfo from "../schedules/OnlineMeetingInfo";
import { EventsPageFilterEnum } from "../../templates/List";
import StatusBadgeArea from "@/helpers/components/ui/statusBadgeArea";
import judgeMyParticipantStatus from "../../utils/myParticipantStatus";

export default function Summary({
  event, 
  isItemPage, 
  myParticipant, 
  useForEditForm, // Item Page
  filter, // List Page
}) {
  // 参加状態のステータスバッジ
  let statuses;
  if (!isItemPage && filter === EventsPageFilterEnum.participating) {
    statuses = [
      {fieldName: "cancel", title: "キャンセル済み"},
      {fieldName: "attendance", title: "出席済み"},
      {fieldName: "payment", title: "支払い済み"},
    ].filter(
      status => judgeMyParticipantStatus(myParticipant, status.fieldName)
    );
  }

  return (
    <div className={isItemPage ? "bg-slate-50 p-6 rounded-xl shadow-lg border border-slate-200" : ""}>
      {isItemPage &&
        <div className="mb-6 border-b pb-3 border-slate-200">
          <h3 className="font-bold text-2xl text-slate-800">概要情報</h3>
        </div>
      }

      <div className={isItemPage ? "space-y-6" : "space-y-3"}> {/* 各情報ブロック間のスペースを統一 */}

        {(statuses && statuses.length > 0) && 
          <StatusBadgeArea 
            statuses={statuses}
          />
        }
        <HeldDate
          event={event}
        />
        <RoughLocationName
          roughLocationName={event["rough_location_name"]}
        />
        {(isItemPage && (myParticipant || useForEditForm)) && 
          <>
            {event["online_meeting_info"] && 
              <OnlineMeetingInfo onlineMeetingInfo={event["online_meeting_info"]}
            />}
          </>
        }
      </div>
    </div>
  );
}

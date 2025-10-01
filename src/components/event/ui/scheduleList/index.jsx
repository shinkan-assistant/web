import { getInputNameFromSchedule, judgeIsParticipating } from "../../utils";
import StatusBadgeList from "@/helpers/bases/ui/StatusBadgeList";
import uiSizeEnum from "@/helpers/bases/ui/const/enums/uiSize";
import TimeRange from "./TimeRange";
import Fee from "./Fee";
import Checkbox from "@/helpers/bases/form/ui/inputs/Checkbox";
import DetailedLocation from "./Location";

function ScheduleItem({pageInfo, schedule, belong, myParticipant, formHook}) {
  const scheduleForParticipant = myParticipant?.schedules.find(ps => ps["id"] === schedule["id"]) ?? null;

  let disabled;
  if (pageInfo.isForManage) {
    disabled = false;
  } else {
    if (pageInfo.isForm) {
      disabled = !formHook.inputValues[getInputNameFromSchedule(schedule)];
    } else {
      disabled = !judgeIsParticipating(schedule, {myParticipant});
    }
  }

  const statuses = [
    {fieldName: "cancel", title: "キャンセル済み"},
    {fieldName: "attendance", title: "出席済み"},
    {fieldName: "payment", title: "支払い済み"},
  ]
  .filter(
    status => scheduleForParticipant?.hasOwnProperty(status.fieldName)
  );

  return (
    <div className={`${!disabled ? "bg-white" : "bg-gray-100"} border border-gray-200 rounded-lg p-6 shadow-xl`}>
      <div className="mb-2">
        <h3 className={`text-xl sm:text-2xl font-extrabold ${!disabled ? "text-gray-900" : "text-gray-400"}`}>
          {schedule["title"]}
        </h3>
      </div>

      <div className={!disabled ? "text-gray-700" : "text-gray-400"}>
        {(!pageInfo.isForManage && pageInfo.isAfterApplying && !!scheduleForParticipant) && 
          <StatusBadgeList 
            statuses={statuses}
            disabled={disabled}
          />
        }
        
        {schedule.description && (
          <div className="mt-2">
            <p className="text-base leading-relaxed">
              {schedule["description"]}
            </p>
          </div>
        )}

        <div className="mt-4 space-y-2">
          <TimeRange 
            timeRange={schedule["time_range"]}
            disabled={disabled}
            size={uiSizeEnum.MD}
          />

          {(pageInfo.isAfterApplying && !!schedule["location"]) && 
            <DetailedLocation
              location={schedule["location"]}
              disabled={disabled}
              size={uiSizeEnum.MD}
            />
          }

          <Fee
            feesByBelong={schedule["fees_by_belong"]} 
            belong={belong}
            disabled={disabled}
            size={uiSizeEnum.MD}
          />
        </div>
        
        {!pageInfo.isForManage && pageInfo.isForm &&
          <div className="mt-4">
            <Checkbox {...formHook.getInputProps(getInputNameFromSchedule(schedule))} />
          </div>
        }
      </div>
    </div>
  );
}


export function EventScheduleList({
  pageInfo, allSchedules, belong, myParticipant, formHook
}) {
  return (
    <div>
      {!(!pageInfo.isForManage && pageInfo.isAfterApplying && pageInfo.isForm) && (
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 border-b-2 border-blue-200 pb-2">
          スケジュール
        </h2>
      )}

      <div className="space-y-6">
        {allSchedules.map((schedule) => (
          <ScheduleItem 
            key={schedule["id"]}
            pageInfo={pageInfo}
            schedule={schedule}
            belong={belong}
            myParticipant={myParticipant}
            formHook={formHook}
          />
        ))}
      </div>
    </div>
  );
}


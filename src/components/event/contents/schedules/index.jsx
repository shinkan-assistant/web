import { useFormContext } from "react-hook-form";

import { getInputNameFromSchedule, judgeIsParticipating } from "./utils";
import StatusBadgeArea from "@/helpers/components/ui/statusBadgeArea";
import TimeRange from "./TimeRange";
import Fee from "./Fee";
import Checkbox from "@/helpers/components/layouts/templates/form/inputs/Checkbox";
import Location from "./Location";

function ScheduleItem({
  schedule, 
  myUser, 
  myParticipant, 
  useForCheckForm, 
  useForEditForm,  
}) {
  let getValues;
  if (useForCheckForm || useForEditForm)
    getValues = useFormContext().getValues;

  // 参加状態のステータスバッジ
  let statuses;
  if (myParticipant && !useForEditForm) {
    const scheduleForParticipant = myParticipant?.schedules
      .find(ps => ps["id"] === schedule["id"]) ?? null;
    statuses = [
      {fieldName: "cancel", title: "キャンセル済み"},
      {fieldName: "attendance", title: "出席済み"},
      {fieldName: "payment", title: "支払い済み"},
    ].filter(
      status => scheduleForParticipant?.hasOwnProperty(status.fieldName)
    );
  }
  
  // 暗めに表示するかどうか（checkFormは入力に合わせて変化させる）
  let disabled;
  if (useForEditForm) 
    disabled = false;
  else {
    if (useForCheckForm)
      disabled = !getValues(getInputNameFromSchedule(schedule));
    else
      disabled = !judgeIsParticipating(schedule, {myParticipant});
  }

  return (
    <div className={`${!disabled ? "bg-white" : "bg-gray-100"} border border-gray-200 rounded-lg p-6 shadow-xl`}>
      <div className="mb-2">
        <h3 className={`text-xl sm:text-2xl font-extrabold ${!disabled ? "text-gray-900" : "text-gray-400"}`}>
          {schedule["title"]}
        </h3>
      </div>

      <div className={!disabled ? "text-gray-700" : "text-gray-400"}>
        {(statuses && statuses.length > 0) && 
          <StatusBadgeArea 
            statuses={statuses}
            disabled={disabled}
          />
        }
        
        {schedule["description"] && (
          // UI部品に置き換え可能
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
          />

          {(myParticipant && schedule["location"]) && 
            <Location
              location={schedule["location"]}
              disabled={disabled}
            />
          }

          <Fee
            feesByBelong={schedule["fees_by_belong"]} 
            belong={!useForEditForm && myUser["belong"]}
            useForEditForm={useForEditForm}
            disabled={disabled}
          />
        </div>
        
        {useForCheckForm &&
          <div className="mt-4">
            <Checkbox 
              name={getInputNameFromSchedule(schedule)}
              label={myParticipant 
                ? "参加しますか？（キャンセルならチェックを外す）" 
                : "参加しますか？"
              }
            />
          </div>
        }
      </div>
    </div>
  );
}

export function Schedules({
  myUser,
  event,
  myParticipant,
  useForEditForm,
  useForCheckForm,
}) {
  return (
    <div>
      {!useForCheckForm && (
        // UI部品に置き換え可能
        <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 border-b-2 border-blue-200 pb-2">
          スケジュール
        </h3>
      )}

      <div className="space-y-6">
        {event["schedules"].map((schedule) => (
          <ScheduleItem 
            key={schedule["id"]}
            schedule={schedule}
            myUser={myUser}
            myParticipant={myParticipant}
            useForEditForm={useForEditForm}
            useForCheckForm={useForCheckForm}
          />
        ))}
      </div>
    </div>
  );
}


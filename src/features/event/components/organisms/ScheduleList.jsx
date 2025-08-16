import {FeeTypeEnum} from "@/features/event/enums/data.js";
import { BlankLink } from "@/base/components/atoms/Link";
import { EventItemIcon } from "../atoms/TextItemIcon";
import { getInputNameFromSchedule, judgeIsParticipating } from "../utils";
import Input from "@/base/components/atoms/FormInput";
import { formatDateTime } from "@/base/utils";

class ScheduleItemMetaInfo {
  constructor(schedule, {pageMetaInfo, myParticipant, formHook, belong}) {
    this.page = pageMetaInfo;
    this.scheduleForParticipant = myParticipant?.schedules.find(ps => ps["id"] === schedule["id"]) ?? null;
    this.formHook = formHook;
    this.belong = belong;

    if (this.page.isManage) {
      this.isEnabled = true;
    } else {
      if (this.page.isFormForParticipant) {
        this.isEnabled = formHook.inputValues[getInputNameFromSchedule(schedule)];
      } else {
        this.isEnabled = judgeIsParticipating(schedule, {myParticipant});
      }
    }
  }
  
  getStatuses() {
    const allStatuses = [
      {fieldName: "cancel", title: "キャンセル済み"},
      {fieldName: "attendance", title: "出席済み"},
      {fieldName: "payment", title: "支払い済み"},
    ];
    return allStatuses.filter(
      status => this.scheduleForParticipant.hasOwnProperty(status.fieldName)
    );
  }
}

function ScheduleStatusBadge({status, metaInfo}) {
  return (
    <div
      className={`inline-flex items-center border bg-white ${metaInfo.DisplayForParticipating ? "border-gray-300" : "border-gray-200"} text-xs font-semibold px-2.5 py-0.5 rounded-full`}
    >
      {status.title}
    </div>
  )
}

function ScheduleStatusBadgeArea({metaInfo}) {
  if (!metaInfo.scheduleForParticipant) {
    return <></>;
  }

  const statuses = metaInfo.getStatuses();

  // const infos = allInfos.filter(info => participantSchedule.hasOwnProperty(info.fieldName));
  if (statuses.length === 0) {
    return <></>;
  }

  return (
    // ✅ バッジを横並びにするためのFlexboxコンテナ
    <div className="flex flex-wrap gap-2">
    {statuses.map(status => (
      <ScheduleStatusBadge key={status.fieldName} status={status} metaInfo={metaInfo} />
    ))}
  </div>
);
}

function ScheduleTimeRange({timeRange, metaInfo}) {
  function formatScheduleTime(datetimeString) {
    return formatDateTime(datetimeString, ({hour, minute}) => `${hour}:${minute}`);
  };
  
  const existsEndAt = Boolean(timeRange.end_at);
  const startAtStr = formatScheduleTime(timeRange.start_at);
  const endAtStr = formatScheduleTime(timeRange.end_at);
  
  return (
    <div className="flex items-center text-sm">
      {/* 開始時間のアイコンを色付きに */}
      <EventItemIcon.time 
        isDisabled={!metaInfo.isEnabled}
        className={"w-5 h-5 mr-2"}
      />
      <p>
        {existsEndAt && (<span className="font-semibold">開始:</span>)} {startAtStr}
      </p>
      {existsEndAt && (
        <p className="ml-4">
          <span className="font-semibold">終了:</span> {
            // isSameDayのロジックを削除し、常に完全な日付と時刻を表示
            endAtStr
          }
        </p>
      )}
    </div>
  );
}

function ScheduleLocation({location, metaInfo}) {
  return (
    <div className="flex items-start text-sm">
      {/* 場所のアイコンを色付きに */}
      <EventItemIcon.location
        isDisabled={!metaInfo.isEnabled}
        className={"w-5 h-5 mr-2 flex-shrink-0 mt-0.5"}
      />
      <div>
        <p><span className="font-semibold">場所:</span> {location.name}</p>
        {location.address && (
          <p><span className="font-semibold">住所:</span> {location.address}</p>
        )}
        {location.map_url && (
          <div className="mt-1 mb-[6px]">
            <BlankLink href={location.map_url} isDisabled={!metaInfo.isEnabled} paddingClassName={"px-[12px] py-[4px]"} >
              地図を見る
            </BlankLink>
          </div>
        )}
      </div>
    </div>
  );
}

function ScheduleFee({feesByBelong, metaInfo}) {
  const belong = metaInfo.belong;

  let feeInfo;
  if (feesByBelong === undefined || feesByBelong.length === 0) {
    feeInfo = {type: FeeTypeEnum.free};
  }
  else {
    for (let feeInfoTmp of feesByBelong) {
      if (JSON.stringify(feeInfoTmp.belong) === JSON.stringify(belong)) {
        feeInfo = feeInfoTmp;
        break;
      }
    }
  }

  if (!feeInfo) {
    feeInfo = Object.values(feesByBelong)[0];
  }

  return (
    <div className="flex items-start text-sm">
      {/* 参加費のアイコンを色付きに */}
      <EventItemIcon.fee 
        isDisabled={!metaInfo.isEnabled}
        className={"w-5 h-5 mr-2 flex-shrink-0 mt-0.5"}
      />
      <div>
        <h4 className="font-semibold inline-block mr-1">参加費:</h4> {/* inline-blockとmr-1で調整 */}
        {/* すべてのbelongについてのfeeを表示 */}
        <div  className="inline-block mr-2"> {/* 各料金項目をinline-blockで横並びに */}
          {/* 所属名は表示せず、料金とコメントのみ */}
          <span className="font-bold">
            {feeInfo.type === FeeTypeEnum.fixed ? `¥${feeInfo.fixed}` : feeInfo.type }
          </span>
          {feeInfo.comment && `（${feeInfo.comment}）`}
        </div>
      </div>
    </div>
  );
}

export function ScheduleItem({schedule, metaInfo}) {
  return (
    <div className={`${metaInfo.isEnabled ? "bg-white" : "bg-gray-100"} border border-gray-200 rounded-lg p-6 shadow-xl`}>
      <div className="mb-2">
        <h3 className={`text-xl sm:text-2xl font-extrabold ${metaInfo.isEnabled ? "text-gray-900" : "text-gray-400"}`}>
          {schedule.title}
        </h3>
      </div>

      <div className={metaInfo.isEnabled ? "text-gray-700" : "text-gray-400"}>
        {(metaInfo.page.isParticipant && metaInfo.isAfterApplying) && 
          <ScheduleStatusBadgeArea metaInfo={metaInfo} />
        }
        
        {schedule.description && (
          <div className="mt-2">
            <p className="text-base leading-relaxed">
              {schedule.description}
            </p>
          </div>
        )}

        <div className="mt-4 space-y-2">
          <ScheduleTimeRange timeRange={schedule.time_range} metaInfo={metaInfo} />

          {(metaInfo.isAfterApplying && schedule.location) && 
            <ScheduleLocation location={schedule.location} metaInfo={metaInfo} />
          }

          <ScheduleFee feesByBelong={schedule.fees_by_belong} metaInfo={metaInfo} />
        </div>
        
        {metaInfo.page.isFormForParticipant &&
          <div className="mt-4">
            <Input name={getInputNameFromSchedule(schedule)} formHook={metaInfo.formHook} />
          </div>
        }
      </div>
    </div>
  );
}

export function EventScheduleList({
  pageMetaInfo, allSchedules, belong, myParticipant, formHook
}) {
  return (
    <div>
      {!(pageMetaInfo.isParticipant && pageMetaInfo.isAfterApplying && pageMetaInfo.isFormForParticipant) && (
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 border-b-2 border-blue-200 pb-2">
          スケジュール
        </h2>
      )}

      <div className="space-y-6">
        {allSchedules.map((schedule) => (
          <ScheduleItem 
            key={schedule["id"]}
            schedule={schedule}
            metaInfo={new ScheduleItemMetaInfo(schedule, {pageMetaInfo, myParticipant, formHook, belong})}
          />
        ))}
      </div>
    </div>
  );
}


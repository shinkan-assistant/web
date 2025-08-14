import {FeeTypeEnum} from "@/features/event/enums/data.js";
import { BlankLink } from "@/base/components/atoms/Link";
import { EventItemIcon } from "../atoms/TextItemIcon";
import { EventPageTypeEnum, judgeFormPageForParticipant, judgePageForManage } from "../../enums/page";
import { getInputNameFromSchedule, judgeIsParticipating } from "../utils";
import Input from "@/base/components/atoms/FormInput";
import { formatDateTime } from "@/base/utils";

function ScheduleTimeRange({timeRange}) {
  function formatScheduleTime(datetimeString) {
    return formatDateTime(datetimeString, ({hour, minute}) => `${hour}:${minute}`);
  };
  
  const existsEndAt = Boolean(timeRange.end_at);
  const startAtStr = formatScheduleTime(timeRange.start_at);
  const endAtStr = formatScheduleTime(timeRange.end_at);
  
  return (
    <div className="flex items-center text-gray-700 text-sm">
      {/* 開始時間のアイコンを色付きに */}
      {EventItemIcon.time({className: "w-5 h-5 mr-2"})}
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

function ScheduleLocation({location}) {
  return (
    <div className="flex items-start text-gray-700 text-sm">
      {/* 場所のアイコンを色付きに */}
      {EventItemIcon.location({className: "w-5 h-5 mr-2 flex-shrink-0 mt-0.5"})}
      <div>
        <p><span className="font-semibold">場所:</span> {location.name}</p>
        {location.address && (
          <p><span className="font-semibold">住所:</span> {location.address}</p>
        )}
        {location.map_url && (
          <div className="mt-1 mb-[6px]">
            <BlankLink href={location.map_url} paddingClassName={"px-[12px] py-[4px]"} >
              地図を見る
            </BlankLink>
          </div>
        )}
      </div>
    </div>
  );
}

function ScheduleFee({feesByBelong, belong}) {
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
    <div className="flex items-start text-gray-700 text-sm">
      {/* 参加費のアイコンを色付きに */}
      {EventItemIcon.fee({className: "w-5 h-5 mr-2 flex-shrink-0 mt-0.5"})}
      <div>
        <h4 className="font-semibold inline-block mr-1">参加費:</h4> {/* inline-blockとmr-1で調整 */}
        {/* すべてのbelongについてのfeeを表示 */}
        <div  className="inline-block mr-2"> {/* 各料金項目をinline-blockで横並びに */}
          {/* 所属名は表示せず、料金とコメントのみ */}
          <span className="text-gray-700 font-bold">
            {feeInfo.type === FeeTypeEnum.fixed ? `¥${feeInfo.fixed}` : feeInfo.type }
          </span>
          {feeInfo.comment && `（${feeInfo.comment}）`}
        </div>
      </div>
    </div>
  );
}

export function ScheduleItem({
  pageType, schedule, belong, 
  myParticipant, // isFormPageForParticipant === false の場合に必要
  formHook // isFormPageForParticipant === true の場合に必要
}) {
  const isFormPageForParticipant = judgeFormPageForParticipant(pageType)
  const publicLocation = pageType === EventPageTypeEnum.apply;
  const isPageForManage = judgePageForManage(pageType);

  let isParticipating;
  if (!isPageForManage) {
    if (isFormPageForParticipant) {
      isParticipating = formHook.inputValues[getInputNameFromSchedule(schedule)];
    } else {
      isParticipating = judgeIsParticipating(schedule, {myParticipant});
    }
  }

  // 詳細ページで、参加しないイベントをグレーにする
  return (
    <div className={`${(isPageForManage || isParticipating) ? "bg-white" : "bg-gray-200"} border border-gray-200 rounded-lg p-6 shadow-xl`}>
      <div className="mb-2">
        <h3 className="text-xl sm:text-2xl font-extrabold text-gray-900">
          {schedule.title}
        </h3>
      </div>
      
      {schedule.description && (
        <div className="mt-2">
          <p className="text-gray-700 text-base leading-relaxed">
            {schedule.description}
          </p>
        </div>
      )}

      <div className="mt-4 space-y-2">
        <ScheduleTimeRange timeRange={schedule.time_range} />

        {(schedule.location && publicLocation) && 
          <ScheduleLocation location={schedule.location} />
        }

        <ScheduleFee feesByBelong={schedule.fees_by_belong} belong={belong} />
      </div>
      
      {isFormPageForParticipant &&
        <div className="mt-4">
          <Input name={getInputNameFromSchedule(schedule)} formHook={formHook} />
        </div>
      }
    </div>
  );
}

export function EventScheduleList({
  pageType, allSchedules, belong, 
  myParticipant, // isFormPageForParticipant === false の場合に必要
  formHook // isFormPageForParticipant === true の場合に必要
}) {
  const isDetailEditPage = pageType === EventPageTypeEnum.detailEdit;

  return (
    <div>
      {!isDetailEditPage && (
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 border-b-2 border-blue-200 pb-2">
          スケジュール
        </h2>
      )}

      <div className="space-y-6">
        {allSchedules.map((schedule) => (
          <ScheduleItem 
            key={schedule["id"]}
            pageType={pageType}
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


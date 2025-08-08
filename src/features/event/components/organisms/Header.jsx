import { Badge } from "@/base/components/atoms/Badge";
import { EventPageTypeEnum } from "../../enums/page";

function EventBadgeList({event, textSizeClass}) {
  const badgeInfos = [];

  if (event["is_organizer"]) {
    badgeInfos.push({
      key: "organizer",
      text: "運営者",
      bgColorClass: "bg-red-100",
      textColorClass: "text-red-800",
    });
  }

  badgeInfos.push(
    {
      key: "event-type",
      text: event.type,
      bgColorClass: "bg-sky-100",
      textColorClass: "text-sky-800",
    }
  );

  return (
    <div className="flex gap-x-2">
      {badgeInfos.map((badgeInfo) => (
        <Badge 
          key={badgeInfo.key}
          text={badgeInfo.text} 
          bgColorClass={badgeInfo.bgColorClass} 
          textColorClass={badgeInfo.textColorClass} 
          textSizeClass={textSizeClass} />
      ))}
    </div>
  );
}

export default function EventHeader({pageType, event}) {
  const isForList = pageType === EventPageTypeEnum.list;
  const isForApply = pageType === EventPageTypeEnum.apply;

  return (
    <div>
      <div className={isForList ? "mb-2" : "mb-3"}>
        <h1 className={`text-gray-900 ${isForList ? "text-2xl font-bold truncate" : "text-3xl sm:text-4xl font-extrabold"}`}>
          <span>{event.title}</span>
          {isForApply && <span>申し込みフォーム</span>}
        </h1>
      </div>

      <EventBadgeList event={event} textSizeClass={isForList ? "text-xs" : "text-sm"} />
    </div>
  );
}

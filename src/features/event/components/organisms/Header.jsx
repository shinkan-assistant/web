import { EventPageTypeEnum } from "../../enums/page";

export default function EventHeader({pageType, event}) {
  const isForList = pageType === EventPageTypeEnum.list;
  const isForApply = pageType === EventPageTypeEnum.apply;

  return (
    <div>
      <div className={isForList ? "mb-2" : "mb-4"}>
        <h1 className={`text-gray-900 flex flex-col gap-y-4 ${isForList ? "text-2xl font-bold truncate" : "text-3xl sm:text-4xl font-extrabold"}`}>
          <div>{event.title}</div>
          {isForApply && <div>申し込みフォーム</div>}
        </h1>
      </div>
    </div>
  );
}

import { EventPageTypeEnum } from "../../enums/page";

export default function EventHeader({pageType, event}) {
  const isListPage = pageType === EventPageTypeEnum.list;
  const isApplyPage = pageType === EventPageTypeEnum.apply;

  return (
    <div>
      <div className={isListPage ? "mb-2" : "mb-4"}>
        <h1 className={`text-gray-900 flex flex-col gap-y-4 ${isListPage ? "text-2xl font-bold truncate" : "text-3xl sm:text-4xl font-extrabold"}`}>
          <div>{event.title}</div>
          {isApplyPage && <div>申し込みフォーム</div>}
        </h1>
      </div>
    </div>
  );
}

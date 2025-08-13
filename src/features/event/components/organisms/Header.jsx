import Link from 'next/link';
import { EventPageTypeEnum } from "../../enums/page";

function LinkIcon({pageType, event}) {
  const info = {
    [EventPageTypeEnum.detail]: {
      href: `/events/detail/${event.id}/edit`,
      label: "スケジュール変更 / キャンセル",
    },
    [EventPageTypeEnum.detailEdit]: {
      href: `/events/detail/${event.id}`,
      label: "編集キャンセル"
    },
  }[pageType];

  return (
    <Link
      href={info.href}
      className="ml-4 px-4 py-2 text-sm font-semibold rounded-lg text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
    >
      {info.label}
    </Link>
  );
}

function EventTitle({pageType, event}) {
  const isListPage = pageType === EventPageTypeEnum.list;
  const subTitle = {
    [EventPageTypeEnum.apply]: "申し込みフォーム",
    [EventPageTypeEnum.detailEdit]: "スケジュール変更 / キャンセル",
    [EventPageTypeEnum.manage]: "管理画面",
  }[pageType] ?? null;

  return (
    <h1 className={`text-gray-900 flex flex-col gap-y-4 ${isListPage ? "font-bold truncate" : "font-extrabold"}`}>
      <div className={isListPage ? "text-2xl" : "text-3xl sm:text-4xl"}>{event.title}</div>
      {subTitle && <div className="text-xl sm:text-2xl">{subTitle}</div>}
    </h1>
  );
}

export default function EventHeader({pageType, event}) {
  const hasLinkIcon = [EventPageTypeEnum.detail, EventPageTypeEnum.detailEdit]
    .includes(pageType)

  return (
    <div>
      <div className="flex items-center justify-between">
        <EventTitle pageType={pageType} event={event} />
        {hasLinkIcon && <LinkIcon pageType={pageType} event={event} />}
      </div>
    </div>
  );
}
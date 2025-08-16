import Link from 'next/link';
import { EventPageTypeEnum } from "../../enums/page";

function EventTitle({event, pageMetaInfo}) {
  const subTitle = {
    [EventPageTypeEnum.apply]: "申し込みフォーム",
    [EventPageTypeEnum.detailEdit]: "スケジュール変更 / キャンセル",
    [EventPageTypeEnum.manage]: "管理画面",
  }[pageMetaInfo.Type] ?? null;

  return (
    <h1 className={`text-gray-900 flex flex-col gap-y-4 ${pageMetaInfo.isList ? "font-bold truncate" : "font-extrabold"}`}>
      <div className={pageMetaInfo.isList ? "text-2xl" : "text-3xl sm:text-4xl"}>{event.title}</div>
      {subTitle && <div className="text-xl sm:text-2xl">{subTitle}</div>}
    </h1>
  );
}

function SubNavLink({info}) {
  return (
    <Link
      href={info.href}
      className="px-4 py-2 text-sm font-semibold rounded-lg text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
    >
      {info.text}
    </Link>
  );
}

function SubNavMenu({ infos }) {
  return (
    <div className="flex justify-start items-center gap-x-4">
      {infos.map((info, index) => (
        <SubNavLink key={index} info={info} />
      ))}
    </div>
  );
}

export default function EventHeader({pageMetaInfo, event, subNavInfos}) {
  return (
    <div>
      <div className="flex flex-col space-y-6">
        <EventTitle event={event} pageMetaInfo={pageMetaInfo} />
        { !pageMetaInfo.isList && 
          <SubNavMenu infos={subNavInfos} />
        }
      </div>
    </div>
  );
}
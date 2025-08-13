import Link from 'next/link';
import { EventPageTypeEnum } from "../../enums/page";
import EditIcon from '@/base/components/atoms/EditIcon';
import CancelIcon from '@/base/components/atoms/CancelIcon';

function LinkIcon({pageType, event}) {
  const info = {
    [EventPageTypeEnum.detail]: {
      href: `/events/detail/${event.id}/edit`,
      Icon: EditIcon,
    },
    [EventPageTypeEnum.detailEdit]: {
      href: `/events/detail/${event.id}`,
      Icon: CancelIcon,
    },
  }[pageType];

  return (
    <Link href={info.href} className="ml-4 p-2 text-gray-500 hover:text-sky-600 transition-colors duration-200">
      {/* ✅ 手作りのSVGペンマークアイコン */}
      <info.Icon size={24} />
    </Link>
  );
}

export default function EventHeader({pageType, event}) {
  const isListPage = pageType === EventPageTypeEnum.list;
  const isApplyPage = pageType === EventPageTypeEnum.apply;

  const hasLinkIcon = [EventPageTypeEnum.detail, EventPageTypeEnum.detailEdit]
    .includes(pageType)

  return (
    <div>
      <div className={isListPage ? "mb-2" : "mb-4"}>
        <div className="flex items-center justify-between">
          <h1 className={`text-gray-900 flex flex-col gap-y-4 ${isListPage ? "text-2xl font-bold truncate" : "text-3xl sm:text-4xl font-extrabold"}`}>
            <div>{event.title}</div>
            {isApplyPage && <div>申し込みフォーム</div>}
          </h1>
          {hasLinkIcon && <LinkIcon pageType={pageType} event={event} />}
        </div>
      </div>
    </div>
  );
}
import Link from "next/link";
import { EventFilterEnum } from "@/features/event/enums/page";

export default function EventListItemLink({event, filter}) {
  let url, text;
  if (filter === EventFilterEnum.participating) {
    url = `/events/detail/${event.id}`;
    text = "詳細を見る";
  }
  else if (filter === EventFilterEnum.registrable) {
    url = `/events/apply/${event.id}`;
    text = "申し込む";
  }
  else if (filter === EventFilterEnum.organizer) {
    url = `/events/manage/${event.id}`;
    text = "管理する";
  }

  return (
    <Link 
      href={url}
      className="block text-center w-full bg-sky-600 text-white py-2.5 px-4 rounded-lg hover:bg-sky-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-opacity-50 font-medium text-lg"
    >
      {text}
    </Link>
  );
}

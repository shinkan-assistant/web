import Link from "next/link";
import { EventFilterEnum, EventTypeEnum } from "@/data/enums/event.js";
import { EventBadgeList, EventItemIcon } from "./ui";

function EventHeader({event}) {
  return (
    <div>
      <div className="mb-2">
        <h1 className="text-2xl font-bold text-gray-900 truncate">
          {event.title}
        </h1>
      </div>
      <EventBadgeList event={event} myRole={event.myRole} textSizeClass="text-xs" />
    </div>
  );
}

function EventDate({event}) {
  const date = new Date(event.schedules[0].time_range.start_at)
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // 月は0から始まるため+1
  const day = date.getDate();
  const formattedDate = `${year}年${month}月${day}日`;

  return (
    <p className="text-gray-700 text-base flex items-center">
      {EventItemIcon.date({className: "h-5 w-5 mr-2"})}
      {formattedDate}
    </p>
  );
}

function EventLocation({event}) {
  let displayLocation;
  if (event.type == EventTypeEnum.in_person)
    displayLocation = event.rough_location_name;
  else if (event.type === EventTypeEnum.online)
    displayLocation = `オンライン開催`;
  
  return (
    <p className="text-gray-700 text-base flex items-center">
      {EventItemIcon.location({className: "h-5 w-5 mr-2"})}
      {displayLocation}
    </p>
  );
}

function EventItemLink({event, filter}) {
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

export default function EventList({events, filter}) {
  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
      {events.map((event) => (
        <div
          key={event.id}
          className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 p-6"
        >
          <div className="mb-4">
            <EventHeader event={event} />
          </div>
          
          <div className="mb-2">
            <EventDate event={event} />
          </div>

          <div className="mb-4">
            <EventLocation event={event} />
          </div>

          <div>
            <EventItemLink event={event} filter={filter} />
          </div>
        </div>
      ))}
    </div>
  );
}

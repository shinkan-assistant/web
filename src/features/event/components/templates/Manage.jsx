import ItemContainer from "@/base/components/containers/Item";
import EventHeader from "@/features/event/components/organisms/Header";
import EventSummary from "@/features/event/components/organisms/Summary";
import { EventScheduleList } from "@/features/event/components/organisms/ScheduleList";
import { EventPageTypeEnum } from "@/features/event/enums/page";

export default function EventManageTemplate({ event }) {
  return (
    <ItemContainer>
      <div className="ml-3 mb-4">
        <EventHeader pageType={EventPageTypeEnum.manage} event={event} />
      </div>

      <div className="mb-8">
        <EventSummary pageType={EventPageTypeEnum.manage} event={event} />
      </div>

      <EventScheduleList 
        pageType={EventPageTypeEnum.manage} 
        allSchedules={event.schedules}
      />
    </ItemContainer>
  );
}

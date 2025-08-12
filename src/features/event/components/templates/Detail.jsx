import ItemContainer from "@/base/components/containers/Item";
import EventHeader from "@/features/event/components/organisms/Header";
import EventSummary from "@/features/event/components/organisms/Summary";
import { EventScheduleList } from "@/features/event/components/organisms/ScheduleList";
import { EventPageTypeEnum } from "@/features/event/enums/page";

export default function EventDetailTemplate({ event, myUserMetadata }) {
  const allSchedules = event.schedules;
  const participatingScheduleIds = event.myParticipant.schedules.map(ps => ps["id"]);

  return (
    <ItemContainer>
      <div className="ml-3 mb-4">
        <EventHeader pageType={EventPageTypeEnum.detail} event={event} />
      </div>

      <div className="mb-8">
        <EventSummary pageType={EventPageTypeEnum.detail} event={event} />
      </div>

      <EventScheduleList 
        pageType={EventPageTypeEnum.detail} 
        allSchedules={allSchedules}
        participatingScheduleIds={participatingScheduleIds}
        belong={myUserMetadata["belong"]} 
        publicLocation={true} 
      />
    </ItemContainer>
  );
}

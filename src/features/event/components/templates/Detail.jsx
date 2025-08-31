import ItemContainer from "@/base/features/content/components/layouts/Item";
import EventSummary from "@/features/event/components/sections/Summary";
import { EventScheduleList } from "@/features/event/components/sections/ScheduleList";

export default function EventDetailTemplate({ pageInfo, event, myUser, myParticipant }) {
  return (
    <ItemContainer pageInfo={pageInfo}>
      <div className="mb-8">
        <EventSummary 
          pageInfo={pageInfo}
          event={event}
        />
      </div>

      <EventScheduleList 
        pageInfo={pageInfo}
        allSchedules={event["schedules"]}
        belong={myUser["belong"]} 
        myParticipant={myParticipant}
      />
    </ItemContainer>
  );
}

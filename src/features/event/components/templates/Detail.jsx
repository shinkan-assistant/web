import ItemContainer from "@/base/features/content/components/layouts/Item";
import EventSummary from "@/features/event/components/ui/summary";
import { EventScheduleList } from "@/features/event/components/ui/scheduleList";

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

import ItemContainer from "@/helpers/bases/content/layouts/Item";
import EventSummary from "@/components/event/ui/summary";
import { EventScheduleList } from "@/components/event/ui/scheduleList";

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

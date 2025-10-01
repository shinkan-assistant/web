import ItemContainer from "@/helpers/components/layouts/templates/item";
import EventSummary from "@/features/event/components/contents/summary";
import { EventScheduleList } from "@/features/event/components/contents/schedules";

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

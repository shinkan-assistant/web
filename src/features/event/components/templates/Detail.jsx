import ItemContainer from "@/helpers/components/layouts/templates/item";
import Summary from "@/features/event/components/contents/summary";
import { Schedules } from "@/features/event/components/contents/schedules";

export default function EventDetailTemplate({ pageInfo, event, myUser, myParticipant }) {
  return (
    <ItemContainer pageInfo={pageInfo}>
      <div className="mb-8">
        <Summary 
          event={event}
          myParticipant={myParticipant}
          isItemPage={true}
        />
      </div>

      <Schedules 
        event={event}
        myUser={myUser}
        myParticipant={myParticipant}
      />
    </ItemContainer>
  );
}

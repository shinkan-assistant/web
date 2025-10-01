import { ListContainer, ListItemContainer } from "@/helpers/components/layouts/main/list";
import EventSummary from "@/features/event/components/contents/summary";

export default function EventsTemplate({ pageInfo, events }) {
  return (
    <ListContainer>
      {events.map((event) => (
        <ListItemContainer key={event["id"]} pageInfo={pageInfo} record={event} >
          <EventSummary 
            pageInfo={pageInfo}
            event={event}
          />
        </ListItemContainer>
      ))}
    </ListContainer>
  );
}
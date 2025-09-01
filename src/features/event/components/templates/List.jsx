import { ListContainer, ListItemContainer } from "@/base/features/content/components/layouts/List";
import EventSummary from "@/features/event/components/ui/summary";

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
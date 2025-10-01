import { ListContainer, ListItemContainer } from "@/helpers/bases/content/layouts/List";
import EventSummary from "@/components/event/ui/summary";

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
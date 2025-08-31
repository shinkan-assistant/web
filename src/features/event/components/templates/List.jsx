import { ListContainer, ListItemContainer } from "@/base/page/content/components/containers/List";
import EventSummary from "@/features/event/components/organisms/Summary";

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
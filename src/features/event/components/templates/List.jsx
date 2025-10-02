import { ListContainer, ListItemContainer } from "@/helpers/components/layouts/templates/list";
import Summary from "@/features/event/components/contents/summary";

export const EventsPageFilterEnum = Object.freeze({
  participating: "participating",
  apply: "apply",
  manage: "manage",
});

export default function EventsTemplate({ pageInfo, events }) {
  return (
    <ListContainer>
      {events.map((event) => (
        <ListItemContainer key={event["id"]} pageInfo={pageInfo} record={event} >
          <Summary 
            event={event}
            isItemPage={false}
          />
        </ListItemContainer>
      ))}
    </ListContainer>
  );
}
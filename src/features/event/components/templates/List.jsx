import { EventPageTypeEnum } from "../../enums/page";
import { ListContainer, ListItemContainer } from "@/base/components/containers/List";
import EventHeader from "@/features/event/components/organisms/Header";
import EventSummary from "@/features/event/components/organisms/Summary";
import EventListItemLink from "@/features/event/components/organisms/ItemLink";

export default function EventsTemplate({ events, filter }) {
  return (
    <ListContainer>
      {events.map((event) => (
        <ListItemContainer key={event.id} >
          <div className="mb-4">
            <EventHeader pageType={EventPageTypeEnum.list} event={event} />
          </div>
          
          <div className="mb-4">
            <EventSummary pageType={EventPageTypeEnum.list} event={event} />
          </div>

          <div>
            <EventListItemLink event={event} filter={filter} />
          </div>
        </ListItemContainer>
      ))}
    </ListContainer>
  );
}
import { EventPageTypeEnum, EventPageMetaInfo } from "../../enums/page";
import { ListContainer, ListItemContainer } from "@/base/components/containers/List";
import EventSummary from "@/features/event/components/organisms/Summary";
import EventListItemLink from "@/features/event/components/organisms/ItemLink";
import ContentHeader from "@/base/components/molecules/ContentHeader";

export default function EventsTemplate({ events, filter }) {
  const metaInfo = new EventPageMetaInfo(EventPageTypeEnum.list);

  return (
    <ListContainer>
      {events.map((event) => (
        <ListItemContainer key={event.id} >
          <div className="mb-4">
            <ContentHeader
              pageInfo={metaInfo}
              title={event["title"]}
            />
          </div>
          
          <div className="mb-4">
            <EventSummary 
              pageMetaInfo={metaInfo}
              event={event}
            />
          </div>

          <div>
            <EventListItemLink 
              event={event} 
              filter={filter}
            />
          </div>
        </ListItemContainer>
      ))}
    </ListContainer>
  );
}
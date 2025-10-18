import { ListTemplateLayout, ListItemTemplateLayout } from "@/helpers/components/layouts/templates/list";
import Summary from "@/components/event/contents/summary";

export const EventsPageFilterEnum = Object.freeze({
  participating: "participating",
  apply: "apply",
  edit: "edit",
});

function genItemLink(filter, id) {
  switch (filter) {
    case EventsPageFilterEnum.participating:
      return {
        href: `/events/${id}`,
        text: "詳細を見る",
      };
    case EventsPageFilterEnum.apply:
      return {
        href: `/events/${id}/apply`,
        text: "申し込む",
      };
    case EventsPageFilterEnum.edit:
      return {
        href: `/events/${id}/edit`,
        text: "編集する",
      };
  }
}

export default function EventsTemplate({ filter, events, myParticipants }) {
  return (
    <ListTemplateLayout>
      {events.map((event) => (
        <ListItemTemplateLayout 
          key={event["id"]} 
          title={event["title"]}
          itemLink={genItemLink(filter, event["id"])}
        >
          <Summary 
            event={event}
            isItemPage={false}
            filter={filter}
            myParticipant={myParticipants.find(p => p["event_id"] === event["id"])}
          />
        </ListItemTemplateLayout>
      ))}
    </ListTemplateLayout>
  );
}
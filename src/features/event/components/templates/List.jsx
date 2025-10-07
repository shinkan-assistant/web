import { ListTemplateLayout, ListItemTemplateLayout } from "@/helpers/components/layouts/templates/list";
import Summary from "@/features/event/components/contents/summary";

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
        text: "詳細を見る",
      };
    case EventsPageFilterEnum.edit:
      return {
        href: `/events/${id}/edit`,
        text: "詳細を見る",
      };
  }
}

export default function EventsTemplate({ filter, events }) {
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
          />
        </ListItemTemplateLayout>
      ))}
    </ListTemplateLayout>
  );
}
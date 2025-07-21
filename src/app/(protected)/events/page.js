import mockEvents from "@/data/mock/event";
import EventList from "@/components/app/events/List";

export default function Events() {
  return (
    <EventList events={mockEvents} />
  );
}

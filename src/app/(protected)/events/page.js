import mockEvents from "@/data/mock/event";
import EventDashboard from "@/components/app/events/Dashboard";

export default function Events() {
  return (
    <EventDashboard events={mockEvents} />
  );
}

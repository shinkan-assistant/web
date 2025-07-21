import mockEvents from "@/data/mock/event";
import EventList from "@/components/app/events/List";
import { RoleEnum } from "@/data/enums/participant";

export default function Events() {
  const roleName = RoleEnum.organizer;
  return (
    <EventList events={mockEvents} mockRoleName={roleName} />
  );
}

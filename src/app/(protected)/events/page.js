import EventList from "@/components/app/events/List";
import { RoleEnum } from "../../../../data/enums/participant.mjs";
import mockEvents from "@/../data/mock/event";

export default async function Events() {
  const roleName = RoleEnum.organizer;
  return (
    <EventList events={mockEvents} mockRoleName={roleName} />
  );
}

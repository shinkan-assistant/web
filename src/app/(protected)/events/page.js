'use client';

import EventList from "@/components/app/events/List";
import { RoleEnum } from "@/data/enums/participant.js";
import mockEvents from "@/data/mock/event";

export default function Events() {
  const roleName = RoleEnum.organizer;
  return (
    <EventList events={mockEvents} mockRoleName={roleName} />
  );
}

'use client';

import { EventDetail } from "@/components/app/events/Detail";
import { RoleEnum } from "@/data/enums/participant";
import { BelongEnum } from "@/data/enums/user";
import mockEvents from "@/data/mock/event";
import React from "react";

export default function EventItem({ params }) {
  const resolvedParams = React.use(params);
  const { id } = resolvedParams;

  const event = mockEvents.find((event) => id === event.id)
  const belongName = BelongEnum.freshman;
  const roleName = RoleEnum.organizer;

  return (
    <EventDetail event = {event} belongName={belongName} roleName={roleName} />
  );
}

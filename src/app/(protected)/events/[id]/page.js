'use client';

import { EventDetail } from "@/components/app/events/Detail";
import mockEvents from "@/data/mock/event";
import React from "react";

export default function EventItem({ params }) {
  const resolvedParams = React.use(params);
  const { id } = resolvedParams;

  const event = mockEvents[0]
  const belongName = "新入生";
  const roleName = "参加者";

  return (
    <EventDetail event = {event} belongName={belongName} roleName={roleName} />
  );
}

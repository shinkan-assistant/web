'use client';

import { useRouter, useSearchParams } from "next/navigation";
import { EventFilterEnum, } from "@/features/event/enums/page";
import EventsTemplate from "@/features/event/components/templates/List";
import { useEffect, useState } from "react";
import { useMyUserData } from "@/features/user/stores/myUserData";
import { useAllEvents } from "@/features/event/stores/allEvents";
import { useMyParticipants } from "@/features/participant/stores/myParticipants";

export default function Events() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const filter = searchParams.get("filter");

  const myUserData = useMyUserData();
  const allEvents = useAllEvents();
  const myParticipants = useMyParticipants();

  const [targetEvents, setTargetEvents] = useState(null);

  useEffect(() => {
    if (!Object.values(EventFilterEnum).includes(filter)) {
      router.push(`/events?filter=${EventFilterEnum.participating}`);
      return;
    }

    if (!myUserData || !allEvents || !myParticipants) {
      setTargetEvents(null);
      return;
    }
    
    if (filter === EventFilterEnum.manage && !myUserData["belong"]["is_member"]) {
      router.push(`/events?filter=${EventFilterEnum.participating}`);
      return;
    }

    const targetEventsFilterFunc = {
      [EventFilterEnum.participating]: (e) => {
        return myParticipants.some(mp => e["id"] === mp["event_id"])
      },
      [EventFilterEnum.apply]: (e) => {
        return myParticipants.every(mp => e["id"] !== mp["event_id"])
      },
      [EventFilterEnum.manage]: (e) => {
        if (myUserData["is_admin"]) 
          return true;
        return myParticipants.some(mp => e["id"] === mp["event_id"] && mp["is_organizer"]);
      }
    }[filter];

    setTargetEvents(allEvents.filter(targetEventsFilterFunc));
    
  }, [router, filter, myUserData, allEvents, myParticipants]);

  if (!targetEvents || !filter) {
    return <div>読み込み中です</div>
  }

  return (
    <EventsTemplate
      events={targetEvents}
      filter={filter}
    />
  );
}

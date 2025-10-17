'use client';

import { useRouter, useSearchParams } from "next/navigation";
import EventsTemplate, { EventsPageFilterEnum } from "@/components/event/templates/List";
import { useEffect, useState } from "react";
import { useMyUser } from "@/stores/contexts/myUser";
import { useEvents } from "@/stores/contexts/events";
import { useMyParticipants } from "@/stores/contexts/myParticipants";

export default function Events() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const filter = searchParams.get("filter");

  const myUser = useMyUser();
  const events = useEvents();
  const myParticipants = useMyParticipants();

  const [targetEvents, setTargetEvents] = useState(null);

  useEffect(() => {
    if (!Object.values(EventsPageFilterEnum).includes(filter)) {
      router.push(`/events?filter=${EventsPageFilterEnum.participating}`);
      return;
    }

    console.log(myUser, events, myParticipants);

    if (!myUser || !events || !myParticipants) {
      setTargetEvents(null);
      return;
    }
    
    if (filter === EventsPageFilterEnum.edit && !myUser["belong"]["is_member"]) {
      router.push(`/events?filter=${EventsPageFilterEnum.participating}`);
      return;
    }

    const targetEventsFilterFunc = {
      [EventsPageFilterEnum.participating]: (e) => {
        return myParticipants.some(mp => e["id"] === mp["event_id"])
      },
      [EventsPageFilterEnum.apply]: (e) => {
        return myParticipants.every(mp => e["id"] !== mp["event_id"])
      },
      [EventsPageFilterEnum.edit]: (e) => {
        if (myUser["is_admin"]) 
          return true;
        return myParticipants.some(mp => e["id"] === mp["event_id"] && mp["is_organizer"]);
      }
    }[filter];

    setTargetEvents(events.filter(targetEventsFilterFunc));
  }, [router, filter, myUser, events, myParticipants]);

  console.log(targetEvents, filter);
  if (!targetEvents || !filter) {
    return <div>読み込み中です</div>
  }

  return (
    <EventsTemplate
      filter={filter}
      events={targetEvents}
    />
  );
}

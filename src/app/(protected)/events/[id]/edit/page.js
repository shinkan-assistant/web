'use client';

import EventManageTemplate from "@/components/event/templates/Edit";
import { notFound, useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useMyUser } from "@/stores/contexts/myUser";
import { useEvents } from "@/stores/contexts/events";
import { useMyParticipants } from "@/stores/contexts/myParticipants";
import { EventsPageFilterEnum } from "@/components/event/templates/List";

export default function EventManage() {
  const router = useRouter();
  const { id } = useParams();

  const myUser = useMyUser();
  const events = useEvents();
  const myParticipants = useMyParticipants();

  const [event, setEvent] = useState(null);
  
  useEffect(() => {
    if (!myUser || !events || !myParticipants) {
      setEvent(null);
      return;
    }
    if (!myUser["belong"]["is_member"]) {
      setTargetParticipants(null);
      return;
    }

    const eventTmp = events.find(e => id === e["id"]);
    if (!eventTmp) 
      notFound();
    setEvent(eventTmp);

    const myParticipantTmp = myParticipants.find(mp => id === mp["event_id"]);
    if (!myUser["is_admin"] && !myParticipantTmp?.["is_organizer"]) {
      router.push(`/events?filter=${EventsPageFilterEnum.edit}`);
      return;
    }
  }, [router, id, myUser, events, myParticipants]);

  if (!event) {
    return <div>読み込み中です</div>
  }

  return (
    <EventManageTemplate 
      event={event}
    />
  );
}

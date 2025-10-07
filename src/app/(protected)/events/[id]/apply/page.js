'use client';

import { notFound, useParams, useRouter } from "next/navigation";
import EventApplyTemplate from "@/features/event/components/templates/Apply";
import { useEffect, useState } from "react";
import { useMyUser } from "@/stores/contexts/myUser";
import { useMyParticipants } from "@/stores/contexts/myParticipants";
import { useEvents } from "@/stores/contexts/events";
import { toast } from "react-toastify";
import { EventsPageFilterEnum } from "@/features/event/components/templates/List";

export default function EventApply() {
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

    const eventTmp = events.find(e => id === e["id"]);
    if (!eventTmp) 
      notFound();

    const myParticipantTmp = myParticipants.find(mp => id === mp["event_id"]);
    if (myParticipantTmp) {
      toast.warn(`すでに${eventTmp["title"]}に申し込んでいます`);
      router.push(`/events?filter=${EventsPageFilterEnum.apply}`);
      return;
    }

    setEvent(eventTmp);
  }, [router, id, myUser, events, myParticipants]);

  if (!myUser || !event) {
    return <div>読み込み中です</div>
  }

  return (
    <EventApplyTemplate 
      event={event}
      myUser={myUser}
    />
  );
}

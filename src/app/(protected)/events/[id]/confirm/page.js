'use client';

import { notFound, useParams, useRouter } from "next/navigation";
import EventConfirmTemplate from "@/components/event/templates/Confirm";
import { useEffect, useState } from "react";
import { useMyUser } from "@/stores/contexts/myUser";
import { useEvents } from "@/stores/contexts/events";
import { useMyParticipants } from "@/stores/contexts/myParticipants";
import { EventsPageFilterEnum } from "@/components/event/templates/List";
import judgeMyParticipantStatus from "@/components/event/utils/myParticipantStatus";
import { toast } from "react-toastify";

export default function EventConfirm() {
  const router = useRouter();
  const { id } = useParams();

  const myUser = useMyUser();
  const events = useEvents();
  const myParticipants = useMyParticipants();

  const [event, setEvent] = useState(null);
  const [myParticipant, setMyParticipant] = useState(null);
  
  useEffect(() => {
    if (!myUser || !events || !myParticipants) {
      setEvent(null);
      return;
    }

    const eventTmp = events.find(e => id === e["id"]);
    if (!eventTmp) 
      notFound();

    const myParticipantTmp = myParticipants.find(mp => id === mp["event_id"]);
    if (!myParticipantTmp) {
      toast.warn(`まだ${eventTmp["title"]}に申し込んでいません`);
      router.push(`/events?filter=${EventsPageFilterEnum.participating}`);
      return;
    }

    if (judgeMyParticipantStatus(myParticipantTmp, "cancel")) {
      toast.warn(`${eventTmp["title"]}はキャンセル済みです`);
      router.push(`/events/${id}`);
      return;
    }

    setEvent(eventTmp);
    setMyParticipant(myParticipantTmp);
  }, [router, id, myUser, events, myParticipants]);

  if (!myUser || !event || !myParticipant) {
    return <div>読み込み中です</div>
  }
  
  return (
    <EventConfirmTemplate
      event={event} 
      myUser={myUser} 
      myParticipant={myParticipant} 
    />
  );
}

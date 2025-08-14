'use client';

import { notFound, useParams, useRouter } from "next/navigation";
import EventApplyTemplate from "@/features/event/components/templates/Apply";
import { EventFilterEnum } from "@/features/event/enums/page";
import { useEffect, useState } from "react";
import { useMyUserData } from "@/features/user/stores/myUserData";
import { useMyParticipants } from "@/features/participant/stores/myParticipants";
import { useAllEvents } from "@/features/event/stores/allEvents";

export default function EventApply() {
  const router = useRouter();
  const { id } = useParams();

  const myUserData = useMyUserData();
  const allEvents = useAllEvents();
  const myParticipants = useMyParticipants();
  
  const [event, setEvent] = useState(null);

  useEffect(() => {
    if (!myUserData || !allEvents || !myParticipants) {
      setEvent(null);
      return;
    }

    const eventTmp = allEvents.find(e => id === e["id"]);
    if (!eventTmp) 
      notFound();
    setEvent(eventTmp);

    const myParticipantTmp = myParticipants.find(mp => id === mp["event_id"]);
    if (myParticipantTmp) {
      // TODO 通知：すでに申し込んでいます
      router.push(`/events?filter=${EventFilterEnum.apply}`);
      return;
    }
  }, [router, id, myUserData, allEvents, myParticipants]);

  if (!myUserData || !event) {
    return <div>読み込み中です</div>
  }
  
  return (
    <EventApplyTemplate 
      event={event}
      myUserData={myUserData}
      subNavInfos={[
        {href: `/events?filter=${EventFilterEnum.apply}`, text: "一覧へ戻る"}
      ]}
    />
  );
}

'use client';

import EventDetailTemplate from "@/features/event/components/templates/Detail";
import { EventFilterEnum } from "@/features/event/enums/page";
import { notFound, useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useMyUserData } from "@/features/user/stores/myUserData";
import { useAllEvents } from "@/features/event/stores/allEvents";
import { useMyParticipants } from "@/features/participant/stores/myParticipants";
import { ItemPageInfo } from "@/base/page/info";
import { SubNavInfo } from "@/base/page/content/infos";

export default function EventDetail() {
  const router = useRouter();
  const { id } = useParams();

  const myUserData = useMyUserData();
  const allEvents = useAllEvents();
  const myParticipants = useMyParticipants();

  const [event, setEvent] = useState(null);
  const [myParticipant, setMyParticipant] = useState(null);
  
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
    if (!myParticipantTmp) {
      // TODO 通知：まだ申し込んでいません
      router.push(`/events?filter=${EventFilterEnum.participating}`);
      return;
    }
    setMyParticipant(myParticipantTmp);
  }, [router, id, myUserData, allEvents, myParticipants]);

  if (!myUserData || !event || !myParticipant) {
    return <div>読み込み中です</div>
  }

  const pageInfo = new ItemPageInfo({
    isForManage: false,
    isAfterApplying: true,
    isForm: false,
    title: event["title"],
    subNavInfos: [
      new SubNavInfo({
        href: `/events?filter=${EventFilterEnum.participating}`, 
        text: "一覧へ戻る",
      }),
      new SubNavInfo({
        href: `/events/detail/${event.id}/edit`, 
        text: "スケジュール変更 / キャンセル",
      })
    ]
  });

  return (
    <EventDetailTemplate 
      pageInfo={pageInfo}
      event={event} 
      myUserData={myUserData} 
      myParticipant={myParticipant}
    />
  );
}

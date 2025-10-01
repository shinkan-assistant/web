'use client';

import { notFound, useParams, useRouter } from "next/navigation";
import EventDetailEditTemplate from "@/components/event/templates/DetailEdit";
import EventsPageFilterEnum from "@/components/event/enums/listPageFilter";
import { useEffect, useState } from "react";
import { useMyUser } from "@/stores/contexts/myUser";
import { useEvents } from "@/stores/contexts/events";
import { useMyParticipants } from "@/stores/contexts/myParticipants";
import { ItemPageInfo } from "@/helpers/bases/page/info";
import { SubNavInfo } from "@/helpers/bases/content/ui/NavMenu";

export default function EventDetailEdit() {
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

    setEvent(eventTmp);
    setMyParticipant(myParticipantTmp);
  }, [router, id, myUser, events, myParticipants]);

  if (!myUser || !event || !myParticipant) {
    return <div>読み込み中です</div>
  }

  const pageInfo = new ItemPageInfo({
    isForManage: false,
    isAfterApplying: true,
    isForm: true,
    title: event["title"],
    subTitle: "スケジュール変更 / キャンセル",
    subNavInfos: [
      new SubNavInfo({
        href: `/events?filter=${EventsPageFilterEnum.participating}`, 
        text: "一覧へ戻る",
      }),
      new SubNavInfo({
        href: `/events/detail/${event.id}`, 
        text: "編集キャンセル",
      })
    ]
  });
  
  return (
    <EventDetailEditTemplate
      pageInfo={pageInfo}
      event={event} 
      myUser={myUser} 
      myParticipant={myParticipant} 
    />
  );
}

'use client';

import { notFound, useParams, useRouter } from "next/navigation";
import EventApplyTemplate from "@/features/event/components/templates/Apply";
import EventsPageFilterEnum from "@/features/event/const/enums/listPageFilter";
import { useEffect, useState } from "react";
import { useMyUser } from "@/features/user/stores/myUser";
import { useMyParticipants } from "@/features/participant/stores/myParticipants";
import { useEvents } from "@/features/event/stores/events";
import { ItemPageInfo } from "@/base/features/page/info";
import { SubNavInfo } from "@/base/features/content/components/ui/NavMenu";

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
    setEvent(eventTmp);

    const myParticipantTmp = myParticipants.find(mp => id === mp["event_id"]);
    if (myParticipantTmp) {
      // TODO 通知：すでに申し込んでいます
      router.push(`/events?filter=${EventsPageFilterEnum.apply}`);
      return;
    }
  }, [router, id, myUser, events, myParticipants]);

  if (!myUser || !event) {
    return <div>読み込み中です</div>
  }
  
  const pageInfo = new ItemPageInfo({
    isForManage: false,
    isAfterApplying: false,
    isForm: true,
    title: event["title"],
    subTitle: "申し込みフォーム",
    subNavInfos: [
      new SubNavInfo({
        href: `/events?filter=${EventsPageFilterEnum.apply}`, 
        text: "一覧へ戻る",
      })
    ]
  });

  return (
    <EventApplyTemplate 
      pageInfo={pageInfo}
      event={event}
      myUser={myUser}
    />
  );
}

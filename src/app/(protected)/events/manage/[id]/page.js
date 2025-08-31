'use client';

import EventManageTemplate from "@/features/event/components/templates/Manage";
import EventsPageFilterEnum from "@/features/event/const/enums/listPageFilter";
import { notFound, useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useMyUserData } from "@/features/user/stores/myUserData";
import { useAllEvents } from "@/features/event/stores/allEvents";
import { useMyParticipants } from "@/features/participant/stores/myParticipants";
import { ItemPageInfo } from "@/base/features/page/info";
import { SubNavInfo } from "@/base/features/content/components/ui/NavMenu";

export default function EventManage() {
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
    if (!myUserData["belong"]["is_member"]) {
      setTargetParticipants(null);
      return;
    }

    const eventTmp = allEvents.find(e => id === e["id"]);
    if (!eventTmp) 
      notFound();
    setEvent(eventTmp);

    const myParticipantTmp = myParticipants.find(mp => id === mp["event_id"]);
    if (!myUserData["is_admin"] && !myParticipantTmp?.["is_organizer"]) {
      // TODO 通知：アクセスできません
      router.push(`/events?filter=${EventsPageFilterEnum.manage}`);
      return;
    }
  }, [router, id, myUserData, allEvents, myParticipants]);

  if (!event) {
    return <div>読み込み中です</div>
  }

  const pageInfo = new ItemPageInfo({
    isForManage: true,
    isForm: true,
    title: event["title"],
    subTitle: "管理画面",
    subNavInfos: [
      new SubNavInfo({
        href: `/events?filter=${EventsPageFilterEnum.manage}`, 
        text: "一覧へ戻る",
      }),
      new SubNavInfo({
        href: `/events/manage/${id}/participants`, 
        text: "参加者一覧を見る",
      }),
    ]
  });

  return (
    <EventManageTemplate 
      pageInfo={pageInfo}
      event={event}
    />
  );
}

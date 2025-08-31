'use client';

import EventManageTemplate from "@/features/event/components/templates/Manage";
import EventsPageFilterEnum from "@/features/event/const/enums/listPageFilter";
import { notFound, useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useMyUser } from "@/features/user/stores/myUser";
import { useEvents } from "@/features/event/stores/events";
import { useMyParticipants } from "@/features/participant/stores/myParticipants";
import { ItemPageInfo } from "@/base/features/page/info";
import { SubNavInfo } from "@/base/features/content/components/ui/NavMenu";

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
      // TODO 通知：アクセスできません
      router.push(`/events?filter=${EventsPageFilterEnum.manage}`);
      return;
    }
  }, [router, id, myUser, events, myParticipants]);

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

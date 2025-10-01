'use client';

import { notFound, useParams, useRouter } from "next/navigation";
import EventApplyTemplate from "@/features/event/components/templates/Apply";
import EventsPageFilterEnum from "@/features/event/components/const/listPageFilterEnum";
import { useEffect, useState } from "react";
import { useMyUser } from "@/stores/contexts/myUser";
import { useMyParticipants } from "@/stores/contexts/myParticipants";
import { useEvents } from "@/stores/contexts/events";
import { ItemPageInfo } from "@/helpers/components/layouts/main/base/config";
import { SubNavInfo } from "@/helpers/components/layouts/main/base/ui/header/NavMenu";
import { toast } from "react-toastify";

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

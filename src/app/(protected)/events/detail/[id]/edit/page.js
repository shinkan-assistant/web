'use client';

import { notFound, useParams, useRouter } from "next/navigation";
import EventDetailEditTemplate from "@/features/event/components/templates/DetailEdit";
import { useAuthUser } from "@/features/user/stores/authUser";
import useDataComponentHook from "@/base/hooks/useDataComponentHook";
import { EventFilterEnum } from "@/features/event/enums/page";
import { useEffect } from "react";
import { useMyUserData } from "@/features/user/stores/myUserData";
import { useAllEvents } from "@/features/event/stores/allEvents";
import { useMyParticipants } from "@/features/participant/stores/myParticipants";

export default function EventDetailEdit() {
  const router = useRouter();
  const { id } = useParams();

  const authUser = useAuthUser();
  const myUserData = useMyUserData();
  const allEvents = useAllEvents();
  const myParticipants = useMyParticipants();

  const { 
    initLoading, finLoading, requestValues, judgeLoadedRequests, render 
  } = useDataComponentHook({
    requests: [router, id, authUser, myUserData, allEvents, myParticipants]
  });
  
  useEffect(() => {
    initLoading();
    if (!judgeLoadedRequests())
      return;

    const event = allEvents.find(e => id === e["id"]);
    if (!event) {
      notFound();
    }

    const myParticipant = myParticipants.find(mp => id === mp["event_id"]);
    if (!myParticipant) {
      // TODO 通知：まだ申し込んでいません
      router.push(`/events?filter=${EventFilterEnum.participating}`);
      return;
    }

    finLoading({
      data: { event, myParticipant }
    });
  }, requestValues);
  
  return render(
    (data) => 
      <EventDetailEditTemplate
        event={data.event} 
        myUserData={myUserData} 
        myParticipant={data.myParticipant} 
        subNavInfos={[
          {href: `/events/?filter=${EventFilterEnum.participating}`, text: "一覧へ戻る"},
          {href: `/events/detail/${data.event.id}`, text: "編集キャンセル"},
        ]}
      />
  );
}

'use client';

import EventManageTemplate from "@/features/event/components/templates/Manage";
import { useAuthUser } from "@/features/user/stores/authUser";
import useDataComponentHook from "@/base/hooks/useDataComponentHook";
import { EventFilterEnum } from "@/features/event/enums/page";
import { notFound, useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useMyUserData } from "@/features/user/stores/myUserData";
import { useAllEvents } from "@/features/event/stores/allEvents";
import { useMyParticipants } from "@/features/participant/stores/myParticipants";

export default function EventManage() {
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
    if (!myUserData["is_admin"] && !myParticipant?.["is_organizer"]) {
      // TODO 通知：アクセスできません
      router.push(`/events?filter=${EventFilterEnum.manage}`);
      return;
    }

    finLoading({
      data: { event }
    });
  }, requestValues);

  return render(
    (data) => 
      <EventManageTemplate 
        event={data.event}
        subNavInfos={[
          {href: `/events/?filter=${EventFilterEnum.manage}`, text: "一覧へ戻る"},
          {href: `/events/manage/${id}/participants`, text: "参加者一覧を見る"},
        ]}
      />
  );
}

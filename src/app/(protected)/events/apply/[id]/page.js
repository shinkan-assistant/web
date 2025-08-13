'use client';

import { notFound, useParams, useRouter } from "next/navigation";
import EventApplyTemplate from "@/features/event/components/templates/Apply";
import useDataComponentHook from "@/base/hooks/useDataComponentHook";
import { useAuthUser } from "@/features/user/stores/authUser";
import { EventFilterEnum } from "@/features/event/enums/page";
import { useEffect } from "react";
import { useMyUserData } from "@/features/user/stores/myUserData";
import { useMyParticipants } from "@/features/participant/stores/myParticipants";
import { useAllEvents } from "@/features/event/stores/allEvents";

export default function EventApply() {
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
    if (myParticipant) {
      // TODO 通知：すでに申し込んでいます
      router.push(`/events?filter=${EventFilterEnum.apply}`);
      return;
    }

    finLoading({
      data: { event }
    });
  }, requestValues);
  
  return render(
    (data) => {
      return (
        <EventApplyTemplate 
          event={data.event}
          myUserData={myUserData}
          subNavInfos={[
            {href: `/events?filter=${EventFilterEnum.apply}`, text: "一覧へ戻る"}
          ]}
        />
      );
    }
  );
}

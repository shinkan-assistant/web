'use client';

import { useRouter, useSearchParams } from "next/navigation";
import { EventFilterEnum, } from "@/features/event/enums/page";
import EventsTemplate from "@/features/event/components/templates/List";
import { useAuthUser } from "@/features/user/stores/authUser";
import { useEffect } from "react";
import useDataComponentHook from "@/base/hooks/useDataComponentHook";
import { useMyUserData } from "@/features/user/stores/myUserData";
import { useAllEvents } from "@/features/event/stores/allEvents";
import { useMyParticipants } from "@/features/participant/stores/myParticipants";

export default function Events() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const filter = searchParams.get("filter");

  const authUser = useAuthUser();
  const myUserData = useMyUserData();
  const allEvents = useAllEvents();
  const myParticipants = useMyParticipants();

  const { 
    initLoading, finLoading, requestValues, judgeLoadedRequests, render 
  } = useDataComponentHook({
    requests: {router, filter, authUser, myUserData, allEvents, myParticipants},
    notHaveToLoadRequestNames: ["filter"],
  });

  useEffect(() => {
    initLoading();
    if (!judgeLoadedRequests())
      return;

    if (!Object.values(EventFilterEnum).includes(filter)) {
      router.push(`/events?filter=${EventFilterEnum.participating}`);
      return;
    }
    if (filter === EventFilterEnum.organizer && !myUserData["belong"]["is_member"]) {
      router.push(`/events?filter=${EventFilterEnum.participating}`);
      return;
    }

    const targetEventsFilterFunc = {
      [EventFilterEnum.participating]: (e) => {
        return myParticipants.some(mp => e["id"] === mp["event_id"])
      },
      [EventFilterEnum.registrable]: (e) => {
        return myParticipants.every(mp => e["id"] !== mp["event_id"])
      },
      [EventFilterEnum.organizer]: (e) => {
        if (myUserData["is_admin"]) 
          return true;
        return myParticipants.some(mp => e["id"] === mp["event_id"] && mp["is_organizer"]);
      }
    }[filter];
    const targetEvents = allEvents.filter(targetEventsFilterFunc)
    
    finLoading({ 
      data: { events: targetEvents }
    });
  }, requestValues);

  return render(
    (data) => <EventsTemplate events={data.events} filter={filter} />
  );
}

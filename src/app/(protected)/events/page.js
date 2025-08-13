'use client';

import { getOrganizerEvents, getParticipatingEvents, getRegistrableEvents } from "@/features/event/api/get";
import { useRouter, useSearchParams } from "next/navigation";
import { EventFilterEnum, } from "@/features/event/enums/page";
import EventsTemplate from "@/features/event/components/templates/List";
import { useAuthUser } from "@/features/user/stores/authUser";
import { getUserDataByEmail } from "@/features/user/api/get";
import { useEffect } from "react";
import usePageHook from "@/base/hooks/usePage";

export default function Events() {
  const authUser = useAuthUser();
  const router = useRouter();
  const searchParams = useSearchParams();
  const filter = searchParams.get("filter");

  const { 
    initializeLoading, finalizeLoading, loadingDependencies, 
    db, setData, handleLoadingError, 
    render 
  } = usePageHook({requests: [authUser, router, filter]});

  useEffect(() => {
    (async () => {
      initializeLoading();

      try {
        if (!Object.values(EventFilterEnum).includes(filter)) {
          router.push(`/events?filter=${EventFilterEnum.participating}`);
          return;
        }
      
        const myUserData = await getUserDataByEmail(db, { email: authUser.email });
        if (filter === EventFilterEnum.organizer && !myUserData["belong"]["is_member"]) {
          router.push(`/events?filter=${EventFilterEnum.participating}`);
          return;
        }
        
        const getEventsFunc = {
          [EventFilterEnum.participating]: getParticipatingEvents,
          [EventFilterEnum.registrable]: getRegistrableEvents,
          [EventFilterEnum.organizer]: getOrganizerEvents,
        }[filter];
        const events = await getEventsFunc(db, { authUser: authUser });
        setData({ events });
      } catch (error) {
        handleLoadingError(error);
      }

      finalizeLoading();
    })();
  }, loadingDependencies);

  return render(
    (data) => <EventsTemplate events={data.events} filter={filter} />
  );
}

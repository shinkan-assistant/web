'use client';

import { getOrganizerEvents, getParticipatingEvents, getRegistrableEvents } from "@/features/event/api/get";
import { useRouter, useSearchParams } from "next/navigation";
import { EventFilterEnum, } from "@/features/event/enums/page";
import EventsTemplate from "@/features/event/components/templates/List";
import { useAuthUser } from "@/features/user/stores/authUser";
import { getUserMetadataByEmail } from "@/features/user/api/get";
import useLoad from "@/base/hooks/useLoad";

export default function Events() {
  const authUser = useAuthUser();
  
  const router = useRouter();
  const searchParams = useSearchParams();
  const filter = searchParams.get("filter");
  if (!Object.values(EventFilterEnum).includes(filter)) {
    router.push(`/events?filter=${EventFilterEnum.participating}`);
  }
  
  const {data, isLoading} = useLoad(async (db) => {
    const myUserMetadata = await getUserMetadataByEmail(db, {email: authUser.email});
    if (filter === EventFilterEnum.organizer && !myUserMetadata["belong"]["is_member"]) {
      router.push(`/events?filter=${EventFilterEnum.participating}`);
    }

    const getEventsFunc = {
      [EventFilterEnum.participating]: getParticipatingEvents,
      [EventFilterEnum.registrable]: getRegistrableEvents,
      [EventFilterEnum.organizer]: getOrganizerEvents,
    }[[filter]];
    const events = await getEventsFunc(db, {authUser: authUser});

    return { events }
  });
  if (isLoading) {
    return <div>読み込み中です</div>
  }
  const { events } = data;
  
  return (
    <EventsTemplate events={events} filter={filter} />
  );
}

import { getOrganizerEvents, getParticipatingEvents, getRegistrableEvents } from "@/features/event/api/get";
import { getAuthenticatedAppForUser, getAuthenticatedDb } from "@/lib/firebase/serverApp";
import { redirect } from "next/navigation";
import { EventFilterEnum, } from "@/features/event/enums/page";
import EventsTemplate from "@/features/event/components/templates/List";

export default async function Events({ searchParams }) {
  const {firebaseServerApp, authUser} = await getAuthenticatedAppForUser();
  if (authUser === null) redirect('/');
  const db = getAuthenticatedDb(firebaseServerApp);

  const { filter } = await searchParams;
  if (!Object.values(EventFilterEnum).includes(filter)) {
    redirect(`/events?filter=${EventFilterEnum.participating}`);
  }

  let events;
  if (filter === EventFilterEnum.participating) {
    events = await getParticipatingEvents(db, {authUser: authUser});
  }
  else if (filter === EventFilterEnum.registrable) {
    events = await getRegistrableEvents(db, {authUser: authUser});
  }
  else if (filter === EventFilterEnum.organizer) {
    events = await getOrganizerEvents(db, {authUser: authUser});
  }

  // イベント管理用のページに、新入生がアクセスできないようにする　など
  if (events === null) {
    redirect(`/events?filter=${EventFilterEnum.participating}`);
  }
  
  return (
    <EventsTemplate events={events} filter={filter} />
  );
}

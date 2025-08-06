import EventList from "@/server/components/app/events/List";
import { getEventsByAuthUser } from "@/data/functions/event";
import { getAuthenticatedAppForUser, getAuthenticatedDb } from "@/lib/firebase/serverApp";
import { redirect } from "next/dist/server/api-utils";

export default async function Events() {
  const {firebaseServerApp, authUser} = await getAuthenticatedAppForUser();
  if (authUser === null) redirect('/');

  const db = getAuthenticatedDb(firebaseServerApp)

  const events = await getEventsByAuthUser(db, {authUser: authUser});
  
  return (
    <EventList events={events} />
  );
}

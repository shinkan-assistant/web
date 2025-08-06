import EventList from "@/server/components/app/events/List";
import { getEventsByLoginUser } from "@/server/data/functions/event";
import { getAuthenticatedAppForUser, getAuthenticatedDb } from "@/lib/firebase/serverApp";
import { redirect } from "next/dist/server/api-utils";

export default async function Events() {
  const {firebaseServerApp, loginUser} = await getAuthenticatedAppForUser();
  if (loginUser === null) redirect('/');

  const db = getAuthenticatedDb(firebaseServerApp)

  const events = await getEventsByLoginUser(db, {loginUser: loginUser});
  
  return (
    <EventList events={events} />
  );
}

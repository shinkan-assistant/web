import EventList from "@/components/app/events/List";
import { getEventsByLoginUser } from "@/data/functions/event";
import { getAuthenticatedAppForUser, getAuthenticatedDb } from "@/lib/firebase/serverApp";

export default async function Events() {
  const {firebaseServerApp, loginUser} = await getAuthenticatedAppForUser();
  const db = getAuthenticatedDb(firebaseServerApp)

  const events = await getEventsByLoginUser(db, {loginUser: loginUser});
  
  return (
    <EventList events={events} />
  );
}

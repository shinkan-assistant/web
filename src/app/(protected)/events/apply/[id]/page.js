import { getEventByAuthUser } from "@/data/functions/event";
import { getUserMetadataByEmail } from "@/data/functions/user";
import { getAuthenticatedAppForUser, getAuthenticatedDb } from "@/lib/firebase/serverApp";
import EventApplyForm from "@/server/components/app/events/ApplyForm";
import { notFound } from "next/navigation";

export default async function EventItem({ params }) {
  const { id } = await params;

  const {firebaseServerApp, authUser} = await getAuthenticatedAppForUser();
  if (authUser === null) redirect('/');

  const db = getAuthenticatedDb(firebaseServerApp)

  const [myUserMetadata, event] = await Promise.all([
    getUserMetadataByEmail(db, {email: authUser.email}),
    getEventByAuthUser(db, {id: id, authUser: authUser}),
  ]);

  if (event === null) {
    notFound();
  }

  return (
    <EventApplyForm event = {event} myUserMetadata = {myUserMetadata} />
  );
}

import { getEventByAuthUser } from "@/features/event/api/get";
import { getUserMetadataByEmail } from "@/features/user/api/get";
import { getAuthenticatedAppForUser, getAuthenticatedDb } from "@/lib/firebase/serverApp";
import { notFound } from "next/navigation";
import EventDetailTemplate from "@/features/event/components/templates/Detail";

export default async function EventDetail({ params }) {
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
    <EventDetailTemplate event={event} myUserMetadata={myUserMetadata} />
  );
}

import { getEventByAuthUser } from "@/features/event/api/get";
import { getUserMetadataByEmail } from "@/features/user/api/get";
import { getAuthenticatedAppForUser, getAuthenticatedDb } from "@/lib/firebase/serverApp";
import { notFound } from "next/navigation";
import EventApplyTemplate from "@/features/event/components/templates/Apply";
import { getMyParticipantByEvent } from "@/features/participant/api/get";

export default async function EventApply({ params }) {
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

  const participant = await getMyParticipantByEvent(db, {authUser, eventId: event.id});
  const initialIsParticipating = participant !== null;
  if (initialIsParticipating) {
    return <div>すでに申し込んでいます</div>
  }

  return (
    <EventApplyTemplate event={event} myUserMetadata={myUserMetadata} />
  );
}

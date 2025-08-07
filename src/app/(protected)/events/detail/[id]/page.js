import { getEventByAuthUser } from "@/data/functions/event";
import { getUserMetadataByEmail } from "@/data/functions/user";
import { getAuthenticatedAppForUser, getAuthenticatedDb } from "@/lib/firebase/serverApp";
import { notFound } from "next/navigation";
import ItemContainer from "@/server/components/layout/container/item";
import EventHeader from "@/server/components/features/events/common/Header";
import EventSummary from "@/server/components/features/events/common/Summary";
import { ScheduleList } from "@/server/components/features/events/detail/ScheduleList";

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
    <ItemContainer>
      <div className="ml-3 mb-4">
        <EventHeader isForList={false} event={event} />
      </div>

      <div className="mb-8">
        <EventSummary event={event} />
      </div>

      <ScheduleList schedules={event.schedules} belong={myUserMetadata["belong"]} publicLocation={true} />
    </ItemContainer>
  );
}

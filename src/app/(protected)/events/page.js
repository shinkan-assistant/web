import { EventListItemLink } from "@/server/components/features/events/list/ItemLink";
import { getOrganizerEvents, getParticipatingEvents, getRegistrableEvents } from "@/data/functions/event";
import { getAuthenticatedAppForUser, getAuthenticatedDb } from "@/lib/firebase/serverApp";
import { redirect } from "next/navigation";
import { EventFilterEnum } from "@/data/enums/event";
import { ListContainer, ListItemContainer } from "@/server/components/layout/container/list";
import EventHeader from "@/server/components/features/events/common/Header";
import EventSummary from "@/server/components/features/events/common/Summary";

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
    <ListContainer>
      {events.map((event) => (
        <ListItemContainer key={event.id} >
          <div className="mb-4">
            <EventHeader isForList={true} event={event} />
          </div>
          
          <div className="mb-4">
            <EventSummary isForList={true} event={event} />
          </div>

          <div>
            <EventListItemLink event={event} filter={filter} />
          </div>
        </ListItemContainer>
      ))}
    </ListContainer>
  );
}

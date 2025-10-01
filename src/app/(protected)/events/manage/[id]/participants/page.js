'use client';

import { useEvents } from "@/stores/contexts/events";
import ParticipantListTemplate from "@/features/participant/components/templates/List";
import { useParticipants } from "@/stores/contexts/participants";
import { useMyParticipants } from "@/stores/contexts/myParticipants";
import { useMyUser } from "@/stores/contexts/myUser";
import { useUsers } from "@/stores/contexts/users";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ParticipantListPage() {
  const router = useRouter();
  const { id } = useParams();

  const myUser = useMyUser();
  const events = useEvents();
  const myParticipants = useMyParticipants();
  const participants = useParticipants();
  const users = useUsers();

  const [targetEvent, setTargetEvent] = useState(null);
  const [targetParticipants, setTargetParticipants] = useState(null);

  useEffect(() => {
    if (!myUser || !events || !myParticipants || !participants || !users) {
      setTargetParticipants(null);
      return;
    }
    if (!myUser["belong"]["is_member"]) {
      setTargetParticipants(null);
      return;
    }

    const eventTmp = events.find(e => id === e["id"]);
    if (!eventTmp) 
      notFound();
    setTargetEvent(eventTmp);

    const myParticipantTmp = myParticipants.find(mp => id === mp["event_id"]);
    if (!myUser["is_admin"] && !myParticipantTmp?.["is_organizer"]) {
      router.push(`/events?filter=${EventsPageFilterEnum.manage}`);
      return;
    }

    setTargetParticipants(
      participants.filter(p => p["event_id"] === eventTmp["id"])
    );    
  }, [router, id, myUser, events, myParticipants, participants, users]);

  if (!targetEvent || !targetParticipants | !users) {
    return <div>読み込み中です</div>
  }

  return (
    <ParticipantListTemplate
      participants={targetParticipants}
      event={targetEvent}
      users={users}
    />
  );
}
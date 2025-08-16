'use client';

import { useAllEvents } from "@/features/event/stores/allEvents";
import ParticipantListTemplate from "@/features/participant/components/templates/List";
import { useAllManagingParticipants } from "@/features/participant/stores/allManagingParticipants";
import { useMyParticipants } from "@/features/participant/stores/myParticipants";
import { useMyUserData } from "@/features/user/stores/myUserData";
import { useUsers } from "@/features/user/stores/users";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ParticipantListPage() {
  const router = useRouter();
  const { id } = useParams();

  const myUserData = useMyUserData();
  const allEvents = useAllEvents();
  const myParticipants = useMyParticipants();
  const allManagingParticipants = useAllManagingParticipants();
  const users = useUsers();

  const [targetEvent, setTargetEvent] = useState(null);
  const [targetParticipants, setTargetParticipants] = useState(null);

  useEffect(() => {
    if (!myUserData || !allEvents || !myParticipants || !allManagingParticipants || !users) {
      setTargetParticipants(null);
      return;
    }
    if (!myUserData["belong"]["is_member"]) {
      setTargetParticipants(null);
      return;
    }

    const eventTmp = allEvents.find(e => id === e["id"]);
    if (!eventTmp) 
      notFound();
    setTargetEvent(eventTmp);

    const myParticipantTmp = myParticipants.find(mp => id === mp["event_id"]);
    if (!myUserData["is_admin"] && !myParticipantTmp?.["is_organizer"]) {
      // TODO 通知：アクセスできません
      router.push(`/events?filter=${EventFilterEnum.manage}`);
      return;
    }

    setTargetParticipants(
      allManagingParticipants.filter(p => p["event_id"] === eventTmp["id"])
    );    
  }, [router, id, myUserData, allEvents, myParticipants, allManagingParticipants, users]);

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
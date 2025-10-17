'use client';

import { notFound, useParams, useRouter, useSearchParams } from "next/navigation";
import EventApplyTemplate from "@/components/event/templates/Apply";
import { useEffect, useState } from "react";
import { useMyUser } from "@/stores/contexts/myUser";
import { useMyParticipants } from "@/stores/contexts/myParticipants";
import { toast } from "react-toastify";
import { useLoadedAuthUser } from "@/stores/sessions/authUser";
import eventService from "@/services/event";

export default function EventApply() {
  const router = useRouter();
  const { id } = useParams();

  const searchParams = useSearchParams();
  const keywordForMember = searchParams.get("keyword");

  const loadedAuthUser = useLoadedAuthUser();
  const myUser = useMyUser();
  const myParticipants = useMyParticipants();
  
  const [event, setEvent] = useState(null);

  useEffect(() => {
    (async () => {
      const eventTmp = await eventService.getById({id});
      if (!eventTmp) {
        toast.warn("イベントが見つかりませんでした");
        // TODO notFoundに移動しない
        notFound();
      }
  
      const myParticipantTmp = myParticipants?.find(mp => id === mp["event_id"]);
      if (myParticipantTmp) {
        // TODO 申し込んだ後にも、通知が出てしまう
        // toast.warn(`すでに${eventTmp["title"]}に申し込んでいます`);
        router.push(`/events/${id}`);
        return;
      }
  
      setEvent(eventTmp);
    })();
  }, [router, id, myParticipants]);

  if (!event || !loadedAuthUser) {
    return <div>読み込み中です</div>
  }

  return (
    <EventApplyTemplate 
      event={event}
      authUser={loadedAuthUser.get()}
      myUser={myUser}
      keywordForMember={keywordForMember}
    />
  );
}

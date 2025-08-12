'use client';

import { getEventByAuthUser } from "@/features/event/api/get";
import { getUserMetadataByEmail } from "@/features/user/api/get";
import EventDetailTemplate from "@/features/event/components/templates/Detail";
import { useAuthUser } from "@/features/user/stores/authUser";
import useLoad from "@/base/hooks/useLoad";
import { EventFilterEnum } from "@/features/event/enums/page";
import { notFound, useParams, useRouter } from "next/navigation";

export default function EventDetail() {
  const authUser = useAuthUser();

  const router = useRouter();
  const { id } = useParams();

  const {data, isLoading} = useLoad(async (db) => {
    const [myUserMetadata, event] = await Promise.all([
      getUserMetadataByEmail(db, {email: authUser.email}),
      getEventByAuthUser(db, {id: id, authUser: authUser}),
    ]);

    if (!event) {
      notFound();
    }
    if (!event.myParticipant) {
      // TODO 通知：まだ申し込んでいません。
      router.push(`/events?filter=${EventFilterEnum.participating}`);
    }

    return {myUserMetadata, event};
  });
  if (isLoading) {
    return <div>読み込み中です</div>
  }
  const {myUserMetadata, event } = data;

  return (
    <EventDetailTemplate event={event} myUserMetadata={myUserMetadata} />
  );
}

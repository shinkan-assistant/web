'use client';

import { getEventByAuthUser } from "@/features/event/api/get";
import { getUserMetadataByEmail } from "@/features/user/api/get";
import { notFound, useParams, useRouter } from "next/navigation";
import EventDetailUpdateTemplate from "@/features/event/components/templates/DetailUpdate";
import { useAuthUser } from "@/features/user/stores/authUser";
import useLoad from "@/base/hooks/useLoad";
import { EventFilterEnum } from "@/features/event/enums/page";

export default function EventDetailUpdate() {
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
    <EventDetailUpdateTemplate event={event} myUserMetadata={myUserMetadata} />
  );
}

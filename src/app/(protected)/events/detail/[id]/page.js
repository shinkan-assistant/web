'use client';

import { getEventByAuthUser } from "@/features/event/api/get";
import { getUserMetadataByEmail } from "@/features/user/api/get";
import EventDetailTemplate from "@/features/event/components/templates/Detail";
import { useAuthUser } from "@/features/user/stores/authUser";
import usePageHook from "@/base/hooks/usePage";
import { EventFilterEnum } from "@/features/event/enums/page";
import { notFound, useParams, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function EventDetail() {
  const authUser = useAuthUser();
  const router = useRouter();
  const { id } = useParams();

  const { 
    initializeLoading, finalizeLoading, loadingDependencies, 
    db, setData, handleLoadingError, 
    render 
  } = usePageHook({requests: [authUser, router, id]});
  
  useEffect(() => {
    (async () => {
      initializeLoading();

      try {
        const [myUserMetadata, event] = await Promise.all([
          getUserMetadataByEmail(db, {email: authUser.email}),
          getEventByAuthUser(db, {id: id, authUser: authUser}),
        ]);

        if (!event) {
          notFound();
        }

        if (!event.myParticipant) {
          // TODO 通知：まだ申し込んでいません
          router.push(`/events?filter=${EventFilterEnum.registrable}`);
          return;
        }
        
        setData({ myUserMetadata, event });
      } catch (error) {
        handleLoadingError(error);
      } finally {
        finalizeLoading();
      }
    })();
  }, loadingDependencies);

  return render(
    (data) => <EventDetailTemplate event={data.event} myUserMetadata={data.myUserMetadata} />
  );
}

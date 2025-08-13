'use client';

import { getEventByAuthUser } from "@/features/event/api/get";
import { getUserDataByEmail } from "@/features/user/api/get";
import { notFound, useParams, useRouter } from "next/navigation";
import EventDetailEditTemplate from "@/features/event/components/templates/DetailEdit";
import { useAuthUser } from "@/features/user/stores/authUser";
import usePageHook from "@/base/hooks/usePage";
import { EventFilterEnum } from "@/features/event/enums/page";
import { useEffect } from "react";

export default function EventDetailEdit() {
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
        const [myUserData, event] = await Promise.all([
          getUserDataByEmail(db, {email: authUser.email}),
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
        
        setData({ myUserData, event });
      } catch (error) {
        handleLoadingError(error);
      } finally {
        finalizeLoading();
      }
    })();
  }, loadingDependencies);
  
  return render(
    (data) => <EventDetailEditTemplate event={data.event} myUserData={data.myUserData} />
  );
}

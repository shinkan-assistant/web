'use client';

import { getEventByAuthUser } from "@/features/event/api/get";
import { getUserDataByEmail } from "@/features/user/api/get";
import { notFound, useParams, useRouter } from "next/navigation";
import EventApplyTemplate from "@/features/event/components/templates/Apply";
import usePageHook from "@/base/hooks/usePage";
import { useAuthUser } from "@/features/user/stores/authUser";
import { EventFilterEnum } from "@/features/event/enums/page";
import { useEffect } from "react";

export default function EventApply() {
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

        if (event.myParticipant) {
          // TODO 通知：すでに申し込んでいます
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
    (data) => <EventApplyTemplate event={data.event} myUserData={data.myUserData}/>
  );
}

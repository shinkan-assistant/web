'use client';

import { useEffect } from "react";
import { redirect } from "next/navigation";
import { useAuthUser } from "@/stores/sessions/authUser";
import EventsPageFilterEnum from "@/components/event/enums/listPageFilter";
import PageLayout from "@/helpers/bases/page/layout";
import { UnAuthorizedHeader } from "@/helpers/bases/shared/Header";

export default function UnprotectedLayout({ children }) {
  const authUser = useAuthUser();

  useEffect(() => {
    if (authUser && window.location.pathname !== `/events?filter=${EventsPageFilterEnum.participating}`) {
      redirect('/events');
    }
  }, [authUser]);

  return (
    <PageLayout
      Header={UnAuthorizedHeader}
    >
      {children}
    </PageLayout>
  );
}

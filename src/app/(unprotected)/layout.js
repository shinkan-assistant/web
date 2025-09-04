'use client';

import { useEffect } from "react";
import { redirect } from "next/navigation";
import { useAuthUser } from "@/features/user/stores/authUser";
import EventsPageFilterEnum from "@/features/event/const/enums/listPageFilter";
import PageLayout from "@/base/features/page/components/layout";
import { UnAuthorizedHeader } from "@/features/shared/components/sections/Header";

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

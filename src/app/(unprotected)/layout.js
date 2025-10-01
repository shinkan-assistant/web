'use client';

import { useEffect } from "react";
import { redirect } from "next/navigation";
import { useAuthUser } from "@/stores/sessions/authUser";
import EventsPageFilterEnum from "@/features/event/components/const/listPageFilterEnum";
import SubRootLayout from "@/helpers/components/layouts/page";
import { UnAuthorizedHeader } from "@/helpers/components/layouts/page/areas/Header";

export default function UnprotectedLayout({ children }) {
  const authUser = useAuthUser();

  useEffect(() => {
    if (authUser && window.location.pathname !== `/events?filter=${EventsPageFilterEnum.participating}`) {
      redirect('/events');
    }
  }, [authUser]);

  return (
    <SubRootLayout
      Header={UnAuthorizedHeader}
    >
      {children}
    </SubRootLayout>
  );
}

'use client';

import { useEffect } from "react";
import { redirect } from "next/navigation";
import { useAuthUser } from "@/stores/sessions/authUser";
import SubRootLayout from "@/helpers/components/layouts/page";
import { UnAuthorizedHeader } from "@/helpers/components/layouts/page/Header";
import { EventsPageFilterEnum } from "@/components/event/templates/List";
import { useMyUser } from "@/stores/contexts/myUser";

export default function UnprotectedLayout({ children }) {
  const authUser = useAuthUser();
  const myUser = useMyUser();

  useEffect(() => {
    if ((authUser && myUser) && window.location.pathname !== `/events?filter=${EventsPageFilterEnum.participating}`) {
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

'use client';

import { useEffect } from "react";
import { redirect } from "next/navigation";
import { useAuthUser } from "@/features/user/stores/authUser";
import EventsPageFilterEnum from "@/features/event/const/enums/listPageFilter";

export default function UnprotectedLayout({ children }) {
  const authUser = useAuthUser();

  useEffect(() => {
    if (authUser && window.location.pathname !== `/events?filter=${EventsPageFilterEnum.participating}`) {
      redirect('/events');
    }
  }, [authUser]);

  return (
    <>
      {children}
    </>
  );
}

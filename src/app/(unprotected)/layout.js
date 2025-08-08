'use client';

import { useEffect } from "react";
import { redirect } from "next/navigation";
import { useAuthUser } from "@/features/user/stores/authUser";
import { EventFilterEnum } from "@/features/event/enums/page";

export default function UnprotectedLayout({ children }) {
  const authUser = useAuthUser();

  useEffect(() => {
    if (authUser && window.location.pathname !== `/events?filter=${EventFilterEnum.participating}`) {
      redirect('/events');
    }
  }, [authUser]);

  return (
    <>
      {children}
    </>
  );
}

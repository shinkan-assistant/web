'use client';

import { useEffect } from "react";
import { redirect } from "next/navigation";
import { useAuthUser } from "@/client/contexts/authUser";

export default function UnprotectedLayout({ children }) {
  const authUser = useAuthUser();

  useEffect(() => {
    if (authUser && window.location.pathname !== '/events') {
      redirect('/events');
    }
  }, [authUser]);

  return (
    <>
      {children}
    </>
  );
}

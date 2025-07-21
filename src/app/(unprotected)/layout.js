'use client';

import { useEffect } from "react";
import { redirect } from "next/navigation";
import { useUser } from "@/contexts/user";

export default function UnprotectedLayout({ children }) {
  const user = useUser();

  useEffect(() => {
    if (user && window.location.pathname !== '/events') {
      redirect('/events');
    }
  }, [user]);

  return (
    <>
      {children}
    </>
  );
}

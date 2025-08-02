'use client';

import { useEffect } from "react";
import { redirect } from "next/navigation";
import { useLoginUser } from "@/contexts/loginUser";

export default function UnprotectedLayout({ children }) {
  const user = useLoginUser();

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

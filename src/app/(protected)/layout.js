'use client';

import { useEffect } from "react";
import { redirect } from "next/navigation";
import { useUser } from "@/contexts/user";
import NavMenu from "@/components/common/NavMenu";

export default function ProtectedLayout({ children }) {
  const user = useUser();

  useEffect(() => {
    if (!user && window.location.pathname !== '/') {
      redirect('/');
    }
  }, [user]);

  return (
    <>
      <div className="fixed left-0 right-0">
        <NavMenu />
      </div>
      <div className="pt-16 min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        {children}
      </div>
    </>
  );
}

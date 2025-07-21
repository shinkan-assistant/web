'use client';

import { redirect } from "next/navigation";
import { useUser } from "@/contexts/user";
import NavMenu from "@/components/common/NavMenu";

export default function ProtectedLayout({ children }) {
  const user = useUser();
  if (user) {
    return (
      <>
        <div className="fixed left-0 right-0">
          <NavMenu />
        </div>
        <div className="pt-16 min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
          {children}
        </div>
      </>
    )
  }
  else {
    redirect('/');
  }
}

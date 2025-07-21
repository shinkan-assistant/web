'use client';

import { redirect } from "next/navigation";
import { useUser } from "@/components/contexts/user";
import NavMenu from "@/components/common/NavMenu";

export default function ProtectedLayout({ children }) {
  const user = useUser();
  if (user) {
    return (
      <>
        <NavMenu />
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
          {children}
        </div>
      </>
    )
  }
  else {
    redirect('/');
  }
}

'use client';

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthUser } from "@/client/contexts/authUser";
import NavMenu from "@/client/components/common/NavMenu";

export default function ProtectedLayout({ children }) {
  const authUser = useAuthUser();
  const router = useRouter();

  useEffect(() => {
    if (!authUser) {
      router.push('/');
    }
  }, [authUser, router]); 

  if (!authUser) {
    return null;
  }

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

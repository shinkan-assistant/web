'use client';

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLoginUser } from "@/client/contexts/loginUser";
import NavMenu from "@/client/components/common/NavMenu";

export default function ProtectedLayout({ children }) {
  const loginUser = useLoginUser();
  const router = useRouter();

  useEffect(() => {
    if (!loginUser) {
      router.push('/');
    }
  }, [loginUser, router]); 

  if (!loginUser) {
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

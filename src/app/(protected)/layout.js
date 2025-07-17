'use client';

import { notFound } from "next/navigation";
import { useUser } from "@/contexts/user";

export default function ProtectedLayout({ children }) {
  const user = useUser();
  if (user) {
    return (
      <>
        {children}
      </>
    )
  }
  else {
    notFound();
  }
}

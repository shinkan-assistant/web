'use client';

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthUser } from "@/stores/sessions/authUser";
import NavMenu from "@/components/shared/sections/NavMenu";
import { MyUserProvider } from "@/stores/contexts/myUser";
import { EventsProvider } from "@/stores/contexts/events";
import { MyParticipantsProvider } from "@/stores/contexts/myParticipants";
import { ParticipantsProvider } from "@/stores/contexts/participants";
import { UsersProvider } from "@/stores/contexts/users";
import PageLayout from "@/components/base/page/layout";
import { AuthorizedHeader } from "@/components/shared/sections/Header";

export default function ProtectedLayout({ children }) {
  const router = useRouter();
  const authUser = useAuthUser();

  useEffect(() => {
    if (!authUser) {
      router.push('/');
    }
  }, [authUser, router]); 

  return (
    <EventsProvider>
      <MyParticipantsProvider>
        <ParticipantsProvider>
          <UsersProvider>
            <PageLayout
              Header={AuthorizedHeader}
              NavMenu={NavMenu}
            >
              {children}
            </PageLayout>
          </UsersProvider>
        </ParticipantsProvider>
      </MyParticipantsProvider>
    </EventsProvider>
);
}

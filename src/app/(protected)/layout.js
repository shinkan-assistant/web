'use client';

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthUser } from "@/stores/sessions/authUser";
import NavMenu from "@/helpers/components/layouts/page/areas/NavMenu";
import { EventsProvider } from "@/stores/contexts/events";
import { MyParticipantsProvider } from "@/stores/contexts/myParticipants";
import { ParticipantsProvider } from "@/stores/contexts/participants";
import { UsersProvider } from "@/stores/contexts/users";
import SubRootLayout from "@/helpers/components/layouts/page";
import { AuthorizedHeader } from "@/helpers/components/layouts/page/areas/Header";

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
            <SubRootLayout
              Header={AuthorizedHeader}
              NavMenu={NavMenu}
            >
              {children}
            </SubRootLayout>
          </UsersProvider>
        </ParticipantsProvider>
      </MyParticipantsProvider>
    </EventsProvider>
);
}

'use client';

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthUser } from "@/features/user/stores/authUser";
import NavMenu from "@/features/shared/components/sections/NavMenu";
import { MyUserProvider } from "@/features/user/stores/myUser";
import { EventsProvider } from "@/features/event/stores/events";
import { MyParticipantsProvider } from "@/features/participant/stores/myParticipants";
import { ParticipantsProvider } from "@/features/participant/stores/participants";
import { UsersProvider } from "@/features/user/stores/users";
import PageLayout from "@/base/features/page/components/layout";
import { AuthorizedHeader } from "@/features/shared/components/sections/Header";

export default function ProtectedLayout({ children }) {
  const router = useRouter();
  const authUser = useAuthUser();

  useEffect(() => {
    if (!authUser) {
      router.push('/');
    }
  }, [authUser, router]); 

  return (
    <MyUserProvider>
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
    </MyUserProvider>
  );
}

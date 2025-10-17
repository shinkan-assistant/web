'use client';

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLoadedAuthUser } from "@/stores/sessions/authUser";
import NavMenu from "@/helpers/components/layouts/page/NavMenu";
import { EventsProvider } from "@/stores/contexts/events";
import { MyParticipantsProvider } from "@/stores/contexts/myParticipants";
import { ParticipantsProvider } from "@/stores/contexts/participants";
import { UsersProvider } from "@/stores/contexts/users";
import SubRootLayout from "@/helpers/components/layouts/page";
import { AuthorizedHeader } from "@/helpers/components/layouts/page/Header";
import { useMyUser } from "@/stores/contexts/myUser";
import userService from "@/services/user";

export default function ProtectedLayout({ children }) {
  const router = useRouter();
  const loadedAuthUser = useLoadedAuthUser();
  const myUser = useMyUser();

  useEffect(() => {
    (async() => {
      if (!loadedAuthUser) return;

      const authUser = loadedAuthUser.get();
      if (!authUser) {
        router.push('/');
      } else {
        if (!(myUser || await userService.exists({email: authUser.email}))) {
          if (window.location.pathname !== '/') {
            router.push('/');
          }
        }
      }
    })();
  }, [loadedAuthUser, myUser, router]); 

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

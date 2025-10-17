'use client';

import { useAuthUser } from "@/stores/sessions/authUser";
import NavMenu from "@/helpers/components/layouts/page/NavMenu";
import { EventsProvider } from "@/stores/contexts/events";
import { MyParticipantsProvider } from "@/stores/contexts/myParticipants";
import { ParticipantsProvider } from "@/stores/contexts/participants";
import { UsersProvider } from "@/stores/contexts/users";
import SubRootLayout from "@/helpers/components/layouts/page";
import { AuthorizedHeader, UnAuthorizedHeader } from "@/helpers/components/layouts/page/Header";
import { useMyUser } from "@/stores/contexts/myUser";

export default function UnionLayout({ children }) {
  const authUser = useAuthUser();
  const myUser = useMyUser();

  return (
    <>
      {(authUser && myUser) ? (
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
      ) : (
        <SubRootLayout
          Header={UnAuthorizedHeader}
        >
          {children}
        </SubRootLayout>
      )}
    </>
  );
}

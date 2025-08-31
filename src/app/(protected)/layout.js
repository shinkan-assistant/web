'use client';

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthUser } from "@/features/user/stores/authUser";
import NavMenu from "@/features/shared/components/sections/NavMenu";
import { MyUserProvider, useMyUser } from "@/features/user/stores/myUser";
import { EventsProvider, useEvents } from "@/features/event/stores/events";
import { MyParticipantsProvider, useMyParticipants } from "@/features/participant/stores/myParticipants";
import { ParticipantsProvider } from "@/features/participant/stores/participants";
import { UsersProvider } from "@/features/user/stores/users";

function WithoutProviderLayout({ children }) {
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

function WithMyParticipantsLayout({ children }) {
  const myUser = useMyUser();
  const events = useEvents();
  return (
    <MyParticipantsProvider myUser={myUser} events={events} >
      <WithoutProviderLayout>
        {children}
      </WithoutProviderLayout>
    </MyParticipantsProvider>
  );
}

function WithEventsLayout({ children }) {
  const myUser = useMyUser();
  return (
    <EventsProvider myUser={myUser}>
      <WithMyParticipantsLayout>
        {children}
      </WithMyParticipantsLayout>
    </EventsProvider>
  );
}

function WithMyUserLayout({ children }) {
  const authUser = useAuthUser();
  return (
    <MyUserProvider authUser={authUser}>
      <WithEventsLayout>
        {children}
      </WithEventsLayout>
    </MyUserProvider>
  );
}

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
              <div className="fixed left-0 right-0">
                <NavMenu />
              </div>
              <div className="pt-16 min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
                {children}
              </div>
            </UsersProvider>
          </ParticipantsProvider>
        </MyParticipantsProvider>
      </EventsProvider>
    </MyUserProvider>
  );
}

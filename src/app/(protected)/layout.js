'use client';

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthUser } from "@/features/user/stores/authUser";
import NavMenu from "@/features/shared/components/organisms/NavMenu";
import { MyUserDataProvider, useMyUserData } from "@/features/user/stores/myUserData";
import { AllEventsProvider, useAllEvents } from "@/features/event/stores/allEvents";
import { MyParticipantsProvider, useMyParticipants } from "@/features/participant/stores/myParticipants";
import { AllManagingParticipantsProvider } from "@/features/participant/stores/allManagingParticipants";
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
  const myUserData = useMyUserData();
  const events = useAllEvents();
  return (
    <MyParticipantsProvider myUserData={myUserData} events={events} >
      <WithoutProviderLayout>
        {children}
      </WithoutProviderLayout>
    </MyParticipantsProvider>
  );
}

function WithEventsLayout({ children }) {
  const myUserData = useMyUserData();
  return (
    <AllEventsProvider myUserData={myUserData}>
      <WithMyParticipantsLayout>
        {children}
      </WithMyParticipantsLayout>
    </AllEventsProvider>
  );
}

function WithMyUserDataLayout({ children }) {
  const authUser = useAuthUser();
  return (
    <MyUserDataProvider authUser={authUser}>
      <WithEventsLayout>
        {children}
      </WithEventsLayout>
    </MyUserDataProvider>
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
    <MyUserDataProvider>
      <AllEventsProvider>
        <MyParticipantsProvider>
          <AllManagingParticipantsProvider>
            <UsersProvider>
              <div className="fixed left-0 right-0">
                <NavMenu />
              </div>
              <div className="pt-16 min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
                {children}
              </div>
            </UsersProvider>
          </AllManagingParticipantsProvider>
        </MyParticipantsProvider>
      </AllEventsProvider>
    </MyUserDataProvider>
  );
}

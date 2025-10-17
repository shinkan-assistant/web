'use client';

import { createContext, useContext, useEffect, useState } from "react";

import { useMyUser } from "./myUser";
import participantService from "@/services/participant";

const MyParticipantsContext = createContext(null);

function MyParticipantsProvider({ children }) {
  const myUser = useMyUser();
  const [myParticipants, setMyParticipants] = useState(null);

  useEffect(() => {
    (async () => {
      const unsubscribe = await participantService.onSnapshotMe({
        myUser, setMyParticipants
      });
      if (unsubscribe) return unsubscribe;
    })();
  }, [myUser]);

  return (
    <MyParticipantsContext.Provider value={myParticipants}>
      {children}
    </MyParticipantsContext.Provider>
  );
}

function useMyParticipants() {
  return useContext(MyParticipantsContext);
}

export { MyParticipantsProvider, useMyParticipants };

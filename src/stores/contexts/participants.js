'use client';

import { createContext, useContext, useEffect, useState } from "react";

import { useMyUser } from "@/stores/contexts/myUser";
import { useMyParticipants } from "./myParticipants";
import participantService from "@/services/participant";

const ParticipantsContext = createContext(null);

function ParticipantsProvider({ children }) {
  const myUser = useMyUser();
  const myParticipants = useMyParticipants();

  const [participants, setParticipants] = useState(null);

  useEffect(() => {
    (async () => {
      const unsubscribe = await participantService.onSnapshotAllVisible({
        myUser, myParticipants, setParticipants
      });
      if (unsubscribe) return unsubscribe;
    })();
  }, [myUser, myParticipants]);

  return (
    <ParticipantsContext.Provider value={participants}>
      {children}
    </ParticipantsContext.Provider>
  );
}

function useParticipants() {
  return useContext(ParticipantsContext);
}

export { ParticipantsProvider, useParticipants };

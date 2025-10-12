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
    if (!myUser || !myParticipants) {
      setParticipants(null)
      return;
    }
    if (!myUser["belong"]["is_member"]) {
      setParticipants(null)
      return;
    }
    
    return participantService.onSnapshotAllVisible({myUser, myParticipants, setParticipants});
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

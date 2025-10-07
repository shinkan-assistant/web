'use client';

import { createContext, useContext, useEffect, useState } from "react";

import { useMyUser } from "./myUser";
import ParticipantService from "@/db/participant";

const MyParticipantsContext = createContext(null);

function MyParticipantsProvider({ children }) {
  const myUser = useMyUser();
  const [myParticipants, setMyParticipants] = useState(null);

  useEffect(() => {
    if (!myUser) {
      setMyParticipants(null)
      return;
    }
    
    return ParticipantService.onSnapshotMe({
      myUser,
      setMyParticipants
    });
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

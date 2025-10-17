'use client';

import { createContext, useContext, useEffect, useState } from "react";
import { useParticipants } from "@/stores/contexts/participants";
import { useMyUser } from "./myUser";
import userService from "@/services/user";

const UsersContext = createContext(null);

function UsersProvider({ children }) {
  const myUser = useMyUser();
  const participants = useParticipants();

  const [users, setUsers] = useState(null);

  useEffect(() => {
    (async() => {
      const unsubscribe = await userService.onSnapshotAllVisible({
        myUser, participants, setUsers
      });
      if (unsubscribe) return unsubscribe;
    })();
  }, [myUser, participants]);

  return (
    <UsersContext.Provider value={users}>
      {children}
    </UsersContext.Provider>
  );
}

function useUsers() {
  return useContext(UsersContext);
}

export { UsersProvider, useUsers };

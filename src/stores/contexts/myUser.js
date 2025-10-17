'use client';

import { createContext, useContext, useEffect, useState } from "react";
import { useLoadedAuthUser } from "../sessions/authUser";
import userService from "@/services/user";

const MyUserContext = createContext(null);

function MyUserProvider({ children }) {
  const loadedAuthUser = useLoadedAuthUser();
  
  const [myUser, setMyUser] = useState(null);

  useEffect(() => {
    (async() => {
      if (!loadedAuthUser) return;
      const authUser = loadedAuthUser.get();

      const unsubscribe = await userService.onSnapshotMe({
        authUser, setMyUser
      });
      if (unsubscribe) return;
    })();
  }, [loadedAuthUser]);

  return (
    <MyUserContext.Provider value={myUser}>
      {children}
    </MyUserContext.Provider>
  );
}

function useMyUser() {
  return useContext(MyUserContext);
}

export { MyUserProvider, useMyUser };

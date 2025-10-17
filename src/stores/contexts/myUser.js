'use client';

import { createContext, useContext, useEffect, useState } from "react";
import { useAuthUser } from "../sessions/authUser";
import userService from "@/services/user";

const MyUserContext = createContext(null);

function MyUserProvider({ children }) {
  const authUser = useAuthUser();
  
  const [myUser, setMyUser] = useState(null);

  useEffect(() => {
    (async() => {
      const unsubscribe = await userService.onSnapshotMe({
        authUser, setMyUser
      });
      if (unsubscribe) return;
    })();
  }, [authUser]);

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

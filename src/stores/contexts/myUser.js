'use client';

import { createContext, useContext, useEffect, useState } from "react";
import { useAuthUser } from "../sessions/authUser";
import UserService from "@/services/user";

const MyUserContext = createContext(null);

function MyUserProvider({ children }) {
  const authUser = useAuthUser();
  
  const [myUser, setMyUser] = useState(null);

  useEffect(() => {
    if (!authUser?.email) {
      setMyUser(null);
      return;
    }
    
    let unsubscribe = () => {};
    (async() => {
      unsubscribe = await UserService.onSnapshotMe({
        email: authUser.email,
        setMyUser
      });
    })();
    return unsubscribe;
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

'use client';

import { createContext, useContext, useEffect, useState } from "react";
import { getUserDataByEmail } from "../api/get";
import { db } from "@/lib/firebase/clientApp";
import { doc, onSnapshot } from "firebase/firestore";
import { useAuthUser } from "./authUser";

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
      const { id } = await getUserDataByEmail(db, {email: authUser.email});
      const myUserDocRef = doc(db, 'users', id);
      
      // onSnapshotのリスナーを起動
      unsubscribe = onSnapshot(myUserDocRef, (doc) => {
        if (doc.exists()) {
          setMyUser(doc.data());
        }
      }, (error) => {
        // エラーハンドリング
        console.error("onSnapshot error:", error);
      });
    })();

    return () => unsubscribe();

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

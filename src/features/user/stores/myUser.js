'use client';

import { createContext, useContext, useEffect, useState } from "react";
import { db } from "@/lib/firebase/clientApp";
import { doc, onSnapshot } from "firebase/firestore";
import { useAuthUser } from "./authUser";
import { getRecord } from "@/backend/gateways/db/get";

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
      const initialMyUser = await getRecord(db, "users", {uniqueData: {"email": authUser.email}});
      if (!initialMyUser) return;

      const myUserDocRef = doc(db, 'users', initialMyUser.id);
      
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

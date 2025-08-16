'use client';

import { createContext, useContext, useEffect, useState } from "react";
import { getUserDataByEmail } from "../api/get";
import { db } from "@/lib/firebase/clientApp";
import { doc, onSnapshot } from "firebase/firestore";
import { useAuthUser } from "./authUser";

const MyUserDataContext = createContext(null);

function MyUserDataProvider({ children }) {
  const authUser = useAuthUser();
  
  const [myUserData, setMyUserData] = useState(null);

  useEffect(() => {
    if (!authUser?.email) {
      setMyUserData(null);
      return;
    }
    
    let unsubscribe = () => {};

    (async() => {
      const { id } = await getUserDataByEmail(db, {email: authUser.email});
      const myUserDocRef = doc(db, 'users', id);
      
      // onSnapshotのリスナーを起動
      unsubscribe = onSnapshot(myUserDocRef, (doc) => {
        if (doc.exists()) {
          setMyUserData(doc.data());
        }
      }, (error) => {
        // エラーハンドリング
        console.error("onSnapshot error:", error);
      });
    })();

    return () => unsubscribe();

  }, [authUser]);

  return (
    <MyUserDataContext.Provider value={myUserData}>
      {children}
    </MyUserDataContext.Provider>
  );
}

function useMyUserData() {
  return useContext(MyUserDataContext);
}

export { MyUserDataProvider, useMyUserData };

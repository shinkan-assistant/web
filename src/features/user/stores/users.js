'use client';

import { createContext, useContext, useEffect, useState } from "react";
import { db } from "@/lib/firebase/clientApp";
import { onSnapshot, collection } from "firebase/firestore";
import { useAllManagingParticipants } from "@/features/participant/stores/allManagingParticipants";
import { useMyUserData } from "./myUserData";
import { toRecord } from "@/base/api/utils";

const UsersContext = createContext(null);

function UsersProvider({ children }) {
  const myUserData = useMyUserData();
  const allManagingParticipants = useAllManagingParticipants();

  const [users, setUsers] = useState(null);

  useEffect(() => {
    if (!myUserData || !myUserData["belong"]["is_member"] || !allManagingParticipants) {
      setUsers(null);
      return;
    }
    
    let unsubscribe = () => {};

    (async() => {
      const collectionRef = collection(db, "users");

      let targetRef;
      if (myUserData["is_admin"]) {
        targetRef = collectionRef;
      } else {
        const targetParticipants = Set(myParticipants.map(mp => mp["user_email"]));
        targetRef = query(collectionRef, where("email", "in", targetParticipants));
      }
      
      // onSnapshotのリスナーを起動
      unsubscribe = onSnapshot(targetRef, (querySnapshot) => {
        setUsers(querySnapshot.docs.map(doc => toRecord(doc)));
      }, (error) => {
        // エラーハンドリング
        console.error("onSnapshot error:", error);
      });
    })();

    return () => unsubscribe();

  }, [myUserData, allManagingParticipants]);

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

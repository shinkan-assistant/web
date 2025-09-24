'use client';

import { createContext, useContext, useEffect, useState } from "react";
import { db } from "@/lib/firebase/clientApp";
import { onSnapshot, collection } from "firebase/firestore";
import { useParticipants } from "@/features/participant/stores/participants";
import { useMyUser } from "./myUser";
import { toRecord } from "@/backend/gateways/db/utils";

const UsersContext = createContext(null);

function UsersProvider({ children }) {
  const myUser = useMyUser();
  const participants = useParticipants();

  const [users, setUsers] = useState(null);

  useEffect(() => {
    if (!myUser || !myUser["belong"]["is_member"] || !participants) {
      setUsers(null);
      return;
    }
    
    let unsubscribe = () => {};

    (async() => {
      const collectionRef = collection(db, "users");

      let targetRef;
      if (myUser["is_admin"]) {
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

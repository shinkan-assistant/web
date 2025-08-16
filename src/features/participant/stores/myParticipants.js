'use client';

import { createContext, useContext, useEffect, useState } from "react";
import { db } from "@/lib/firebase/clientApp";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { toRecord } from "@/base/api/utils";
import { useMyUserData } from "@/features/user/stores/myUserData";
import { useAllEvents } from "@/features/event/stores/allEvents";

const MyParticipantsContext = createContext(null);

function MyParticipantsProvider({ children }) {
  const myUserData = useMyUserData();
  const [myParticipants, setMyParticipants] = useState(null);

  useEffect(() => {
    if (!myUserData) {
      setMyParticipants(null)
      return;
    }
    
    let unsubscribe = () => {};

    (async() => {
      const collectionRef = collection(db, "participants")
      const q = query(collectionRef, where("user_email", "==", myUserData.email));
      
      // onSnapshotのリスナーを起動
      unsubscribe = onSnapshot(q, (querySnapshot) => {
        setMyParticipants(querySnapshot.docs.map(doc => toRecord(doc)))
      }, (error) => {
        // エラーハンドリング
        console.error("onSnapshot error:", error);
      });
    })();

    return () => unsubscribe();

  }, [myUserData]);

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

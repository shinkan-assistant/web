'use client';

import { createContext, useContext, useEffect, useState } from "react";
import { db } from "@/lib/firebase/clientApp";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { toRecord } from "@/base/api/get";

const MyParticipantsContext = createContext(null);

function MyParticipantsProvider({ myUserData, events, children }) {
  const [myParticipants, setMyParticipants] = useState(null);

  useEffect(() => {
    // 認証ユーザーが存在しない場合は何もしない
    if (myUserData === null) {
      setMyParticipants(null)
      return;
    }
    if (events === null) {
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

  }, [myUserData, events]);

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

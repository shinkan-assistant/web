'use client';

import { createContext, useContext, useEffect, useState } from "react";
import { db } from "@/lib/firebase/clientApp";
import { collection, onSnapshot } from "firebase/firestore";
import { toRecord } from "@/base/api/get";

const AllEventsContext = createContext(null);

function AllEventsProvider({ myUserData, children }) {
  const [allEvents, setAllEvents] = useState(null);

  useEffect(() => {
    // 認証ユーザーが存在しない場合は何もしない
    if (myUserData === null) {
      setAllEvents(null);
      return;
    }
    
    let unsubscribe = () => {};

    (async() => {
      const collectionRef = collection(db, 'events');
      
      // onSnapshotのリスナーを起動
      unsubscribe = onSnapshot(collectionRef, (querySnapshot) => {
        setAllEvents(querySnapshot.docs.map(doc => toRecord(doc)));
      }, (error) => {
        // エラーハンドリング
        console.error("onSnapshot error:", error);
      });
    })();

    return () => unsubscribe();

  }, [myUserData]);

  return (
    <AllEventsContext.Provider value={allEvents}>
      {children}
    </AllEventsContext.Provider>
  );
}

function useAllEvents() {
  return useContext(AllEventsContext);
}

export { AllEventsProvider, useAllEvents };

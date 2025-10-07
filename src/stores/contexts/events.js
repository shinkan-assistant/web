'use client';

import { createContext, useContext, useEffect, useState } from "react";
import { db } from "@/lib/firebase/clientApp";
import { collection, onSnapshot } from "firebase/firestore";
import { useMyUser } from "@/stores/contexts/myUser";
import { toRecord } from "@/helpers/db";

const EventsContext = createContext(null);

function EventsProvider({ children }) {
  const myUser = useMyUser();

  const [events, setEvents] = useState(null);

  useEffect(() => {
    // 認証ユーザーが存在しない場合は何もしない
    if (!myUser) {
      setEvents(null);
      return;
    }
    
    let unsubscribe = () => {};

    (async() => {
      const collectionRef = collection(db, 'events');
      
      // onSnapshotのリスナーを起動
      unsubscribe = onSnapshot(collectionRef, (querySnapshot) => {
        setEvents(querySnapshot.docs.map(doc => toRecord(doc)));
      }, (error) => {
        // エラーハンドリング
        console.error("onSnapshot error:", error);
      });
    })();

    return () => unsubscribe();

  }, [myUser]);

  return (
    <EventsContext.Provider value={events}>
      {children}
    </EventsContext.Provider>
  );
}

function useEvents() {
  return useContext(EventsContext);
}

export { EventsProvider, useEvents };

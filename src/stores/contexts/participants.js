'use client';

import { createContext, useContext, useEffect, useState } from "react";
import { db } from "@/lib/firebase/clientApp";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { toRecord } from "@/backend/helpers/db/utils";
import { useMyUser } from "@/stores/contexts/myUser";
import { useMyParticipants } from "./myParticipants";

const ParticipantsContext = createContext(null);

function ParticipantsProvider({ children }) {
  const myUser = useMyUser();
  const myParticipants = useMyParticipants();

  const [participants, setParticipants] = useState(null);

  useEffect(() => {
    if (!myUser || !myParticipants) {
      setParticipants(null)
      return;
    }
    if (!myUser["belong"]["is_member"]) {
      setParticipants(null)
      return;
    }
    
    let unsubscribe = () => {};

    (async() => {
      const collectionRef = collection(db, "participants")

      let targetRef;
      if (myUser["is_admin"]) {
        targetRef = collectionRef;
      } else {
        const managingEventIds = myParticipants.map(mp => mp["event_id"]);
        targetRef = query(collectionRef, where("event_id", "in", managingEventIds));
      }
      
      // onSnapshotのリスナーを起動
      unsubscribe = onSnapshot(targetRef, (querySnapshot) => {
        setParticipants(querySnapshot.docs.map(doc => toRecord(doc)));
      }, (error) => {
        // エラーハンドリング
        console.error("onSnapshot error:", error);
      });
    })();

    return () => unsubscribe();

  }, [myUser, myParticipants]);

  return (
    <ParticipantsContext.Provider value={participants}>
      {children}
    </ParticipantsContext.Provider>
  );
}

function useParticipants() {
  return useContext(ParticipantsContext);
}

export { ParticipantsProvider, useParticipants };

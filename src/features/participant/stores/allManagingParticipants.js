'use client';

import { createContext, useContext, useEffect, useState } from "react";
import { db } from "@/lib/firebase/clientApp";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { toRecord } from "@/base/api/utils";
import { useMyUserData } from "@/features/user/stores/myUserData";
import { useMyParticipants } from "./myParticipants";

const AllManagingParticipantsContext = createContext(null);

function AllManagingParticipantsProvider({ children }) {
  const myUserData = useMyUserData();
  const myParticipants = useMyParticipants();

  const [allManagingParticipants, setAllManagingParticipants] = useState(null);

  useEffect(() => {
    if (!myUserData || !myParticipants) {
      setAllManagingParticipants(null)
      return;
    }
    if (!myUserData["belong"]["is_member"]) {
      setAllManagingParticipants(null)
      return;
    }
    
    let unsubscribe = () => {};

    (async() => {
      const collectionRef = collection(db, "participants")

      let targetRef;
      if (myUserData["is_admin"]) {
        targetRef = collectionRef;
      } else {
        const managingEventIds = myParticipants.map(mp => mp["event_id"]);
        targetRef = query(collectionRef, where("event_id", "in", managingEventIds));
      }
      
      // onSnapshotのリスナーを起動
      unsubscribe = onSnapshot(targetRef, (querySnapshot) => {
        setAllManagingParticipants(querySnapshot.docs.map(doc => toRecord(doc)));
      }, (error) => {
        // エラーハンドリング
        console.error("onSnapshot error:", error);
      });
    })();

    return () => unsubscribe();

  }, [myUserData, myParticipants]);

  return (
    <AllManagingParticipantsContext.Provider value={allManagingParticipants}>
      {children}
    </AllManagingParticipantsContext.Provider>
  );
}

function useAllManagingParticipants() {
  return useContext(AllManagingParticipantsContext);
}

export { AllManagingParticipantsProvider, useAllManagingParticipants };

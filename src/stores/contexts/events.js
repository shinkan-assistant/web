'use client';

import { createContext, useContext, useEffect, useState } from "react";
import { useMyUser } from "./myUser";
import { onSnapshotRecords } from "@/helpers/db";
import EventService from "@/db/event";

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
    
    // TODO myParticipantsに対応して、それぞれのeventの取得できる情報を変える
    return EventService.onSnapshotAll({setEvents});
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

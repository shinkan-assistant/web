import { where } from "firebase/firestore";
import { getRecordById, getRecord, getRecords } from "@/base/api/get";
import { getUserMetadataByEmail } from "@/features/user/api/get";

function toEventRecord({rawEvent, myParticipant}) {
  if (rawEvent === null) return null;
  
  return {
    "is_organizer": myParticipant?.is_organizer ?? null,
    ...rawEvent,
  }
}

function toEventRecords({rawEvents, myParticipants}) {""
  return rawEvents.map(rawEvent => {
    return toEventRecord({
      rawEvent: rawEvent, 
      myParticipant: myParticipants.find(p => p["event_id"] === rawEvent["id"])
    });
  })
}

export async function getEventByAuthUser(db, {id, authUser}) {
  const myUserMetadata = await getUserMetadataByEmail(db, {email: authUser.email});

  const myParticipant = await getRecord(db, "participants", {
    wheres: [
      
      where("event_id", "==", id),
      where("user_email", "==", authUser.email),
    ]
  });
  if (!(myUserMetadata["is_admin"] || myParticipant)) return null;

  return toEventRecord({
    rawEvent: await getRecordById(db, "events", {id: id}),
    myParticipant: myParticipant
  });
}


export async function getParticipatingEvents(db, {authUser}) {
  const myParticipants = await getRecords(db, "participants", {
    wheres: [
      where("user_email", "==", authUser.email),
    ]
  });
  const participatingEventIds = myParticipants.map(p => p["event_id"]);

  let events;
  if(participatingEventIds.length > 0) {
    events = await getRecords(db, "events", {
      wheres: [where("__name__", "in", participatingEventIds)]
    });
  }
  else {
    events = [];
  }

  return toEventRecords({
    rawEvents: events,
    myParticipants: myParticipants
  });
}

export async function getRegistrableEvents(db, {authUser}) {
  const myParticipants = await getRecords(db, "participants", {
    wheres: [
      where("user_email", "==", authUser.email),
    ]
  });
  const participatingEventIds = myParticipants.map(p => p["event_id"]);

  let events = await getRecords(db, "events", {wheres: []});
  if(participatingEventIds.length > 0) 
    events = events.filter(event => !participatingEventIds.includes(event.id));

  return toEventRecords({
    rawEvents: events,
    myParticipants: [],
  });
}

export async function getOrganizerEvents(db, {authUser}) {
  const myUserMetadata = await getUserMetadataByEmail(db, {email: authUser.email});
  if (!myUserMetadata["belong"]["is_member"]) return null;
  
  const myOrganizers = await getRecords(db, "participants", {
    wheres: [
      where("user_email", "==", authUser.email),
      where("is_organizer", "==", true),
    ]
  });

  let events = [];
  if (myUserMetadata["is_admin"]) {
    events = await getRecords(db, "events", {wheres: []});
  }
  else {
    const organizedEventIds = myOrganizers.map(p => p["event_id"]);
    if (organizedEventIds.length == 0) {
      events = [];
    }
    else {
      events = await getRecords(db, "events", {
        wheres: [where("__name__", "in", organizedEventIds)]
      });
    }
  }

  return toEventRecords({
    rawEvents: events,
    myParticipants: myOrganizers
  });
}

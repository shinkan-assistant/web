import { where } from "firebase/firestore";
import { getRecord, getRecordById, getRecords } from "./base";
import { getUserByEmail } from "./user";

export async function judgeOrganizerOrAdmin(db, {eventId, loginUser}) {
  const myParticipant = getRecord(db, "participants", {
    wheres: [
      where("event_id", "==", eventId),
      where("user_email", "==", loginUser.email),
    ]
  });
  
  if (myParticipant?.["is_organizer"]) 
    return true;

  const myUser = await getUserByEmail(db, {email: loginUser.email});
  if (myUser["is_admin"])
    return true;

  return false;
}

export async function judgeParticipateOrAdmin(db, {eventId, loginUser}) {
  const myParticipant = getRecord(db, "participants", {
    wheres: [
      where("event_id", "==", eventId),
      where("user_email", "==", loginUser.email),
    ]
  });
  
  if (myParticipant) 
    return true;

  const myUser = await getUserByEmail(db, {email: loginUser.email});
  if (myUser["is_admin"])
    return true;

  return false;
}

function toEventRecord({raw, myParticipant}) {
  if (raw === null) return null;
  
  return {
    "is_organizer": myParticipant?.is_organizer ?? null,
    ...raw,
  }
}

export async function getEventByLoginUser(db, {id, loginUser}) {
  const myUser = await getUserByEmail(db, {email: loginUser.email});

  const myParticipant = await getRecord(db, "participants", {
    wheres: [
      where("event_id", "==", id),
      where("user_email", "==", loginUser.email),
    ]
  });
  if (!(myUser["is_admin"] || myParticipant)) return null;

  return toEventRecord({
    raw: await getRecordById(db, "events", {id: id}),
    myParticipant: myParticipant
  });
}

export async function getEventsByLoginUser(db, {loginUser}) {
  const myParticipants = await getRecords(db, "participants", {
    wheres: [
      where("user_email", "==", loginUser.email),
    ]
  });
  const eventIds = myParticipants.map(p => p["event_id"]);

  const myUser = await getUserByEmail(db, {email: loginUser.email});

  let wheres;
  if (myUser["is_admin"]) wheres = [];
  else if(eventIds.length > 0) wheres = [where("__name__", "in", eventIds)]
  else return [];
  const events = await getRecords(db, "events", {wheres: wheres});

  return events.map(event => {
    return toEventRecord({
      raw: event, 
      myParticipant: myParticipants.find(p => p["event_id"] === event["id"])
    });
  })
}

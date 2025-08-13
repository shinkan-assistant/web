import { where } from "firebase/firestore";
import { getRecord, getRecords } from "../../../base/api/get";
import { getUserDataByEmail } from "../../user/api/get";

export async function getMyParticipantByEvent(db, {authUser, eventId}) {
  return getRecord(db, "participants", {
    wheres: [
      where("event_id", "==", eventId),
      where("user_email", "==", authUser.email),
    ]
  });
}

export async function getParticipantsByEvent(db, {authUser, eventId}) {
  const participants = await getRecords(db, "participants", {
    wheres: [
      where("event_id", "==", eventId),
    ]
  });
  
  const myParticipant = participants.find((p) => (p["user_email"] === authUser.user_email));
  if (myParticipant?.["is_organizer"]) 
    return participants;

  const myUserData = await getUserDataByEmail(db, {email: authUser.email});
  if (myUserData["is_admin"])
    return participants;

  return [];
}

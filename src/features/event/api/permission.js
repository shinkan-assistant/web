import { getRecord } from "@/base/api/get";
import { getUserDataByEmail } from "@/features/user/api/get";
import { where } from "firebase/firestore";

export async function judgeOrganizerOrAdmin(db, {eventId, authUser}) {
  const myParticipant = getRecord(db, "participants", {
    wheres: [
      where("event_id", "==", eventId),
      where("user_email", "==", authUser.email),
    ]
  });
  
  if (myParticipant?.["is_organizer"]) 
    return true;

  const myUserData = await getUserDataByEmail(db, {email: authUser.email});
  if (myUserData["is_admin"])
    return true;

  return false;
}

export async function judgeParticipateOrAdmin(db, {eventId, authUser}) {
  const myParticipant = getRecord(db, "participants", {
    wheres: [
      where("event_id", "==", eventId),
      where("user_email", "==", authUser.email),
    ]
  });
  
  if (myParticipant) 
    return true;

  const myUserData = await getUserDataByEmail(db, {email: authUser.email});
  if (myUserData["is_admin"])
    return true;

  return false;
}

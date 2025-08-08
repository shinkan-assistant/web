import { getRecord } from "@/base/api/get";
import { getUserMetadataByEmail } from "@/features/user/api/get";
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

  const myUserMetadata = await getUserMetadataByEmail(db, {email: authUser.email});
  if (myUserMetadata["is_admin"])
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

  const myUserMetadata = await getUserMetadataByEmail(db, {email: authUser.email});
  if (myUserMetadata["is_admin"])
    return true;

  return false;
}

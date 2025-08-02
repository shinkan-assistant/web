import { where } from "firebase/firestore";
import { getRecord, getRecords } from "./base";
import { getUserByEmail } from "./user";
import { RoleEnum as UserRoleEnum } from "../enums/user";
import { RoleEnum as ParticipantRoleEnum } from "../enums/participant";

export async function getMyParticipant(db, {loginUser, eventId}) {
  return getRecord(db, "participants", {
    wheres: [
      where("event_id", "==", eventId),
      where("user_email", "==", loginUser.email),
    ]
  });
}

export async function getParticipantsByEvent(db, {loginUser, eventId}) {
  const participants = await getRecords(db, "participants", {
    wheres: [
      where("event_id", "==", eventId),
    ]
  });
  
  const myParticipant = participants.find((p) => (p["user_email"] === loginUser.user_email));
  if (myParticipant?.role === ParticipantRoleEnum.organizer) 
    return participants;

  const user = await getUserByEmail(db, {email: loginUser.email});
  if (user.role === UserRoleEnum.admin)
    return participants;

  return [];
}

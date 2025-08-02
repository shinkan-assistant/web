import { where } from "firebase/firestore";
import { getRecord, getRecordById, getRecords } from "./base";
import { RoleEnum as UserRoleEnum } from "../enums/user";

export async function judgeOrganizerOrAdmin(db, {eventId, loginUser}) {
  const myParticipant = getRecord(db, "participants", {
    wheres: [
      where("event_id", "==", eventId),
      where("user_email", "==", loginUser.email),
    ]
  });
  
  if (myParticipant?.role === ParticipantRoleEnum.organizer) 
    return true;

  const user = await getUserByEmail(db, {email: loginUser.email});
  if (user.role === UserRoleEnum.admin)
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
  
  if (!myParticipant) 
    return true;

  const user = await getUserByEmail(db, {email: loginUser.email});
  if (user.role === UserRoleEnum.admin)
    return true;

  return false;
}

export async function getEventByUser(db, {id, loginUser}) {
  const isParticipateOrAdmin = await judgeParticipateOrAdmin(db, {eventId: id, loginUser})
  if (isParticipateOrAdmin) return null;

  return await getRecordById(db, "events", {id: id});
}

export async function getEventsByUser(db, {loginUser}) {
  const user = await getUserByEmail(db, {email: loginUser.email});
  if (user.role === UserRoleEnum.admin)
    return await getRecords(db, "events", {where: []});

  const eventIds = await getRecords(db, "participants", {
    wheres: [
      where("user_email", "==", loginUser.email),
    ]
  }).map(p => p["event_id"]);

  return await getRecords(db, "events", {
    wheres: [where("__name__", "in", eventIds)]
  });
}

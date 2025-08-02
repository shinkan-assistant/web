import { where } from "firebase/firestore";
import { getRecord, getRecordById, getRecords } from "./base";
import { RoleEnum as UserRoleEnum } from "../enums/user";
import { getUserByEmail } from "./user";

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
  
  if (myParticipant) 
    return true;

  const myUser = await getUserByEmail(db, {email: loginUser.email});
  if (myUser.role === UserRoleEnum.admin)
    return true;

  return false;
}

function toEventRecord({raw, myParticipant}) {
  if (raw === null) return null;
  
  return {
    myRole: myParticipant?.role ?? null,
    ...raw,
  }
}

export async function getEventByLoginUser(db, {id, loginUser}) {
  const myParticipant = await getRecord(db, "participants", {
    wheres: [
      where("event_id", "==", id),
      where("user_email", "==", loginUser.email),
    ]
  });

  const myUser = await getUserByEmail(db, {email: loginUser.email});

  if (!(myParticipant || myUser?.role === UserRoleEnum.admin)) return null;

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

  const wheres = (myUser.role !== UserRoleEnum.admin) ? [where("__name__", "in", eventIds)] : []
  const events = await getRecords(db, "events", {wheres: wheres});

  return events.map(event => {
    return toEventRecord({
      raw: event, 
      myParticipant: myParticipants.find(p => p["event_id"] === event["id"])
    });
  })
}

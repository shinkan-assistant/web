import { createRecord } from "@/base/api/create";
import { CreateParticipantSchema } from "../schemas/api";

export async function createNormalParticipant(db, {userEmail, eventId, scheduleIds}) {
  // userEmailとeventIdはちゃんとしている前提
  await createRecord(db, "participants", {
    Schema: CreateParticipantSchema,
    rawData: {
      "user_email": userEmail,
      "event_id": eventId,
      "is_organizer": true,
      "schedule_ids": scheduleIds,
    }, 
  });
}

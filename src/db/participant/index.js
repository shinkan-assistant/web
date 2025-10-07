import { createRecord } from "@/helpers/db/create";
import { updateRecord } from "@/helpers/db/update";
import { CreateParticipantSchema, UpdateParticipantSchedulesSchema } from "./schema/proc";

export default class ParticipantDbGW {
  static async applyEvent({userEmail, eventId, scheduleIds}) {
    // TODO 権限管理
    await createRecord("participants", {
      Schema: CreateParticipantSchema,
      uniqueData: {
        "user_email": userEmail,
        "event_id": eventId,
      },
      otherData: {
        "is_organizer": false,
        "schedule_ids": scheduleIds,
      }
    });
  }

  static async updateSchedules({myParticipant, formData}) {
    // TODO 権限管理
    await updateRecord("participants", {
      Schema: UpdateParticipantSchedulesSchema,
      initialData: myParticipant,
      formData: formData,
    });
  }
}

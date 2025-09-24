import { CreateParticipantSchema, UpdateParticipantSchedulesSchema } from "@/backend/gateways/db/participant/schemas/proc";
import DbGatewayBase from "../base/model";
import { createRecord } from "../base/create";
import { updateRecord } from "../base/update";
import { db } from "@/lib/firebase/clientApp";

class ParticipantDbGateway extends DbGatewayBase {
  constructor() {
    super("participants");
  }

  async createEvent({userEmail, eventId, isOrganizer, scheduleIds}) {
    await createRecord(db, this.tableName, {
      Schema: CreateParticipantSchema,
      uniqueData: {
        "user_email": userEmail,
        "event_id": eventId,
      },
      otherData: {
        "is_organizer": isOrganizer,
        "schedule_ids": scheduleIds,
      }
    });
  }

  async updateSchedules({myParticipant, formData}) {
    await updateRecord(db, this.tableName, {
      Schema: UpdateParticipantSchedulesSchema,
      initialData: myParticipant,
      formData: formData,
    });
  }
}


const dbGateway = new ParticipantDbGateway();
export default dbGateway;

import { createRecord, onSnapshotRecords, updateRecord } from "@/helpers/db/repository";
import { CreateParticipantSchema, UpdateParticipantSchedulesSchema } from "./schema/proc";
import { where } from "firebase/firestore";

export default class ParticipantService {
  static onSnapshotMe({myUser, setMyParticipants}) {
    return onSnapshotRecords("participants", {
      constraints: [where("user_email", "==", myUser.email)],
      setContext: setMyParticipants
    });
  }

  static onSnapshotAllVisible({myUser, myParticipants, setParticipants}) {
    const constraints = [];
    if (!myUser["is_admin"]) {
      const myOrganizers = myParticipants.filter(mp => mp["is_organizer"]);
      const organizedEventIds = myOrganizers.map(mp => mp["event_id"]);
      constraints.concat([
        where("event_id", "in", organizedEventIds)
      ]);
    }

    return onSnapshotRecords("participants", {
      constraints,
      setContext: setParticipants,
    });
  }

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

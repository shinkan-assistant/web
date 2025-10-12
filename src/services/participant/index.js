import Service from "@/helpers/db/service";
import { CreateParticipantSchema, UpdateParticipantSchedulesSchema } from "./schema/proc";
import { where } from "firebase/firestore";

class ParticipantService extends Service {
  constructor() {
    super({tableName: "participants"});
  }

  onSnapshotMe({myUser, setMyParticipants}) {
    return this.repo.onSnapshotRecords({
      constraints: [where("user_email", "==", myUser.email)],
      setContext: setMyParticipants
    });
  }

  onSnapshotAllVisible({myUser, myParticipants, setParticipants}) {
    const constraints = [];
    if (!myUser["is_admin"]) {
      const myOrganizers = myParticipants.filter(mp => mp["is_organizer"]);
      const organizedEventIds = myOrganizers.map(mp => mp["event_id"]);
      constraints.concat([
        where("event_id", "in", organizedEventIds)
      ]);
    }

    return this.repo.onSnapshotRecords({
      constraints,
      setContext: setParticipants,
    });
  }

  async applyEvent({userEmail, eventId, scheduleIds}) {
    // TODO 権限管理
    await this.repo.createRecord({
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

  async updateSchedules({myParticipant, formData}) {
    // TODO 権限管理
    await this.repo.updateRecord({
      Schema: UpdateParticipantSchedulesSchema,
      initialData: myParticipant,
      formData: formData,
    });
  }
}

const participantService = new ParticipantService();
export default participantService;

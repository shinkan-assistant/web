import { onSnapshotRecords, updateRecord } from "@/helpers/db";
import { UpdateEventSchema } from "./schema/proc";

export default class EventService {
  static onSnapshotAll({setEvents}) {
    return onSnapshotRecords("events", {
      constraints: [],
      setContext: setEvents
    });
  }

  static async updateDetail({event, formData}) {
    // TODO 権限確認
    await updateRecord("participants", {
      Schema: UpdateEventSchema,
      initialData: event,
      formData: formData,
    });
  }
}

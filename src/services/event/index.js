import Service from "@/helpers/db/service";
import { UpdateEventSchema } from "./schema/proc";

class EventService extends Service {
  constructor() {
    super({tableName: "events"});
  }

  onSnapshotAll({setEvents}) {
    return this.repo.onSnapshotRecords({
      constraints: [],
      setContext: setEvents
    });
  }

  async updateDetail({event, formData}) {
    // TODO 権限確認
    await this.repo.updateRecord({
      Schema: UpdateEventSchema,
      initialData: event,
      formData: formData,
    });
  }
}

const eventService = new EventService();
export default eventService;

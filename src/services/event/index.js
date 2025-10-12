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

  async updateDetail(initialData, roughLocationName) {
    await this.repo.updateRecord({
      Schema: UpdateEventSchema,
      initialData,
      formData: {roughLocationName},
    });
  }
}

const eventService = new EventService();
export default eventService;

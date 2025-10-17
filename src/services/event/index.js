import Service from "@/helpers/db/service";
import { UpdateEventSchema } from "./schema/proc";

class EventService extends Service {
  constructor() {
    super({tableName: "events"});
  }

  async getById({id}) {
    return await this.repo.getRecordById({id})
  }

  async onSnapshotAll({myUser, setEvents}) {
    // 認証ユーザーが存在しない場合は何もしない
    if (!myUser) {
      setEvents(null);
      return;
    }

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

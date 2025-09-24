import DbGatewayBase from "../base/model";
import { updateRecord } from "../base/update";
import { db } from "@/lib/firebase/clientApp";
import { UpdateEventSchema } from "./schemas/proc";

class EventDbGateway extends DbGatewayBase {
  constructor() {
    super("events");
  }

  async updateDetail({event, formData}) {
    await updateRecord(db, this.tableName, {
      Schema: UpdateEventSchema,
      initialData: event,
      formData: formData,
    });
  }
}


const dbGateway = new EventDbGateway();
export default dbGateway;

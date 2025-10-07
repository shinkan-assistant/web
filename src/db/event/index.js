import { updateRecord } from "@/helpers/db/update";
import { UpdateEventSchema } from "./schema/proc";

export default class EventDbGW {
  static async updateDetail({event, formData}) {
    // TODO 権限確認
    await updateRecord("participants", {
      Schema: UpdateEventSchema,
      initialData: event,
      formData: formData,
    });
  }
}

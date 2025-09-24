import controller from "@/backend/controllers/event";

export default class EventAPI {
  static async updateDetail({userEmail, eventId, scheduleIds}) {
    // TODO 権限確認
    await controller.updateDetail({userEmail, eventId, scheduleIds});
  }
}

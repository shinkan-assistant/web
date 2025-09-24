import controller from "@/backend/controllers/participant";

export default class ParticipantAPI {
  static async applyEvent({userEmail, eventId, scheduleIds}) {
    // TODO 権限確認
    await controller.applyEvent({userEmail, eventId, scheduleIds});
  }

  static async updateSchedules({myParticipant, formData}) {
    // TODO 権限確認
    await controller.updateSchedules({myParticipant, formData});
  }
}

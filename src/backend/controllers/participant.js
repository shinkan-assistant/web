import dbGateway from "@/backend/gateways/db/participant/model";
import ControllerBase from "./base";

class ParticipantController extends ControllerBase {
  constructor() {
    super(dbGateway);
  }

  async applyEvent({userEmail, eventId, scheduleIds}) {
    await dbGateway.createEvent({
      userEmail, eventId, isOrganizer: false, scheduleIds
    });
  }

  async updateSchedules({myParticipant, formData}) {
    await dbGateway.updateSchedules({myParticipant, formData});
  }
}

const controller = new ParticipantController();
export default controller;

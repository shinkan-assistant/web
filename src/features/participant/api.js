import ParticipantAPI from "@/backend/features/participant/route";

class ParticipantGateway {
  async applyEvent({userEmail, eventId, scheduleIds}) {
    await ParticipantAPI.applyEvent({userEmail, eventId, scheduleIds});
  }

  async updateSchedules({myParticipant, formData}) {
    await ParticipantAPI.updateSchedules({myParticipant, formData});
  }
}

const participantGateway = new ParticipantGateway();
export default participantGateway;

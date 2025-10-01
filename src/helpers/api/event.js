import EventAPI from "@/backend/features/event/route";

class EventGateway {
  async updateDetail({event, formData}) {
    await EventAPI.updateDetail({event, formData});
  }
}

const eventGateway = new EventGateway();
export default eventGateway;

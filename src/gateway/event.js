import EventAPI from "@/backend/gateways/frontend/event";

class EventGateway {
  async updateDetail({event, formData}) {
    await EventAPI.updateDetail({event, formData});
  }
}

const eventGateway = new EventGateway();
export default eventGateway;

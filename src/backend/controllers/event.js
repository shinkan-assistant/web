import dbGateway from "../gateways/db/event/model";
import ControllerBase from "./base";

class EventController extends ControllerBase {
  constructor() {
    super(dbGateway);
  }

  async updateSchedules({event, formData}) {
    await dbGateway.updateSchedules({event, formData});
  }
}

const controller = new EventController();
export default controller;

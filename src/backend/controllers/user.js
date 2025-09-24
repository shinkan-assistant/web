import dbGateway from "../gateways/db/user/model";
import ControllerBase from "./base";

class UserController extends ControllerBase {
  constructor() {
    super(dbGateway);
  }

  async exists({email}) {
    const user = await dbGateway.getUser({email});
    return Boolean(user);
  }
}

const controller = new UserController();
export default controller;

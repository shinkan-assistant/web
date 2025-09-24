import UserAPI from "@/backend/gateways/frontend/user";

class UserGateway {
  async exists({email}) {
    return await UserAPI.exists({email});
  }
}

const userGateway = new UserGateway();
export default userGateway;

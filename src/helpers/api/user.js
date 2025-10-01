import UserAPI from "@/backend/features/user/route";

class UserGateway {
  async exists({email}) {
    return await UserAPI.exists({email});
  }
}

const userGateway = new UserGateway();
export default userGateway;

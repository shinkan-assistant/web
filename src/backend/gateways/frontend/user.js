import controller from "@/backend/controllers/user";

export default class UserAPI {
  static async exists({email}) {
    // TODO 権限確認
    return await controller.exists({email});
  }
}

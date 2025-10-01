import { getRecord } from "@/backend/helpers/db/get";

export default class UserRoute {
  async exists({email}) {
    // TODO 権限確認
    const user = await getRecord(
      "users", { 
        uniqueData: {email} }
      );
    return Boolean(user);
  }
}

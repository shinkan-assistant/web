import { getRecord } from "@/helpers/db";

export default class UserDbGW {
  static async exists({email}) {
    // TODO 権限確認
    const user = await getRecord(
      "users", { 
        uniqueData: {email} }
      );
    return Boolean(user);
  }
}

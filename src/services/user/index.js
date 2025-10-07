import { getRecord, onSnapshotRecord, onSnapshotRecords } from "@/helpers/db/repository";
import { where } from "firebase/firestore";

export default class UserService {
  static async exists({email}) {
    // TODO 権限確認
    const user = await getRecord(
      "users", { 
        uniqueData: {email} }
      );
    return Boolean(user);
  }

  static async onSnapshotMe({email, setMyUser}) {
    const initialMyUser = await getRecord("users", {
      uniqueData: {"email": email}
    });
    if (!initialMyUser) return;

    return onSnapshotRecord("users", {
      id: initialMyUser.id,
      setContext: setMyUser
    });
  }

  static onSnapshotAllVisible({myUser, participants, setUsers}) {
    const constraints = [];
    if (!myUser["is_admin"]) {
      const emails = Set(participants.map(p => p["user_email"]))
      constraints.concat([
        where("email", "in", emails),
      ]);
    }

    return onSnapshotRecords("users", {
      constraints: [],
      setContext: setUsers
    });
  }
}

import Service from "@/helpers/db/service";
import { where } from "firebase/firestore";

class UserService extends Service {
  constructor() {
    super({tableName: "users"});
  }

  async exists({email}) {
    // TODO 権限確認
    const user = await this.repo.getRecord({ 
      uniqueData: {email}
    });
    return Boolean(user);
  }

  async onSnapshotMe({email, setMyUser}) {
    const initialMyUser = await this.repo.getRecord({
      uniqueData: {"email": email}
    });
    if (!initialMyUser) return;

    return this.repo.onSnapshotRecord({
      id: initialMyUser.id,
      setContext: setMyUser
    });
  }

  onSnapshotAllVisible({myUser, participants, setUsers}) {
    const constraints = [];
    if (!myUser["is_admin"]) {
      const emails = Set(participants.map(p => p["user_email"]))
      constraints.concat([
        where("email", "in", emails),
      ]);
    }

    return this.repo.onSnapshotRecords({
      constraints: [],
      setContext: setUsers
    });
  }
}

const userService = new UserService();
export default userService;

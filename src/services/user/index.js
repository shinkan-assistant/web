import Service from "@/helpers/db/service";
import { where } from "firebase/firestore";
import { CreateUserSchema } from "./schema/proc";

class UserService extends Service {
  constructor() {
    super({tableName: "users"});
  }

  async exists({email}) {
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

  async create({
    email, family_name, given_name, university, gender, 
    academic_level, grade, keyword_for_member, 
  }) {
    // TODO サーバー側に移す
    const belong = {
      "is_member": keyword_for_member === "everyday-fun"
    };
    
    await this.repo.createRecord({ 
      Schema: CreateUserSchema,
      uniqueData: {email},
      otherData: {
        family_name,
        given_name,
        university,
        gender,
        academic_level,
        grade,
        belong,
      }
    });
  }
}

const userService = new UserService();
export default userService;

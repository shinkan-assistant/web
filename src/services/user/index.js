import Service from "@/helpers/db/service";
import { where } from "firebase/firestore";
import { CreateUserSchema } from "./schema/proc";

class UserService extends Service {
  constructor() {
    super({tableName: "users"});
  }

  async get({email}) {
    return await this.repo.getRecord({ 
      uniqueData: {email}
    });
  }

  async exists({email}) {
    return Boolean(await this.get({email}));
  }

  async onSnapshotMe({authUser, setMyUser}) {
    if (!authUser) {
      setMyUser(null);
      return;
    }

    return this.repo.onSnapshotRecord({
      uniqueData: {"email": authUser.email},
      setContext: setMyUser
    });
  }

  async onSnapshotAllVisible({myUser, participants, setUsers}) {
    if (!myUser || !myUser["belong"]["is_member"] || !participants) {
      setUsers(null);
      return;
    }

    const constraints = [];
    if (!myUser["is_admin"]) {
      const emails = Set(participants.map(p => p["user_email"]))
      constraints.concat([
        where("email", "in", emails),
      ]);
    }

    return this.repo.onSnapshotRecords({
      constraints,
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

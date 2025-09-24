import DbGatewayBase from "../base/model";
import { db } from "@/lib/firebase/clientApp";
import { getRecord } from "../base/get";

class UserDbGateway extends DbGatewayBase {
  constructor() {
    super("users");
  }

  async getUser({email}) {
    return await getRecord(
      db, this.tableName, { 
        uniqueData: {email} }
      );
  }
}


const dbGateway = new UserDbGateway();
export default dbGateway;

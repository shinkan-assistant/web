import { where } from "firebase/firestore";
import { getRecord } from '../../../base/api/get';

export async function getUserMetadataByEmail(db, {email}) {
  return getRecord(db, "users", {
    wheres: [
      where("email", "==", email)
    ]
  });
}

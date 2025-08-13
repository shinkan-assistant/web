import { collection, getDocs, query, where } from "firebase/firestore";
import { toRecord } from '../../../base/api/utils';

export async function getUserDataByEmail(db, {email}) {
  const collectionRef = collection(db, "users");
  const querySnapshot = await getDocs(
    query(collectionRef, where("email", "==", email))
  );
  const records = querySnapshot.docs.map((docSnapshot) => toRecord(docSnapshot));
  return records[0] ?? null;
}

import { collection, getDocs, query, where } from "firebase/firestore";
import { toRecord } from "./utils";

export async function getRecords(db, tableName, {constraints}) {
  const collectionRef = collection(db, tableName);
  const querySnapshot = await getDocs(query(collectionRef, ...constraints));
  return querySnapshot.docs.map((docSnapshot) => toRecord(docSnapshot));
}

export async function getRecord(db, tableName, {uniqueData}) {
  const constraints = Object.keys(uniqueData)
    .map(name => where(name, "==", uniqueData[name]));
  const records = await getRecords(db, tableName, {constraints});
  return records[0] ?? null;
}

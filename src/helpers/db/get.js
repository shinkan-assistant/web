import { collection, getDocs, query, where } from "firebase/firestore";
import { toRecord } from "./utils";
import { db } from "@/lib/firebase/clientApp";

export async function getRecords(tableName, {constraints}) {
  const collectionRef = collection(db, tableName);
  const querySnapshot = await getDocs(query(collectionRef, ...constraints));
  return querySnapshot.docs.map((docSnapshot) => toRecord(docSnapshot));
}

export async function getRecord(tableName, {uniqueData}) {
  const constraints = Object.keys(uniqueData)
    .map(name => where(name, "==", uniqueData[name]));
  const records = await getRecords(tableName, {constraints});
  return records[0] ?? null;
}

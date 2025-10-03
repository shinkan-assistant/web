import { doc, setDoc } from "firebase/firestore";
import { getRecord } from "./get";
import { db } from "@/lib/firebase/clientApp";

export async function createRecord(tableName, {Schema, uniqueData, otherData}) {
  const record = await getRecord(tableName, {uniqueData});
  if (!!record) {
    throw new Error("重複しています。");
  }

  const {id, ...data} = Schema.parse({...uniqueData, ...otherData});
  const docRef = doc(db, tableName, id);
  await setDoc(docRef, data);
}

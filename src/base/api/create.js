import { doc, setDoc } from "firebase/firestore";
import { getRecord } from "./get";

export async function createRecord(db, tableName, {Schema, uniqueData, otherData}) {
  const record = await getRecord(db, tableName, {uniqueData});
  if (!!record) {
    throw new Error("重複しています。");
  }


  const {id, ...data} = Schema.parse({...uniqueData, ...otherData});
  const docRef = doc(db, tableName, id);
  await setDoc(docRef, data);
}

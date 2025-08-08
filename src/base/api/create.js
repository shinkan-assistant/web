import { doc, setDoc } from "firebase/firestore";

export async function createRecord(db, tableName, {Schema, record}) {
  const {id, ...data} = Schema.parse(record);
  const docRef = doc(db, tableName, id);
  await setDoc(docRef, data);
}

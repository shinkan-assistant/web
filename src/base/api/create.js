import { doc, setDoc } from "firebase/firestore";

export async function createRecord(db, tableName, {Schema, rawData}) {
  const {id, ...data} = Schema.parse(rawData);
  const docRef = doc(db, tableName, id);
  await setDoc(docRef, data);
}

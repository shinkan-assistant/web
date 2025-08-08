import { doc, updateDoc } from "firebase/firestore";

export async function updateRecord(db, tableName, {Schema, id, rawData}) {
  if (!id) {
    throw new Error('Item ID is required for update operation.');
  }

  const data = Schema.parse(rawData);

  const docRef = doc(db, tableName, id);
  await updateDoc(docRef, data);
}

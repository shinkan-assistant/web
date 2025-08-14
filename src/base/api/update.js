import { doc, updateDoc } from "firebase/firestore";

export async function updateRecord(db, tableName, {Schema, initial, formData}) {
  const id = initial["id"];

  if (id) {
    throw new Error('Item ID is required for update operation.');
  }

  const data = Schema.parse({ initial, formData });

  const docRef = doc(db, tableName, id);
  await updateDoc(docRef, data);
}

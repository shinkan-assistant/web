import { doc, updateDoc } from "firebase/firestore";

export async function updateRecord(db, tableName, {Schema, initialData, formData}) {
  const id = initialData["id"];

  if (!id) {
    throw new Error('Item ID is required for update operation.');
  }

  const data = Schema.parse({ 
    initialData: {...initialData}, 
    formData
  });

  const docRef = doc(db, tableName, id);
  await updateDoc(docRef, data);
}

import { db } from "@/lib/firebase/clientApp";
import { doc, deleteDoc } from "firebase/firestore";

export async function deleteRecord(tableName, {id}) {
  if (!id) {
    throw new Error('Item ID is required for delete operation.');
  }

  const docRef = doc(db, tableName, id);
  await deleteDoc(docRef);
}

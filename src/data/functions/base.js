import { collection, deleteDoc, doc, getDoc, getDocs, setDoc } from "firebase/firestore";

export async function createRecord(db, tableName, {Schema, record}) {
  const {id, ...data} = Schema.parse(record);
  const docRef = doc(db, tableName, id);
  await setDoc(docRef, data);
}

function toRecord(docSnapshot) {
  return {
    id: docSnapshot.id,
    ...docSnapshot.data()
  }; 
}

export async function getRecordById(db, tableName, {id}) {
    const docRef = doc(db, tableName, id);
    const docSnapshot = await getDoc(docRef);

    if (docSnapshot.exists()) {
      return toRecord(docSnapshot);
    } else {
      return null;
    }
}

export async function getRecords(db, tableName, {wheres}) {
  const collectionRef = collection(db, tableName);
  const querySnapshot = await getDocs(
    query(collectionRef, ...wheres)
  );
  return querySnapshot.docs.map((docSnapshot) => toRecord(docSnapshot));
}

export async function getRecord(db, tableName, {wheres}) {
  const records = await getRecords(db, tableName, {wheres})

  // delete for unique (if needed)
  for (let record of records.slice(1)) {
    const docRef = doc(db, tableName, record.id);
    await deleteDoc(docRef);
  }

  return records[0] ?? null;
}

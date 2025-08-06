import { collection, doc, getDoc, getDocs, setDoc, query, updateDoc } from "firebase/firestore";

export async function createRecord(db, tableName, {Schema, record}) {
  const {id, ...data} = Schema.parse(record);
  const docRef = doc(db, tableName, id);
  await setDoc(docRef, data);
}

export async function updateRecord(db, tableName, {Schema, id, rawData}) {
  if (!id) {
    throw new Error('Record ID is required for update operation.');
  }

  const data = Schema.parse(rawData);

  const docRef = doc(db, tableName, id);
  await updateDoc(docRef, data);
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
  const records = await getRecords(db, tableName, {wheres});
  
  if (records.length > 1) {
    throw new Error(`ユニーク制約が守られていません（テーブル名：${tableName}）`);
  }

  return records[0] ?? null;
}

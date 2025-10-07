import { collection, deleteDoc, doc, getDocs, setDoc, query, updateDoc, where, onSnapshot } 
  from "firebase/firestore";

import { db } from "@/lib/firebase/clientApp";

export function toRecord(docSnapshot) {
  return {
    id: docSnapshot.id,
    ...docSnapshot.data()
  }; 
}

export async function createRecord(tableName, {Schema, uniqueData, otherData}) {
  const record = await getRecord(tableName, {uniqueData});
  if (!!record) {
    throw new Error("重複しています。");
  }

  const {id, ...data} = Schema.parse({...uniqueData, ...otherData});
  const docRef = doc(db, tableName, id);
  await setDoc(docRef, data);
}

export async function getRecords(tableName, {constraints}) {
  const collectionRef = collection(db, tableName);
  const querySnapshot = await getDocs(query(collectionRef, ...constraints));
  return querySnapshot.docs.map((docSnapshot) => toRecord(docSnapshot));
}

export async function getRecord(tableName, {uniqueData}) {
  const constraints = Object.keys(uniqueData)
    .map(name => where(name, "==", uniqueData[name]));
  const records = await getRecords(tableName, {constraints});
  return records[0] ?? null;
}

export function onSnapshotRecords(tableName, {constraints, setContext}) {
  let ref = collection(db, tableName)
  if (constraints) 
    ref = query(ref, ...constraints);
  
  // onSnapshotのリスナーを起動
  return onSnapshot(ref, (querySnapshot) => {
    setContext(querySnapshot.docs.map(doc => toRecord(doc)));
  }, (error) => {
    // エラーハンドリング
    console.error("onSnapshot error:", error);
  });
}

export function onSnapshotRecord(tableName, {id, setContext}) {
  const docRef = doc(db, tableName, id);
  // onSnapshotのリスナーを起動
  return onSnapshot(docRef, (doc) => {
    if (doc.exists()) {
      setContext(doc.data());
    }
  }, (error) => {
    // エラーハンドリング
    console.error("onSnapshot error:", error);
  });
}

export async function updateRecord(tableName, {Schema, initialData, formData}) {
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

export async function deleteRecord(tableName, {id}) {
  if (!id) {
    throw new Error('Item ID is required for delete operation.');
  }

  const docRef = doc(db, tableName, id);
  await deleteDoc(docRef);
}

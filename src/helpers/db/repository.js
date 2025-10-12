import { collection, deleteDoc, doc, getDocs, setDoc, query, updateDoc, where, onSnapshot } 
  from "firebase/firestore";
import { db } from "@/lib/firebase/clientApp";

export default class Repository {
  constructor({tableName}) {
    this.db = db;
    this.tableName = tableName;
  }

  static toRecord(docSnapshot) {
    return {
      id: docSnapshot.id,
      ...docSnapshot.data()
    }; 
  }

  async getRecords({constraints}) {
    const collectionRef = collection(this.db, this.tableName);
    const querySnapshot = await getDocs(query(collectionRef, ...constraints));
    return querySnapshot.docs.map((docSnapshot) => Repository.toRecord(docSnapshot));
  }

  async createRecord({Schema, uniqueData, otherData}) {
    const record = await this.getRecord({uniqueData});
    if (!!record) {
      throw new Error("重複しています。");
    }
  
    const {id, ...data} = Schema.parse({...uniqueData, ...otherData});
    const docRef = doc(this.db, this.tableName, id);
    await setDoc(docRef, data);
  }

  async getRecord({uniqueData}) {
    const constraints = Object.keys(uniqueData)
      .map(name => where(name, "==", uniqueData[name]));
    const records = await this.getRecords({constraints});
    return records[0] ?? null;
  }

  onSnapshotRecords({constraints, setContext}) {
    let ref = collection(this.db, this.tableName)
    if (constraints) 
      ref = query(ref, ...constraints);
    
    return onSnapshot(ref, (querySnapshot) => {
      setContext(querySnapshot.docs.map(doc => Repository.toRecord(doc)));
    }, (error) => {
      // エラーハンドリング
      console.error("onSnapshot error:", error);
    });
  }

  onSnapshotRecord({id, setContext}) {
    const docRef = doc(this.db, this.tableName, id);
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

  async updateRecord({Schema, initialData, formData}) {
    const id = initialData["id"];
  
    if (!id) {
      throw new Error('Item ID is required for update operation.');
    }
  
    const data = Schema.parse({ 
      initialData: {...initialData}, 
      formData
    });
  
    const docRef = doc(this.db, this.tableName, id);
    await updateDoc(docRef, data);
  }
  
  async deleteRecord({id}) {
    if (!id) {
      throw new Error('Item ID is required for delete operation.');
    }
  
    const docRef = doc(this.db, this.tableName, id);
    await deleteDoc(docRef);
  }
}

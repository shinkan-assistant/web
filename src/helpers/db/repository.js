import { collection, deleteDoc, doc, getDocs, setDoc, query, updateDoc, where, onSnapshot, getDoc } 
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

  async getRecordById({id}) {
    const docRef = doc(this.db, this.tableName, id);
    const docSnapshot = await getDoc(docRef);
    return (docSnapshot.exists()) ? Repository.toRecord(docSnapshot) : null;
  }

  async getRecords({constraints}) {
    const collectionRef = collection(this.db, this.tableName);
    const querySnapshot = await getDocs(query(collectionRef, ...constraints));
    return querySnapshot.docs.map((docSnapshot) => Repository.toRecord(docSnapshot));
  }

  async createRecord({Schema, uniqueData, otherData}) {
    const record = await this.getRecord({uniqueData});
    if (record) {
      throw new Error("重複しています。");
    }
  
    const {id, ...data} = Schema.parse({...uniqueData, ...otherData});
    const docRef = doc(this.db, this.tableName, id);
    await setDoc(docRef, data);
  }

  async getRecord({uniqueData}) {
    const constraints = Object.keys(uniqueData)
      .map(key => where(key, "==", uniqueData[key]));
    const records = await this.getRecords({constraints});
    return records[0] ?? null;
  }

  async onSnapshotRecords({constraints, setContext}) {
    let ref = collection(this.db, this.tableName);
    if (constraints) {
      ref = query(ref, ...constraints);
    }
    const records = await this.getRecords({constraints});
    setContext(records);
    
    return onSnapshot(ref, (querySnapshot) => {
      setContext(querySnapshot.docs.map(doc => Repository.toRecord(doc)));
    }, (error) => {
      // エラーハンドリング
      console.error("onSnapshot error:", error);
    });
  }

  async onSnapshotRecord({uniqueData, setContext}) {
    const constraints = Object.keys(uniqueData)
      .map(key => where(key, "==", uniqueData[key]));
    const handleSetContext = (records) => {
      setContext(records.length > 0 ? records[0] : null);
    }
    return this.onSnapshotRecords({constraints, setContext: handleSetContext})
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
  
  async deleteRecord({uniqueData}) {
    const record = await this.getRecord({uniqueData});
    if (!record) return false;
  
    const docRef = doc(this.db, this.tableName, record.id);
    await deleteDoc(docRef);
  }
}

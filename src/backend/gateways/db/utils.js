export function toRecord(docSnapshot) {
  return {
    id: docSnapshot.id,
    ...docSnapshot.data()
  }; 
}

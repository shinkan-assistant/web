async function createData(rawData, Schema) {
  let parsed;
  try {
    parsed = Schema.parse(rawData);
  } catch (error) {
    return { isSuccess: false, error: error };
  }

  const {id, ...data} = parsed;
  try {
    const ref = doc(db, "users", id);
    await setDoc(ref, data);
  } catch (error) {
    return { isSuccess: false, error: error };
  }

  return { isSuccess: true };
}

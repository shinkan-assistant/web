import { where } from "firebase/firestore";
import { createRecord, getRecord, updateRecord } from './base';
import { CreateUserSchema, UpdateUserSchema } from "../schemas/user";

export async function getUserMetadataByEmail(db, {email}) {
  return getRecord(db, "users", {
    wheres: [
      where("email", "==", email)
    ]
  });
}

export async function updateUserMetadata(db, authUser) {
  if (!authUser) return;

  const myUserMetadata = await getUserMetadataByEmail(db, {email: authUser.email});
  
  if (myUserMetadata === null) 
    await createRecord(db, "users", {
      Schema: CreateUserSchema,
      record: {
        "email": authUser.email,
        "name": authUser.displayName,
      }, 
    });
  else (!Boolean(myUserMetadata?.name))
    await updateRecord(db, "users", {
      Schema: UpdateUserSchema,
      id: myUserMetadata.id,
      rawData: {
        "name": authUser.displayName,
      }, 
    });
}

import { getUserMetadataByEmail } from "./get";
import { UpdateUserSchema } from "../schemas/api";
import { createUserMetadata } from "./create";
import { updateRecord } from "@/base/api/update";

export async function updateUserMetadata(db, authUser) {
  if (!authUser) return;

  const myUserMetadata = await getUserMetadataByEmail(db, {email: authUser.email});
  
  if (myUserMetadata === null) {
    await createUserMetadata(db, authUser);
  }
  else if (!Boolean(myUserMetadata?.name)) {
    await updateRecord(db, "users", {
      Schema: UpdateUserSchema,
      id: myUserMetadata.id,
      rawData: {
        "name": authUser.displayName,
      }, 
    });
  }
}

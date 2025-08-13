import { getUserDataByEmail } from "./get";
import { UpdateUserSchema } from "../schemas/api";
import { createUserData } from "./create";
import { updateRecord } from "@/base/api/update";

export async function updateUserData(db, authUser) {
  if (!authUser) return;

  const myUserData = await getUserDataByEmail(db, {email: authUser.email});
  
  if (myUserData === null) {
    await createUserData(db, authUser);
  }
  else if (!Boolean(myUserData?.name)) {
    await updateRecord(db, "users", {
      Schema: UpdateUserSchema,
      id: myUserData.id,
      rawData: {
        "name": authUser.displayName,
      }, 
    });
  }
}

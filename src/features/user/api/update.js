import { getUserDataByEmail } from "./get";
import { UpdateUserSchema } from "../schemas/api";
import { createUserData } from "./create";
import { updateRecord } from "@/base/api/update";

export async function updateUserData(db, {authUser}) {
  if (!authUser) return;

  const myUserData = await getUserDataByEmail(db, {email: authUser.email});
  
  if (!myUserData) {
    await createUserData(db, {
      email: authUser.email,
      name: authUser.displayName,
      isMember: false,
    });
    return;
  }

  if (!myUserData?.name) {
    await updateRecord(db, "users", {
      Schema: UpdateUserSchema,
      initialData: myUserData,
      formData: {
        "name": authUser.displayName,
      },
    });
  }
}

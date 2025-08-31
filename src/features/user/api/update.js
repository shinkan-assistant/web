import { getUserDataByEmail } from "./get";
import { UpdateUserSchema } from "../schemas/api";
import { createUserData } from "./create";
import { updateRecord } from "@/base/api/update";

export async function updateUserData(db, {authUser}) {
  if (!authUser) return;

  const myUser = await getUserDataByEmail(db, {email: authUser.email});
  
  if (!myUser) {
    await createUserData(db, {
      email: authUser.email,
      name: authUser.displayName,
      isMember: false,
    });
    return;
  }

  if (!myUser?.name) {
    await updateRecord(db, "users", {
      Schema: UpdateUserSchema,
      initialData: myUser,
      formData: {
        "name": authUser.displayName,
      },
    });
  }
}

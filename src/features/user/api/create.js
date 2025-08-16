import { createRecord } from "@/base/api/create";
import { CreateUserSchema } from "../schemas/api";

export async function createUserData(db, {email, name, isMember}) {
  await createRecord(db, "users", {
    Schema: CreateUserSchema,
    uniqueData: {
      "email": email,
      "name": name,
    },
    otherData: {
      "belong": {"is_member": isMember},
      "is_admin": false,
    }
  });
}

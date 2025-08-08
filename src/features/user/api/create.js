import { createRecord } from "@/base/api/create";
import { CreateUserSchema } from "../schemas/object";

export async function createUserMetadata(db, authUser) {
  if (!authUser) return;

  await createRecord(db, "users", {
    Schema: CreateUserSchema,
    record: {
      "email": authUser.email,
      "name": authUser.displayName,
    }, 
  });
}

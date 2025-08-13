import { createRecord } from "@/base/api/create";
import { CreateUserSchema } from "../schemas/api";

export async function createUserData(db, authUser) {
  if (!authUser) return;

  await createRecord(db, "users", {
    Schema: CreateUserSchema,
    rawData: {
      "email": authUser.email,
      "name": authUser.displayName,
    }, 
  });
}

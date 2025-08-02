import { where } from "firebase/firestore";
import { createRecord, getRecord } from './base';
import { CreateUserSchema } from "../schemas/user";
import { BelongEnum, RoleEnum } from "@/data/enums/user.js";

export async function getUserByEmail(db, {email}) {
  return getRecord(db, "users", {
    wheres: [
      where("email", "==", email)
    ]
  });
}

export async function updateLoginUser(db, loginUser) {
  if (!loginUser) return;

  const user = await getUserByEmail(db, {email: loginUser.email});
  
  if (user === null) {
    await createRecord(db, "users", {
      Schema: CreateUserSchema,
      record: {
        email: loginUser.email,
        name: loginUser.displayName,
        role: RoleEnum.normal,
        belong: BelongEnum.freshman,
      }, 
    });
  }
}

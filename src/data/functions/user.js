import { where } from "firebase/firestore";
import { createRecord, getRecord, updateRecord } from './base';
import { CreateUserSchema, UpdateUserSchema } from "../schemas/user";

export async function getUserByEmail(db, {email}) {
  return getRecord(db, "users", {
    wheres: [
      where("email", "==", email)
    ]
  });
}

// TODO ユーザー情報を常に保持しておく + ユーザー情報が変わったら自動更新するようにする（onSnapShot）
// TODO ユーザーの useUserSession や useContextを見直す（サーバーコンポーネントと同じ設計にする）

export async function updateLoginUser(db, loginUser) {
  if (!loginUser) return;

  const myUser = await getUserByEmail(db, {email: loginUser.email});
  
  if (myUser === null) 
    await createRecord(db, "users", {
      Schema: CreateUserSchema,
      record: {
        "email": loginUser.email,
        "name": loginUser.displayName,
      }, 
    });
  else (!Boolean(myUser?.name))
    await updateRecord(db, "users", {
      Schema: UpdateUserSchema,
      id: myUser.id,
      rawData: {
        "name": loginUser.displayName,
      }, 
    });
}

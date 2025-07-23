import { CreateUserSchema } from "../schemas/user";
import { collection, deleteDoc, doc, getDocs, query, setDoc, where } from "firebase/firestore";
import { BelongEnum, RoleEnum } from "@/data/enums/user.js";

async function createUser(db, {loginUser, role, belong}) {
  const rawData = {
    id: loginUser.uid,
    email: loginUser.email,
    name: loginUser.displayName,
    role: role,
    belong: belong,
  };
  console.log(rawData);
  
  const {id, ...data} = CreateUserSchema.parse(rawData);
  const userRef = doc(db, "users", id);
  await setDoc(userRef, data);
}

async function getUserDocs(db, {constraints}) {
  const usersRef = collection(db, "users");
  const querySnapshot = await getDocs(
    query(usersRef, constraints)
  );
  return querySnapshot.docs;
}

async function deleteUser(db, {id}) {
  const userRef = doc(db, "users", id);
  await deleteDoc(userRef);
}

export async function updateLoginUser(db, loginUser) {
  const existingUserDocs = await getUserDocs(
    db, {constraints: where("email", "==", loginUser.email)});
  
  if (existingUserDocs.length == 0) {
    await createUser(db, {
      loginUser: loginUser,
      role: RoleEnum.normal,
      belong: BelongEnum.freshman,
    });
    return;
  }
  
  if (existingUserDocs.length >= 2) {
    for (let i = 1; i < users.length; i++) {
      await deleteUser(db, {id: users[i].id});
    }
  }

  const existingUserDoc = existingUserDocs[0];
  const existingUserId = existingUserDoc.id;
  const existingUserData = existingUserDoc.data();
  if (existingUserId !== loginUser.uid) {
    await deleteUser(db, {id: existingUserId})
    await createUser(db, {
      loginUser: loginUser,
      role: existingUserData.role,
      belong: existingUserData.belong,
    });
  }
}


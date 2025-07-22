import {
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged as _onAuthStateChanged,
  onIdTokenChanged as _onIdTokenChanged,
} from "firebase/auth";

import { auth, db } from "./clientApp";
import { collection, deleteDoc, doc, getDocs, query, setDoc, updateDoc, where } from "firebase/firestore";
import { BelongEnum, RoleEnum } from "@/../data/enums/user.mjs";

export function onAuthStateChanged(cb) {
  return _onAuthStateChanged(auth, cb);
}

export function onIdTokenChanged(cb) {
  return _onIdTokenChanged(auth, cb);
}

export async function signInWithGoogle() {
  const provider = new GoogleAuthProvider();

  let user;
  try {
    const result = await signInWithPopup(auth, provider);
    user = result.user;
  } catch (error) {
    // ユーザーがポップアップを閉じた、またはキャンセルされた場合はエラーを無視する
    switch (error.code) {
      case "auth/popup-closed-by-user":
      case "auth/cancelled-popup-request":
        break;
      default:
        console.error("Googleによる認証に失敗しました", error);
    }
  }

  try {
    const currentDate = new Date();

    const usersRef = collection(db, "users");
    const querySnapshot = await getDocs(
      query(usersRef, where("email", "==", user.email))
    );

    async function setNewUser({id, data}) {
      const ref = doc(db, "users", id);
      data.last_login_at = currentDate;
      await setDoc(ref, data);
    }
    
    // 初回ログイン時の処理
    if (querySnapshot.empty) {
      const data = {
        email: user.email,
        name: user.displayName,
        created_at: currentDate,
        role: RoleEnum.normal,
        belong: BelongEnum.freshman,
      };
      await setNewUser({id: user.uid, data: data});
      return;
    }

    const existingDoc = querySnapshot.docs[0];
    const existingDocRef = doc(db, "users", existingDoc.id);
    
    // 管理者としてユーザーを追加した場合の処理
    if (existingDoc.id !== user.uid) {
      await deleteDoc(existingDocRef);
      
      const data = existingDoc.data();
      data.name = user.displayName;

      await setNewUser({id: user.uid, data: existingDoc.data()});
      return;
    }
    
    // 通常ログイン時の処理
    await updateDoc(existingDocRef, {last_login_at: new Date()});
  } catch (error) {
    console.error("ユーザー状態の更新に失敗しました", error);
    signOut();
  }
}

export async function signOut() {
  try {
    return auth.signOut();
  } catch (error) {
    console.error("Error signing out with Google", error);
  }
}

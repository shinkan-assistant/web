import {
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged as _onAuthStateChanged,
  onIdTokenChanged as _onIdTokenChanged,
} from "firebase/auth";

import { auth, db } from "./clientApp";
import { updateLoginUser } from "@/data/functions/user";

export function onAuthStateChanged(cb) {
  return _onAuthStateChanged(auth, cb);
}

export function onIdTokenChanged(cb) {
  return _onIdTokenChanged(auth, cb);
}

export async function signInWithGoogle() {
  const provider = new GoogleAuthProvider();

  let user = null;
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
    await updateLoginUser(db, user);
  } catch (error) {
    console.error("ユーザーデータの更新に失敗しました", error);
    signOut();
  }
}

export async function signOut() {
  try {
    return auth.signOut();
  } catch (error) {
    console.error("サインアウトに失敗しました。", error);
  }
}

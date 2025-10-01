import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged as _onAuthStateChanged,
  onIdTokenChanged as _onIdTokenChanged,
} from "firebase/auth";
import { firebaseApp } from "../../lib/firebase/clientApp";
import { toast } from "react-toastify";
import userGateway from "@/features/member/api";

// TODO try-catch 作りたい（アカウント消された時は、ここで、Bad Request と出る）
const auth = getAuth(firebaseApp);

export function onAuthStateChanged(cb) {
  return _onAuthStateChanged(auth, cb);
}

export function onIdTokenChanged(cb) {
  return _onIdTokenChanged(auth, cb);
}

export async function signInWithGoogle() {
  // Googleによる認証
  let signInResult = null;
  try {
    const provider = new GoogleAuthProvider();
    signInResult = await signInWithPopup(auth, provider);
  } catch (error) {
    // ユーザーがポップアップを閉じた、またはキャンセルされた場合はエラーを無視する
    console.error("Googleの認証に失敗しました。", error)
    switch (error.code) {
      case "auth/popup-closed-by-user":
      case "auth/cancelled-popup-request":
        break;
      default:
        toast.warn("Googleの認証に失敗しました");
    }
  }

  // Google認証に通ってない場合は
  if (!signInResult?.user) {
    toast.warn("Googleの認証に失敗しました");
  }

  // 次はユーザーデータがあるかを確認する
  if (!await userGateway.exists({email: signInResult.user.email})) {
    toast.warn("既存のユーザーでサインインしてください");
    await signOut();
  }
}

export async function signOut() {
  try {
    return auth.signOut();
  } catch (error) {
    console.error("サインアウトに失敗しました。", error);
  }
}

import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged as _onAuthStateChanged,
  onIdTokenChanged as _onIdTokenChanged,
  deleteUser as _deleteUser,
  reauthenticateWithPopup,
} from "firebase/auth";
import { firebaseApp } from "../../lib/firebase/clientApp";
import { toast } from "react-toastify";
import userService from "@/services/user";

// TODO try-catch 作りたい（アカウント消された時は、ここで、Bad Request と出る）
const auth = getAuth(firebaseApp);

export function onAuthStateChanged(cb) {
  return _onAuthStateChanged(auth, cb);
}

export function onIdTokenChanged(cb) {
  return _onIdTokenChanged(auth, cb);
}

async function signInToGoogle() {
  // Googleによる認証
  let signInResult = null;
  try {
    const provider = new GoogleAuthProvider();
    signInResult = await signInWithPopup(auth, provider);
  } catch (error) {
    // ユーザーがポップアップを閉じた、またはキャンセルされた場合はエラーを無視する
    switch (error.code) {
      case "auth/popup-closed-by-user":
      case "auth/cancelled-popup-request":
        break;
      default:
        console.error("Googleの認証に失敗しました", error);
        toast.warn("Googleの認証に失敗しました");
    }
  }

  // Google認証に通ってない場合は
  if (!signInResult?.user) {
    toast.warn("Googleの認証に失敗しました");
  }

  return signInResult;
}

export async function signOut() {
  try {
    return auth.signOut();
  } catch (error) {
    console.error("サインアウトに失敗しました。", error);
  }
}

export async function signInWithGoogle() {
  // Googleによる認証
  const signInResult = await signInToGoogle();
  if (!signInResult?.user) return;
  
  // 次はユーザーデータがあるかを確認する
  if (!await userService.exists({email: signInResult.user.email})) {
    toast.warn("既存のユーザーでサインインしてください");
    await signOut();
  }
}

export async function signInWithGoogleForRegister() {
  // Googleによる認証
  const signInResult = await signInToGoogle();
  if (!signInResult?.user) return;

  // 次はユーザーデータがあるかを確認する
  if (await userService.exists({email: signInResult.user.email})) {
    toast.warn("すでに存在するユーザーです");
    await signOut();
    // redirect("/user/register");
  }
}

// 現在ログインしているユーザーを削除
export async function deleteUser() {
  const auth = getAuth();
  const authUser = auth.currentUser;

  if (!authUser) {
    alert("ログインしているユーザーがいません。");
    return;
  }

  const confirmToDelete = window.confirm("本当に退会しますか？この操作は元に戻せません。");
  if (!confirmToDelete) {
    return;
  }

  try {
    // Google認証プロバイダを使って再認証
    const provider = new GoogleAuthProvider();
    await reauthenticateWithPopup(authUser, provider);
    
    // 再認証が成功したら、データベースからユーザーデータを削除
    await userService.delete({email: authUser.email});
    // Authenticationのユーザーを削除
    await _deleteUser(authUser);
    
    toast.info("正常に退会しました。");
    // 削除後のリダイレクトやUI更新などの処理を追加
    window.location.href = "/"; // トップページなどにリダイレクト
  } catch (error) {
    console.error("アカウント削除エラー: ", error);
    // エラーハンドリング
    if (error.code === 'auth/requires-recent-login') {
      // 最近のログインが必要な場合、再認証を促すメッセージを表示
      alert("セキュリティ上の理由により、退会するには再認証が必要です。再認証を完了してから再度お試しください。");
    } else {
      alert("退会中にエラーが発生しました。\n" + error.message);
    }
  }
}

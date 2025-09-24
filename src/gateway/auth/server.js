import "server-only";

import { cookies } from "next/headers";
import { getAuth } from "firebase-admin/auth";
import { convertUserImpl2AuthUser } from "@/components/user/utils";

// 認証ユーザーを返す関数
export async function getAuthUser() {
  const authIdToken = (await cookies()).get("__session")?.value;

  try {
    // Admin SDKを使ってIDトークンを検証
    const decodedToken = await getAuth().verifyIdToken(authIdToken);
    const userImpl = await getAuth().getUser(decodedToken.uid);
    return convertUserImpl2AuthUser(userImpl);
  } catch (error) {
    // トークンが無効または存在しない場合はnullを返す
    return null;
  }
}

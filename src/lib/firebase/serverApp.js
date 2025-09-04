import "server-only";

import { cookies } from "next/headers";
import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";
import path from 'path';
import fs from 'fs';
import 'dotenv/config';
import { convertUserImpl2AuthUser } from "@/features/user/utils";

// Firebase Admin SDKの初期化
if (!getApps().length) {
  // ローカルでの初期化の場合
  if (process.env.GOOGLE_APPLICATION_CREDENTIALS_LOCAL_PATH) {
    let serviceAccount;
    try {
      const serviceAccountPath = process.env.GOOGLE_APPLICATION_CREDENTIALS_LOCAL_PATH;
      const absoluteServiceAccountPath = path.resolve(serviceAccountPath);
      const serviceAccountJson = fs.readFileSync(absoluteServiceAccountPath, 'utf8');
      serviceAccount = JSON.parse(serviceAccountJson);
    } catch (error) {
      console.error('エラー: サービスアカウントキーの読み込みに失敗しました。');
      console.error('パスを確認するか、ファイルが正しいJSON形式であるか確認してください。');
      console.error(error);
      process.exit(1);
    }
    initializeApp({credential: cert(serviceAccount)});
  }
  // サーバーでの初期化の場合
  else {
    initializeApp();
  }
}

// 認証ユーザーを返す関数
export async function getAuthenticatedAppForUser() {
  const authIdToken = (await cookies()).get("__session")?.value;

  try {
    // Admin SDKを使ってIDトークンを検証
    const decodedToken = await getAuth().verifyIdToken(authIdToken);
    const userImpl = await getAuth().getUser(decodedToken.uid);
    const authUser = convertUserImpl2AuthUser(userImpl);
    return { authUser };
  } catch (error) {
    // トークンが無効または存在しない場合はnullを返す
    return { authUser: null };
  }
}

export const db = getFirestore();

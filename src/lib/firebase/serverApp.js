import "server-only";

import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import path from 'path';
import fs from 'fs';
import 'dotenv/config';

// Firebase Admin SDKの初期化
if (getApps().length === 0) {
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

export const db = getFirestore();

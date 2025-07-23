import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import path from 'path';
import fs from 'fs';
import 'dotenv/config';
import seedUsers from './data/user.mjs';

console.log('--- Firestore シーディングスクリプトを開始します ---');

const serviceAccountPath = process.env.GOOGLE_APPLICATION_CREDENTIALS;

let serviceAccount;
try {
  const absoluteServiceAccountPath = path.resolve(serviceAccountPath);
  const serviceAccountFile = fs.readFileSync(absoluteServiceAccountPath, 'utf8');
  serviceAccount = JSON.parse(serviceAccountFile);
  console.log(`サービスアカウントキーをロードしました: ${absoluteServiceAccountPath}`);
} catch (error) {
  console.error('エラー: サービスアカウントキーの読み込みに失敗しました。');
  console.error('パスを確認するか、ファイルが正しいJSON形式であるか確認してください。');
  console.error(error);
  process.exit(1);
}

try {
  initializeApp({
    credential: cert(serviceAccount)
  });
  console.log('Firebase Admin SDK が正常に初期化されました。');
} catch (error) {
  console.error('エラー: Firebase Admin SDK の初期化に失敗しました。');
  console.error('認証情報が正しいか、または既に Firebase App が初期化されていないか確認してください。');
  console.error(error);
  process.exit(1);
}

const db = getFirestore();

const usersCollection = db.collection('users');

try {
  for (const user of seedUsers) {
    await usersCollection.add(user);
    console.log(`Successfully added user: ${user.email}`);
  }
  console.log('All users have been seeded.');
  process.exit(0);
} catch (error) {
  console.error('Seeding failed:', error);
  process.exit(1);
}
import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import path from 'path';
import fs from 'fs';
import 'dotenv/config';

import seedUsers from './seed/user.mjs';
import mockEvents from './mock/event.mjs';
import mockParticipants from './mock/participant.mjs';

const useMock = process.argv.length >= 3 & process.argv[2] === "mock";

// --- DBの初期化 ---
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

// --- 既存のDBデータの削除
async function deleteAllDocs(tableName) {
  try {
    const collectionRef = db.collection(tableName);
    const snapshot = await collectionRef.get();
    
    const batch = db.batch();
    snapshot.forEach(doc => {
      batch.delete(doc.ref);
    });
    
    await batch.commit();
    console.log(`Successfully deleted all documents from ${tableName}`);
  } catch (error) {
    console.error('Deleting data (before initializing) failed:', error);
    process.exit(1);
  }
}

deleteAllDocs('users');
deleteAllDocs('events');
deleteAllDocs('participants');

// --- DBの初期データの追加 ---
/**
 * 指定されたコレクションにデータを一括で追加します。
 * @param {string} tableName - 対象のコレクション名
 * @param {Array<Object>} dataArray - 追加するデータの配列
 * @param {(item: Object) => string} logMessageFunc - 各アイテムの追加成功時にログに出力するメッセージを生成する関数
 */
async function insertDocs(tableName, dataArray) {
  try {
    const batch = db.batch(); // バッチ処理を開始
    const collectionRef = db.collection(tableName);
    
    // ドキュメントIDを事前に生成し、バッチにセット
    for (const item of dataArray) {
      const docRef = collectionRef.doc(); // 新しいドキュメントIDを生成
      batch.set(docRef, item);
    }
    
    await batch.commit(); // バッチ処理を実行
    
    console.log(`Successfully added all documents to ${tableName}`);
  } catch (error) {
    console.error('Initializing data failed:', error);
    process.exit(1);
  }
}

insertDocs('users', seedUsers);
if (useMock) {
  insertDocs('events', mockEvents);
  insertDocs('participants', mockParticipants);
}

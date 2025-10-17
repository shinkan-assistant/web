import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import path from 'path';
import fs from 'fs';
import 'dotenv/config';

import getSeedUsers from './seed/user.mjs';
import mockEvents from './mock/event.mjs';
import mockParticipants from './mock/participant.mjs';

function getNowDateTimeStr() {
  const now = new Date();
  const options = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZoneName: 'short', // タイムゾーンを略語で表示（例: 'JST'）
  };
  return now.toLocaleString('ja-JP', options);
}

function initDb() {
  const serviceAccountPath = process.env.GOOGLE_APPLICATION_CREDENTIALS_LOCAL_PATH;
  
  let serviceAccount;
  try {
    const absoluteServiceAccountPath = path.resolve(serviceAccountPath);
    const serviceAccountFile = fs.readFileSync(absoluteServiceAccountPath, 'utf8');
    serviceAccount = JSON.parse(serviceAccountFile);
    console.log("サービスアカウントキーをロードしました");
  } catch (error) {
    console.error('エラー: サービスアカウントキーの読み込みに失敗しました。');
    console.error('パスを確認するか、ファイルが正しいJSON形式であるか確認してください。');
    console.error(error);
    process.exit(1);
  }
  
  // Firebase Admin SDKの初期化
  if (!getApps().length) {
    initializeApp({
      credential: cert(serviceAccount), // Admin SDKのサービスアカウントキー
      // ... firebaseConfigから他の設定も追加
    });
  }
  
  return getFirestore();
}

// --- 既存のDBデータの削除
async function deleteAllDocs(db, tableName) {
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

// --- DBの初期データの追加 ---
/**
 * 指定されたコレクションにデータを一括で追加します。
 * @param {string} tableName - 対象のコレクション名
 * @param {Array<Object>} dataArray - 追加するデータの配列
 * @param {(item: Object) => string} logMessageFunc - 各アイテムの追加成功時にログに出力するメッセージを生成する関数
 */
async function insertDocs(db, tableName, dataArray) {
  try {
    const batch = db.batch(); // バッチ処理を開始
    const collectionRef = db.collection(tableName);
    
    // ドキュメントIDを事前に生成し、バッチにセット
    for (const item of dataArray) {
      // 既存のIDがあればそのIDを使い、なければ新しいIDを生成
      const docId = item.id || collectionRef.doc().id;
      
      // IDをデータから削除（Firestoreのデータ自体にIDを含めないため）
      const { id, ...dataWithoutId } = item;
      
      const nowDateStr = getNowDateTimeStr();
      dataWithoutId['created_at'] = nowDateStr;
      dataWithoutId['updated_at'] = nowDateStr;
      
      const docRef = collectionRef.doc(docId);
      batch.set(docRef, dataWithoutId);
    }
    
    await batch.commit(); // バッチ処理を実行
    
    console.log(`Successfully added all documents to ${tableName}`);
  } catch (error) {
    console.error('Initializing data failed:', error);
    process.exit(1);
  }
}

async function initializeData() {
  if (process.argv.length < 3) {
    process.exit(-1);
  }
  const envName = process.argv[2];

  const db = initDb();

  await Promise.all([
    deleteAllDocs(db, 'users'),
    deleteAllDocs(db, 'events'),
    deleteAllDocs(db, 'participants'),
  ]);

  await Promise.all([
    () => insertDocs(db, 'users', getSeedUsers(envName)),
    () => insertDocs(db, 'events', mockEvents),
    () => insertDocs(db, 'participants', envName === 'dev' ? mockParticipants : []),
  ].map(fn => fn()));
}

initializeData();

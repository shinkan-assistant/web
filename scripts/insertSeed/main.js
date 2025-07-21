const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const path = require('path');
require('dotenv/config');

console.log('--- Firestore シーディングスクリプトを開始します ---');

const serviceAccountPath = process.env.GOOGLE_APPLICATION_CREDENTIALS;

let serviceAccount;
try {
  const absoluteServiceAccountPath = path.resolve(serviceAccountPath);
  serviceAccount = require(absoluteServiceAccountPath);
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

const usersSeedData = require('./data/user.js');

const usersCollection = db.collection('users');

async function seedUsers() {
  for (const user of usersSeedData) {
    try {
      await usersCollection.add(user);
      console.log(`Successfully added user: ${user.email}`);
    } catch (error) {
      console.error(`Error adding user: ${user.email}`, error);
    }
  }
}

seedUsers().then(() => {
  console.log('All users have been seeded.');
  process.exit(0);
}).catch(error => {
  console.error('Seeding failed:', error);
  process.exit(1);
});
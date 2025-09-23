import * as functions from "firebase-functions/v1";
import * as admin from "firebase-admin";
import { FirebaseAuthError } from "firebase-admin/auth";
import { getFunctions } from "firebase-admin/functions";
import { getFirestore } from "firebase-admin/firestore";

admin.initializeApp();
const db = getFirestore();

/**
 * firestore の `users` テーブルの `email` に対応するレコードを取得
 * @param {string} email 取得したいレコードの `email`
 * @return {*} `users` テーブルの `email` に対応するレコード
 */
async function judgeExistsUser({ email }: any) {
  const usersSnapshot = await db.collection("users").get();
  return usersSnapshot.docs.some((doc: any) => doc.data().email === email);
}

export const deleteUnconfirmedUser = functions
  .region("asia-northeast1")
  .tasks.taskQueue({
    retryConfig: {
      maxAttempts: 5, // 通信エラーの時の再トライ回数
      minBackoffSeconds: 60, // 再トライの間のインターバル
    },
  })
  .onDispatch(async ({ uid, email }: any) => {
    try {
      if (await judgeExistsUser({ email })) return;

      await admin.auth().deleteUser(uid);
      functions.logger.log(
        `[deleteUnconfirmedUser()] 正常にユーザー(${email})が削除できました`
      );
    } catch (error) {
      if (error instanceof FirebaseAuthError) {
        if (error.code === "auth/user-not-found") {
          functions.logger.log(
            `[deleteUnconfirmedUser()] ユーザー(${email})が見つかりませんでした。削除をスキップします`
          );
        }
      } else {
        // その他の削除失敗のエラー
        functions.logger.error(
          `[deleteUnconfirmedUser()] ユーザー(${email})の削除に失敗しました`,
          error
        );
        throw error; // タスクキューにリトライさせる
      }
    }
  });

export const enqueueDeleteUnconfirmedUser = functions
  .region("asia-northeast1")
  .auth.user()
  .onCreate(async (authUser: any) => {
    const { uid, email } = authUser;
    functions.logger.log(`auth: ${uid}, ${email}`);

    if (await judgeExistsUser({ email })) return;

    const queue = getFunctions().taskQueue(
      "locations/asia-northeast1/functions/deleteUnconfirmedUser"
    );
    await queue.enqueue({ uid, email }, { scheduleDelaySeconds: 600 });
  });

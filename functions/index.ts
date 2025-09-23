const functions = require("firebase-functions/v1");
const admin = require("firebase-admin");
const {getFunctions} = require("firebase-admin/functions");
const {getFirestore} = require("firebase-admin/firestore");

admin.initializeApp();
const db = getFirestore();

/**
 * firestore の `users` テーブルの `email` に対応するレコードを取得
 * @param {string} email 取得したいレコードの `email`
 * @return {*} `users` テーブルの `email` に対応するレコード
 */
async function judgeExistsUser({email}) {
  const usersSnapshot = await db.collection("users").get();
  return usersSnapshot.docs.some((doc) => doc.data().email === email);
}

exports.deleteUnconfirmedUser = functions
    .region("asia-northeast1")
    .tasks.taskQueue({
      retryConfig: {
        maxAttempts: 5, // 通信エラーの時の再トライ回数
        minBackoffSeconds: 60, // 再トライの間のインターバル
      },
    }).onDispatch(async ({uid, email}) => {
      try {
        if (await judgeExistsUser({email})) return;

        await admin.auth().deleteUser(uid);
        functions.logger.log(
            `[deleteUnconfirmedUser()] 正常にユーザー(${email})が削除できました`);
      } catch (error) {
        if (error.code === "auth/user-not-found") {
          functions.logger.log(
              `[deleteUnconfirmedUser()] ユーザー(${email})が見つかりませんでした。削除をスキップします`);
        } else {
        // その他の削除失敗のエラー
          functions.logger.error(
              `[deleteUnconfirmedUser()] ユーザー(${email})の削除に失敗しました`, error);
          throw error; // タスクキューにリトライさせる
        }
      }
    });

// TODO deleteタスク単体で呼んだら成功したけど、taskとして遅れて実行させることができない
const cors = require("cors")({origin: [
  "http://127.0.0.1:5001/gatherlynxstaging/asia-northeast1/testDeleteUser",
]});
// テスト用の関数 (HTTPで呼び出す)
exports.testDeleteUser = functions
    .region("asia-northeast1")
    .https.onRequest((request, response) => {
      cors(request, response, async () => {
      // リクエストの処理
        if (request.method === "POST") {
        // POSTリクエストの処理
          const {uid, email} = request.body;
          console.log(request.body);

          if (!uid || !email) {
            response.status(400).send("invalid-argument, UID is required.");
          }

          const queue = getFunctions().taskQueue(
              "deleteUnconfirmedUser", "asia-northeast1");
          console.log(queue);

          // タスクをキューにエンキュー
          await queue.enqueue(
              {uid, email},
              {scheduleDelaySeconds: 60*60},
          );

          return {status: "success", message: `Task for user ${uid} enqueued.`};
        } else {
        // POST以外のメソッドは拒否
          response.status(405).send("Method Not Allowed");
        }
      });
    });

// TODO queueの中身がまだ呼べてない（09/16）
exports.enqueueDeleteUnconfirmedUser = functions
    .region("asia-northeast1")
    .auth.user().onCreate(async (authUser) => {
      const {uid, email} = authUser;
      functions.logger.log(`auth: ${uid}, ${email}`);

      if (await judgeExistsUser({email})) return;

      const queue = getFunctions().taskQueue(
          "locations/asia-northeast1/functions/deleteUnconfirmedUser");
      await queue.enqueue(
          {uid, email},
          {scheduleDelaySeconds: 600},
      );
    });

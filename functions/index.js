const functions = require("firebase-functions/v1");
const admin = require("firebase-admin");
admin.initializeApp();

exports.deleteUnconfirmedUser = functions.region("asia-northeast1")
    .auth.user().onCreate(async (user) => {
      functions.logger.info(`${user.email}のユーザーが作られました`);
    });

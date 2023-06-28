import admin from "firebase-admin";
import serviceAccount from "../config/privateKey.json" assert { type: "json" };

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

let dictionary = {};

const sendPushNotification = async (fcm_token, title, body) => {
  try {
    const message = {
      notification: {
        title: title,
        body: body,
      },
      token: fcm_token
    };

    const response = await admin.messaging().send(message);
  } catch (err) {
    throw err;
  }
}

export { dictionary, sendPushNotification };
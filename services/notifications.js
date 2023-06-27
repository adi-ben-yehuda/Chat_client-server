import admin from "firebase-admin";
import fcm from 'fcm-notification';
import serviceAccount from "../config/privateKey.json" assert { type: "json" };

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

var FCM = new fcm(admin.credential.cert(serviceAccount));

let dictionary = {};

const sendPushNotification = (fcm_token, title, body) => {
    try {
        let message = {
            android: {
                notification: {
                    title: title,
                    body: body,
                },
            },
            token: fcm_token
        };

        FCM.send(message, function (err, resp) {
            if (err) {
                throw err;
            }
        });

    } catch (err) {
        throw err;
    }
}

export { dictionary, sendPushNotification };


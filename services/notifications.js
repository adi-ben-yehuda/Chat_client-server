import admin from "firebase-admin";
import fcm from 'fcm-notification';
import * as serviceAccount from "../config/privateKey.json" assert { type: "json" };

const certPath = admin.credential.cert(serviceAccount);
var FCM = new fcm(certPath);

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
            } else {
                console.log('Successfully sent notification');
            }
        });

    } catch (err) {
        throw err;
    }
}

export { dictionary, sendPushNotification };


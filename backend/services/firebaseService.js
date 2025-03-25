const admin = require('firebase-admin');
const serviceAccount = require('../config/serviceAccountKey.json');

// Khởi tạo Firebase Admin
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

const sendPushNotification = (firebaseToken, message) => {
    const payload = {
        notification: {
            title: message.title,
            body: message.body,
        },
    };

    admin.messaging().sendToDevice(firebaseToken, payload)
        .then((response) => {
            console.log('Push notification sent successfully:', response);
        })
        .catch((error) => {
            console.error('Error sending push notification:', error);
        });
};

module.exports = { sendPushNotification };

importScripts("https://www.gstatic.com/firebasejs/9.6.1/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.6.1/firebase-messaging-compat.js");

firebase.initializeApp({
    apiKey: "AIzaSyAsOJAL8Z7eqS52WE0K1YMgWAK271OzC-I",
    authDomain: "ecommerce-f0884.firebaseapp.com",
    projectId: "ecommerce-f0884",
    storageBucket: "ecommerce-f0884.firebasestorage.app",
    messagingSenderId: "652555359163",
    appId: "1:652555359163:web:8a40d63232ccf8d921ea9e",
    measurementId: "G-E16JYJQ51X"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    console.log("Received background message ", payload);

    self.registration.showNotification(payload.notification.title, {
        body: payload.notification.body,
        icon: "/logo.png",
    });
});

import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";

const firebaseConfig = {
    apiKey: "AIzaSyAsOJAL8Z7eqS52WE0K1YMgWAK271OzC-I",
    authDomain: "ecommerce-f0884.firebaseapp.com",
    projectId: "ecommerce-f0884",
    storageBucket: "ecommerce-f0884.firebasestorage.app",
    messagingSenderId: "652555359163",
    appId: "1:652555359163:web:8a40d63232ccf8d921ea9e",
    measurementId: "G-E16JYJQ51X"
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export { messaging };


if ("serviceWorker" in navigator) {
    navigator.serviceWorker
        .register("/firebase-messaging-sw.js")
        .then((registration) => {
            console.log("Service Worker registered:", registration);
        })
        .catch((error) => {
            console.error("Service Worker registration failed:", error);
        });
}
import {useEffect} from "react";
import {useSelector} from "react-redux";
import {messaging} from "../../../config/firebase";
import {getToken, onMessage} from "firebase/messaging";
import {isEmpty} from "lodash";

const Notification = () => {
  const token = useSelector((state) => state.auths.accessToken);

  useEffect(() => {
    if (isEmpty(token)) return; // Chỉ chạy khi token hợp lệ

    const requestPermission = async () => {
      try {
        const currentToken = await getToken(messaging, {
          vapidKey:
            "BNbN8SFxQZHSj35TENBimrPsooFc7K-KClVYwoonTF4BMV8VSxO7AMl_p4rJhSfcn1PtYg4V7466hID2tBybC7g",
        });

        if (currentToken) {
          console.log("FCM Token:", currentToken);
          await fetch("http://localhost:5000/api/notification/save-token", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({firebaseToken: currentToken}),
          });
        } else {
          console.log("No registration token available.");
        }
      } catch (err) {
        console.log("An error occurred while retrieving token.", err);
      }
    };

    requestPermission();
  }, [token]); // Chạy lại khi token thay đổi

  // Lắng nghe tin nhắn từ Firebase
  useEffect(() => {
    const unsubscribe = onMessage(messaging, (payload) => {
      console.log("Message received:", payload);
      alert(payload.notification?.body || "Bạn có thông báo mới!");
    });

    return () => unsubscribe();
  }, []); // Chạy 1 lần duy nhất khi component mount

  return null;
};

export default Notification;

import {useEffect} from "react";
import {messaging} from "../../../config/firebase";
import {getToken, onMessage} from "firebase/messaging";

const Notification = () => {
  useEffect(() => {
    const requestPermission = async () => {
      try {
        const currentToken = await getToken(messaging, {
          vapidKey:
            "BNbN8SFxQZHSj35TENBimrPsooFc7K-KClVYwoonTF4BMV8VSxO7AMl_p4rJhSfcn1PtYg4V7466hID2tBybC7g",
        });
        if (currentToken) {
          console.log("FCM Token:", currentToken);
          // Gửi token lên server để lưu
          await fetch("http://localhost:5000/api/notification/save-token", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("authToken")}`, // Thêm token vào headers
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

    // Lắng nghe thông báo khi ứng dụng mở
    const unsubscribe = onMessage(messaging, (payload) => {
      console.log("Message received. ", payload);
      alert(payload.notification?.body || "Bạn có thông báo mới!");
    });

    return () => unsubscribe(); // Cleanup khi unmount component
  }, []);

  return null; // Không cần render UI cho Notification component
};

export default Notification;

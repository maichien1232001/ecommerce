import { useEffect } from "react";
import { useSelector } from "react-redux";
import { messaging } from "../../../config/firebase";
import { onMessage } from "firebase/messaging";
import { saveTokenFireBase } from "../../../apis/auth";

const Notification = () => {
  const token = useSelector((state) => state.auths.accessToken);

  useEffect(() => {
    saveTokenFireBase();
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

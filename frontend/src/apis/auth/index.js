import API from "../../config/axiosInterceptor";
import _ from "lodash";
import { messaging } from "../../config/firebase";
import { getToken } from "firebase/messaging";

const proxy = "http://localhost:8080/api";

export const saveTokenFireBase = async (token) => {
  if (_.isEmpty(token)) return;
  const requestPermission = async () => {
    try {
      const currentToken = await getToken(messaging, {
        vapidKey:
          "BNbN8SFxQZHSj35TENBimrPsooFc7K-KClVYwoonTF4BMV8VSxO7AMl_p4rJhSfcn1PtYg4V7466hID2tBybC7g",
      });

      if (currentToken) {
        await API.post(
          `${proxy}/notification/save-token`,
          { firebaseToken: currentToken },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } else {
        console.log("No registration token available.");
      }
    } catch (err) {
      console.log("An error occurred while retrieving token.", err);
    }
  };

  requestPermission();
};

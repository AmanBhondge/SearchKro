import { messaging } from "../../firebase";
import { getToken } from "firebase/messaging";

const GetDeviceToken = async () => {
  try {
    const permission = await Notification.requestPermission();
    const enabled = permission === "granted";

    if (!enabled) {
      alert("Enable push notifications to receive updates.");
      return null;
    }

    const token = await getToken(messaging, {
      vapidKey: "BEtIEgDtaAK0pKb-L8Ewgt1uj8mtKYSnQ8NbmDYY-XWAPbIdW1BMDfP_zV3ZGzP4r2GJIOj8scpDMby7eNOStio",
      serviceWorkerRegistration: await navigator.serviceWorker.register("/firebase-messaging-sw.js"),
    });

    return token;
  } catch (error) {
    console.error(" Error fetching FCM token:", error);
    return null;
  }
};

export default GetDeviceToken;
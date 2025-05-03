import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";


const firebaseConfig = {
  apiKey: "AIzaSyDC9WbLlI11L7vs9dKmhkXmK-TiAL340BQ",
  authDomain: "searchkro-a13a9.firebaseapp.com",
  projectId: "searchkro-a13a9",
  storageBucket: "searchkro-a13a9.firebasestorage.app",
  messagingSenderId: "532481284768",
  appId: "1:532481284768:web:d9112566cfb84423ab07c5",
  measurementId: "G-T8S5D4J26R"
};


const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);

export const generateToken = async () => {
  try {
    const permission = await Notification.requestPermission();
    console.log("Permission:", permission);

    if (permission === "granted") {
      const swReg = await navigator.serviceWorker.register("/firebase-messaging-sw.js");

      const token = await getToken(messaging, {
        vapidKey: "BEtIEgDtaAK0pKb-L8Ewgt1uj8mtKYSnQ8NbmDYY-XWAPbIdW1BMDfP_zV3ZGzP4r2GJIOj8scpDMby7eNOStio",
        serviceWorkerRegistration: swReg,
      });

      console.log(" FCM Token:", token);
      return token;
    } else {
      console.warn(" Notification permission not granted");
      return null;
    }
  } catch (error) {
    console.error(" generateToken error:", error);
    return null;
  }
};
